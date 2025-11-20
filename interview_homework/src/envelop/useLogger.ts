import type { Plugin } from '@envelop/core';
import uuid from 'uuid';
import { Logger } from '../logger';
import { ContextType } from '../types';

export const useLogger = (): Plugin<ContextType> => {
  return {
    onContextBuilding({ context, extendContext }) {
      console.log("line 10 -> " + context.requestId)
      const logger = new Logger();
      logger.setRequestId(context.requestId);
      console.log("\n\n context cleitn -> " + context.request.headers.get('client'));
      logger.setRequestClient(context.request.headers.get('client'));
      extendContext({ logger: logger });
    },
  };
};
