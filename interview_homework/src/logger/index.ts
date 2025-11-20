import winston from 'winston';

export class Logger {
  private winston: any;
  requestId: string = '';
  client: string | null = '';

  constructor() {
    this.winston = winston.createLogger({
      level: 'info',
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [new winston.transports.Console()],
    });
  }

  private metaInfo(meta?: object) {
    return {
      requestId: this.requestId,
      client: this.client, ...meta
    };
  }

  setRequestId(requestId: string) {
    this.requestId = requestId;
  }

  setRequestClient(client: string | null) {
    this.client = client;
  }

  info(message: string, meta?: object) {
    this.winston.info(message, this.metaInfo(meta));
  }

  error(message: string, meta?: object) {
    this.winston.error(message, this.metaInfo(meta));
  }

  warn(message: string, meta?: object) {
    this.winston.warn(message, this.metaInfo(meta));
  }
}
