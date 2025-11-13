/**
 * Exponential backoff utilities with optional full jitter.
 * Based on the AWS architecture recommendations for backoff & jitter.
 */
export function expoDelay(attempt, opts = {}) {
    const base = Math.max(1, opts.baseMs ?? 200);
    const factor = Math.max(1, opts.factor ?? 2);
    const maxMs = Math.max(base, opts.maxMs ?? 8000);
    const raw = Math.min(maxMs, base * Math.pow(factor, Math.max(0, attempt)));
    if ((opts.jitter ?? "full") === "full") {
        return Math.random() * raw;
    }
    return raw;
}
/**
 * Linear backoff utility (sometimes useful for rate limiting recovery).
 */
export function linearDelay(attempt, stepMs = 250, maxMs = 5000) {
    const raw = attempt * stepMs;
    return Math.min(raw, maxMs);
}
//# sourceMappingURL=backoff.js.map