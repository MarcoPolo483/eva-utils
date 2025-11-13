export async function retry(fn, opts = {}) {
    const retries = Math.max(0, opts.retries ?? 3);
    const baseMs = Math.max(1, opts.baseMs ?? 250);
    const maxMs = Math.max(baseMs, opts.maxMs ?? 5000);
    const jitter = opts.jitter ?? true;
    const shouldRetry = opts.shouldRetry ?? (() => true);
    let attempt = 0;
    // First attempt without delay
    while (true) {
        try {
            return await fn();
        }
        catch (e) {
            if (attempt >= retries || !shouldRetry(e))
                throw e;
            const delay = Math.min(maxMs, baseMs * Math.pow(2, attempt));
            const sleep = jitter ? Math.random() * delay : delay;
            await new Promise((r) => setTimeout(r, sleep));
            attempt++;
        }
    }
}
//# sourceMappingURL=retry.js.map