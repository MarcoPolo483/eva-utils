# eva-utils (Enterprise Edition)

Utilities for EVA 2.0:
- Config loader with schema validation (Zod) + `.env`
- Optional Azure Key Vault resolver (dynamic import; no hard dependency)
- Structured JSON logging (pino) with OpenTelemetry trace correlation
- Resilient retry/backoff (exponential + jitter) with timeout & cancellation
- Circuit breaker
- Token/cost budget helper
- Flat ESLint config (ESLint v9) + Prettier + Husky + lint-staged
- Vitest tests & coverage thresholds in CI

## Setup
```bash
npm ci
npm run prepare            # installs husky hooks
npm run check              # typecheck + lint + test
npm run build