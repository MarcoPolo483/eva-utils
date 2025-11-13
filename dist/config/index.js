import "dotenv/config";
import { z } from "zod";
export const ConfigSchema = z.object({
    env: z.string().default(process.env.NODE_ENV || "development"),
    region: z.string().default(process.env.EVA_REGION || "eastus"),
    keyVaultUri: z.string().url().optional(),
});
export function loadConfig(overrides) {
    const cfg = ConfigSchema.parse({
        env: process.env.NODE_ENV,
        region: process.env.EVA_REGION,
        keyVaultUri: process.env.KEYVAULT_URI,
        ...overrides,
    });
    return cfg;
}
/**
 * Resolve a secret by name. If KEYVAULT_URI is provided and azure SDKs are available, it attempts Key Vault.
 * This function dynamically imports Azure SDKs so they can remain optional.
 */
export async function resolveSecret(name, keyVaultUri = process.env.KEYVAULT_URI) {
    if (!keyVaultUri)
        return undefined;
    try {
        // Dynamic imports to keep Azure libs optional
        const { DefaultAzureCredential } = await import("@azure/identity");
        const { SecretClient } = await import("@azure/keyvault-secrets");
        const client = new SecretClient(keyVaultUri, new DefaultAzureCredential());
        const resp = await client.getSecret(name);
        return resp.value;
    }
    catch (e) {
        // Swallow and return undefined to allow fallback
        return undefined;
    }
}
//# sourceMappingURL=index.js.map