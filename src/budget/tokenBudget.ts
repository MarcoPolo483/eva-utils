export type TokenBudgetOptions = {
  limit: number;   // total tokens allowed
};

export class TokenBudget {
  private used = 0;
  constructor(private opts: TokenBudgetOptions) {
    if (opts.limit <= 0) throw new Error("TokenBudget: limit must be > 0");
  }

  spend(tokens: number) {
    if (tokens < 0) throw new Error("TokenBudget: cannot spend negative tokens");
    if (this.used + tokens > this.opts.limit) throw new Error("TokenBudget: exceeded");
    this.used += tokens;
  }

  remaining() {
    return this.opts.limit - this.used;
  }

  reset() {
    this.used = 0;
  }
}