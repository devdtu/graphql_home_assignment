import type { Plugin } from '@envelop/core';
import { v4 as uuid } from 'uuid';
import { ContextType } from '../types';
import type { Plugin as YogaPlugin } from 'graphql-yoga';

export const buildHeaders = (): Plugin<ContextType> => {
  return {
    onParse({ context, extendContext }) {
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
  }
});

export const attachRequestIdMetadata = (): Plugin<ContextType> => ({
  onExecute({ args }) {
    // https://the-guild.dev/graphql/envelop/docs/plugins/lifecycle#onexecute:~:text=%7D%2C-,onExecute(%7B%20args%20%7D)%20%7B,%7D,-%7D
    const ctx = args.contextValue as ContextType;
    return {
      onExecuteDone({ result }) {
        const resultObject = result as { metadata?: Record<string, any> };
        resultObject.metadata = { requestId: ctx.requestId };
      },
    };
  },
});