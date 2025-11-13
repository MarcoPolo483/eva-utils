import { expoDelay } from "./backoff.js";
export async function retry(fn, opts = {}) {
    const retries = Math.max(0, opts.retries ?? 3);
    const classify = opts.classify ?? (() => "retry");
    let attempt = 0;
    while (true) {
        try {
            const res = await runWithTimeout(fn, opts.timeoutMs, opts.signal);
            return res;
        }
        catch (e) {
            const mode = classify(e);
            if (mode === "fail" || attempt >= retries || opts.signal?.aborted) {
                throw e;
            }
            const delay = expoDelay(attempt, opts);
            await sleep(delay, opts.signal);
            attempt++;
        }
    }
}
async function runWithTimeout(fn, timeoutMs, signal) {
    if (!timeoutMs && !signal)
        return fn();
    return new Promise((resolve, reject) => {
        let done = false;
        const onAbort = () => {
            if (done)
                return;
            done = true;
            reject(new Error("Retry aborted"));
        };
        let to;
        if (timeoutMs) {
            to = setTimeout(() => {
                if (done)
                    return;
                done = true;
                reject(new Error("Retry timeout"));
            }, timeoutMs);
        }
        if (signal) {
            if (signal.aborted)
                return onAbort();
            signal.addEventListener("abort", onAbort, { once: true });
        }
        fn().then((v) => {
            if (done)
                return;
            done = true;
            if (to)
                clearTimeout(to);
            if (signal)
                signal.removeEventListener("abort", onAbort);
            resolve(v);
        }, (err) => {
            if (done)
                return;
            done = true;
            if (to)
                clearTimeout(to);
            if (signal)
                signal.removeEventListener("abort", onAbort);
            reject(err);
        });
    });
}
function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted)
            return reject(new Error("Sleep aborted"));
        const t = setTimeout(() => resolve(), ms);
        signal?.addEventListener("abort", () => {
            clearTimeout(t);
            reject(new Error("Sleep aborted"));
        }, { once: true });
    });
}
//# sourceMappingURL=retry.js.map