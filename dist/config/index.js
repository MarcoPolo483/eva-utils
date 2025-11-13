export function loadConfig(overrides) {
    // Env-first configuration. Extend with file/env layering if needed.
    const env = process.env.NODE_ENV || "development";
    const region = process.env.EVA_REGION || "eastus";
    const keyVaultUri = process.env.KEYVAULT_URI || undefined;
    return {
        env,
        region,
        keyVaultUri,
        ...overrides
    };
}
export async function resolveSecret(_name, _resolver) {
    // Implement Azure Key Vault / Managed Identity fetch in later iteration.
    return undefined;
}
//# sourceMappingURL=index.js.map