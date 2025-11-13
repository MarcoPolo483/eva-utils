export class CircuitBreaker {
    opts;
    state = "closed";
    failures = 0;
    successes = 0;
    nextTryAt = 0;
    constructor(opts = {}) {
        this.opts = opts;
    }
    async exec(fn) {
        const now = Date.now();
        const failureThreshold = Math.max(1, this.opts.failureThreshold ?? 5);
        const successThreshold = Math.max(1, this.opts.successThreshold ?? 2);
        const cooldownMs = Math.max(1000, this.opts.cooldownMs ?? 10000);
        if (this.state === "open") {
            if (now >= this.nextTryAt) {
                this.state = "half-open";
                this.failures = 0;
                this.successes = 0;
            }
            else {
                throw new Error("Circuit open");
            }
        }
        try {
            const res = await fn();
            if (this.state === "half-open") {
                this.successes++;
                if (this.successes >= successThreshold) {
                    this.close();
                }
            }
            else {
                this.resetCounts();
            }
            return res;
        }
        catch (e) {
            this.failures++;
            if (this.state === "half-open" || this.failures >= failureThreshold) {
                this.open(cooldownMs);
            }
            throw e;
        }
    }
    open(ms) {
        this.state = "open";
        this.nextTryAt = Date.now() + ms;
    }
    close() {
        this.state = "closed";
        this.nextTryAt = 0;
        this.resetCounts();
    }
    resetCounts() {
        this.failures = 0;
        this.successes = 0;
    }
}
//# sourceMappingURL=circuitBreaker.js.map