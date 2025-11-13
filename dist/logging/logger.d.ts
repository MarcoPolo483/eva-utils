type LoggerOptions = {
    service?: string;
};
export type Logger = {
    info: (msg: string, data?: Record<string, unknown>) => void;
    warn: (msg: string, data?: Record<string, unknown>) => void;
    error: (msg: string, data?: Record<string, unknown>) => void;
    debug: (msg: string, data?: Record<string, unknown>) => void;
};
export declare function createLogger(opts?: LoggerOptions): Logger;
export {};
//# sourceMappingURL=logger.d.ts.map