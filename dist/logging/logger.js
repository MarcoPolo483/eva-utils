import pino from "pino";
import { getTraceContext } from "../otel/context.js";
export function createLogger(opts = {}) {
    const logger = pino({
        level: opts.level ?? process.env.LOG_LEVEL ?? "info",
        redact: { paths: opts.redact ?? ["password", "token", "authorization"], censor: "[REDACTED]" },
        base: {
            service: opts.service ?? process.env.SERVICE_NAME ?? "eva-utils",
            env: process.env.NODE_ENV ?? "development",
            ...(opts.base ?? {}),
        },
        hooks: {
            logMethod(args, method) {
                const ctx = getTraceContext();
                if (args.length > 1 && typeof args[1] === "object") {
                    method.apply(this, [args[0], { ...args[1], ...ctx }]);
                }
                else {
                    method.apply(this, [args[0], ctx]);
                }
            },
        },
    });
    return logger;
}
//# sourceMappingURL=logger.js.map