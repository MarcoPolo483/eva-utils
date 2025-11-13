import { BackoffOptions } from "./backoff.js";
export type RetryOptions = BackoffOptions & {
    retries?: number;
    timeoutMs?: number;
    classify?: (e: unknown) => "retry" | "fail";
    signal?: AbortSignal;
};
export declare function retry<T>(fn: () => Promise<T>, opts?: RetryOptions): Promise<T>;
//# sourceMappingURL=retry.d.ts.map