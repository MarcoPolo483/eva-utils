/**
 * Exponential backoff utilities with optional full jitter.
 * Based on the AWS architecture recommendations for backoff & jitter.
 */
export type BackoffOptions = {
    /** Base delay (ms) for attempt 0. Default 200. */
    baseMs?: number;
    /** Exponential factor. Default 2. */
    factor?: number;
    /** Maximum delay cap (ms). Default 8000. */
    maxMs?: number;
    /** Jitter strategy: "full" random within range, or "none". Default "full". */
    jitter?: "full" | "none";
};
export declare function expoDelay(attempt: number, opts?: BackoffOptions): number;
/**
 * Linear backoff utility (sometimes useful for rate limiting recovery).
 */
export declare function linearDelay(attempt: number, stepMs?: number, maxMs?: number): number;
//# sourceMappingURL=backoff.d.ts.map