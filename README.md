# eva-utils

Utility library for EVA 2.0:
- Config loader (env-first, Key Vault-ready hooks)
- Logging with optional OpenTelemetry correlation
- Retry/backoff and a simple circuit breaker
- Token/cost budget helpers

## Quickstart
```bash
npm ci
npm run build
```

## Usage (basic)
```ts
import { loadConfig } from "./dist/config/index.js";
import { createLogger } from "./dist/logging/logger.js";
import { retry } from "./dist/retry/retry.js";
import { CircuitBreaker } from "./dist/retry/circuitBreaker.js";
import { TokenBudget } from "./dist/budget/tokenBudget.js";

const cfg = loadConfig();
const log = createLogger({ service: "demo" });

const result = await retry(async () => "ok", { retries: 3, baseMs: 200 });
log.info("result", { result });

const breaker = new CircuitBreaker({ failureThreshold: 5, successThreshold: 2, cooldownMs: 10000 });
await breaker.exec(async () => "call");

const budget = new TokenBudget({ limit: 10000 });
budget.spend(512);
log.info("remaining", { tokens: budget.remaining() });
```