export type TokenBudgetOptions = {
    limit: number;
};
export declare class TokenBudget {
    private opts;
    private used;
    constructor(opts: TokenBudgetOptions);
    spend(tokens: number): void;
    remaining(): number;
    reset(): void;
}
//# sourceMappingURL=tokenBudget.d.ts.map