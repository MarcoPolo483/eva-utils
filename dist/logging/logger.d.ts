import { Logger as PinoLogger, LoggerOptions } from "pino";
export type Logger = PinoLogger;
export type CreateLoggerOptions = {
    service?: string;
    level?: LoggerOptions["level"];
    redact?: string[];
    base?: Record<string, unknown>;
};
export declare function createLogger(opts?: CreateLoggerOptions): Logger;
//# sourceMappingURL=logger.d.ts.map