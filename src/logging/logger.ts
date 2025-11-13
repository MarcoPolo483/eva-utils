import { context, trace } from "@opentelemetry/api";

type LoggerOptions = {
  service?: string;
};

export type Logger = {
  info: (msg: string, data?: Record<string, unknown>) => void;
  warn: (msg: string, data?: Record<string, unknown>) => void;
  error: (msg: string, data?: Record<string, unknown>) => void;
  debug: (msg: string, data?: Record<string, unknown>) => void;
};

function withTrace(data?: Record<string, unknown>) {
  const span = trace.getSpan(context.active());
  const spanContext = span?.spanContext();
  const traceId = spanContext?.traceId;
  return { ...(data || {}), ...(traceId ? { traceId } : {}) };
}

export function createLogger(opts: LoggerOptions = {}): Logger {
  const base = { service: opts.service || "eva-utils" };

  return {
    info: (msg, data) => console.log(JSON.stringify({ level: "info", msg, ...base, ...withTrace(data) })),
    warn: (msg, data) => console.warn(JSON.stringify({ level: "warn", msg, ...base, ...withTrace(data) })),
    error: (msg, data) => console.error(JSON.stringify({ level: "error", msg, ...base, ...withTrace(data) })),
    debug: (msg, data) => console.debug(JSON.stringify({ level: "debug", msg, ...base, ...withTrace(data) }))
  };
}