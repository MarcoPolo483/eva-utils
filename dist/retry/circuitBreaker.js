export class CircuitBreaker {
    opts;
    state = "closed";
    failures = 0;
    successes = 0;
    nextTry = 0;
    constructor(opts = {}) {
        this.opts = opts;
    }
    async exec(fn) {
        const now = Date.now();
        const failureThreshold = Math.max(1, this.opts.failureThreshold ?? 5);
        const successThreshold = Math.max(1, this.opts.successThreshold ?? 2);
        const cooldownMs = Math.max(1000, this.opts.cooldownMs ?? 10000);
        if (this.state === "open") {
            if (now >= this.nextTry) {
                this.state = "half-open";
            }
            else {
                throw new Error("CircuitBreaker: open");
            }
        }
        try {
            const result = await fn();
            if (this.state === "half-open") {
                this.successes++;
                if (this.successes >= successThreshold) {
                    this.close();
                }
            }
            else {
                this.reset();
            }
            return result;
        }
        catch (e) {
            this.failures++;
            if (this.state === "half-open" || this.failures >= failureThreshold) {
                this.open(cooldownMs);
            }
            throw e;
        }
    }
    open(cooldownMs) {
        this.state = "open";
        this.nextTry = Date.now() + cooldownMs;
        this.failures = 0;
        this.successes = 0;
    }
    close() {
        this.state = "closed";
        this.failures = 0;
        this.successes = 0;
        this.nextTry = 0;
    }
    reset() {
        this.failures = 0;
        this.successes = 0;
    }
}
//# sourceMappingURL=circuitBreaker.js.map