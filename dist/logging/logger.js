import { context, trace } from "@opentelemetry/api";
function withTrace(data) {
    const span = trace.getSpan(context.active());
    const spanContext = span?.spanContext();
    const traceId = spanContext?.traceId;
    return { ...(data || {}), ...(traceId ? { traceId } : {}) };
}
export function createLogger(opts = {}) {
    const base = { service: opts.service || "eva-utils" };
    return {
        info: (msg, data) => console.log(JSON.stringify({ level: "info", msg, ...base, ...withTrace(data) })),
        warn: (msg, data) => console.warn(JSON.stringify({ level: "warn", msg, ...base, ...withTrace(data) })),
        error: (msg, data) => console.error(JSON.stringify({ level: "error", msg, ...base, ...withTrace(data) })),
        debug: (msg, data) => console.debug(JSON.stringify({ level: "debug", msg, ...base, ...withTrace(data) }))
    };
}
//# sourceMappingURL=logger.js.map