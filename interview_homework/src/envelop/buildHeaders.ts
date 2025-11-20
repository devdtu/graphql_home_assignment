import type { Plugin } from '@envelop/core';
import { v4 as uuid } from 'uuid';
import { ContextType } from '../types';
import type { Plugin as YogaPlugin } from 'graphql-yoga';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onParse({ extendContext }) {
      const requestId = uuid();
      extendContext({ requestId: requestId });
    },
  };
};

// Reject missing client header before GraphQL runs
// https://the-guild.dev/graphql/yoga-server/docs/features/envelop-plugins#onrequest

export const requireClientHeader = (): YogaPlugin => ({
  async onRequest({ request, endResponse }) {
    const client = request.headers.get('client');
    if (!client) {
      endResponse(
        new Response(
          JSON.stringify({ errors: [{ message: 'client header is missing.' }] }),
          { status: 401, headers: { 'content-type': 'application/json' } }
        )
      );
    }
  },
});
