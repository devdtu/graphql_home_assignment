import type { Plugin } from '@envelop/core';
import uuid from 'uuid';
import { Logger } from '../logger';
import { ContextType } from '../types';

export const useLogger = (): Plugin<ContextType> => {
  return {
    onContextBuilding({ context, extendContext }) {
      const logger = new Logger();
      logger.setRequestId(context.requestId);
      logger.setRequestClient(context.request.headers.get('client'));
      extendContext({ logger: logger });
    },
  };
};
