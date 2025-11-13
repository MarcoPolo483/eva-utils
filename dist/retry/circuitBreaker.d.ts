export type CircuitBreakerOptions = {
    failureThreshold?: number;
    successThreshold?: number;
    cooldownMs?: number;
};
export declare class CircuitBreaker {
    private opts;
    private state;
    private failures;
    private successes;
    private nextTry;
    constructor(opts?: CircuitBreakerOptions);
    exec<T>(fn: () => Promise<T>): Promise<T>;
    private open;
    private close;
    private reset;
}
//# sourceMappingURL=circuitBreaker.d.ts.map