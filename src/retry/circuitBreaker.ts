type State = "closed" | "open" | "half-open";

export type CircuitBreakerOptions = {
  failureThreshold?: number; // failures before opening
  successThreshold?: number; // successes in half-open to close
  cooldownMs?: number;       // how long to stay open before half-open
};

export class CircuitBreaker {
  private state: State = "closed";
  private failures = 0;
  private successes = 0;
  private nextTry = 0;

  constructor(private opts: CircuitBreakerOptions = {}) {}

  async exec<T>(fn: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const failureThreshold = Math.max(1, this.opts.failureThreshold ?? 5);
    const successThreshold = Math.max(1, this.opts.successThreshold ?? 2);
    const cooldownMs = Math.max(1000, this.opts.cooldownMs ?? 10000);

    if (this.state === "open") {
      if (now >= this.nextTry) {
        this.state = "half-open";
      } else {
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
      } else {
        this.reset();
      }
      return result;
    } catch (e) {
      this.failures++;
      if (this.state === "half-open" || this.failures >= failureThreshold) {
        this.open(cooldownMs);
      }
      throw e;
    }
  }

  private open(cooldownMs: number) {
    this.state = "open";
    this.nextTry = Date.now() + cooldownMs;
    this.failures = 0;
    this.successes = 0;
  }

  private close() {
    this.state = "closed";
    this.failures = 0;
    this.successes = 0;
    this.nextTry = 0;
  }

  private reset() {
    this.failures = 0;
    this.successes = 0;
  }
}