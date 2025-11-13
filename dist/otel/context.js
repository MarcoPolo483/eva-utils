import { context, trace, TraceFlags } from "@opentelemetry/api";
/**
 * Returns trace correlation fields if there is an active span.
 * Used by the logger hook to append traceId/spanId/sample flag.
 */
export function getTraceContext() {
    const span = trace.getSpan(context.active());
    const sc = span?.spanContext();
    if (!sc)
        return {};
    return {
        traceId: sc.traceId,
        spanId: sc.spanId,
        sampled: sc.traceFlags === TraceFlags.SAMPLED
    };
}
//# sourceMappingURL=context.js.map