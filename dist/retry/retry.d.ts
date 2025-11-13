export type RetryOptions = {
    retries?: number;
    baseMs?: number;
    maxMs?: number;
    jitter?: boolean;
    shouldRetry?: (e: unknown) => boolean;
};
export declare function retry<T>(fn: () => Promise<T>, opts?: RetryOptions): Promise<T>;
//# sourceMappingURL=retry.d.ts.map