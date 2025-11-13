# eva-core (Enterprise Edition)

Core domain for EVA 2.0:
- Strongly-typed domain model (Plan, Step, Message)
- Event schemas with Zod (tool calls, plan/step lifecycle, errors)
- Provider SPIs (LLM, Embeddings, Vector Store, Storage, Telemetry)
- Orchestrator runtime skeleton
- Enterprise toolchain: ESLint v9 flat config, Prettier, Vitest (coverage), Husky + lint-staged

## Setup
```bash
npm ci
npm run prepare
npm run check
npm run build
npm test
```

## Quick example
```ts
import { makePlan, Orchestrator } from "./dist/index.js";

const plan = makePlan("demo", [
  { id: "s1", name: "hello", action: async (ctx) => ({ ok: true, output: "world" }) }
]);
const orchestrator = new Orchestrator();
const result = await orchestrator.run(plan);
console.log(result.ok, result.steps.length);
```