export type Config = {
  env: string;
  region: string;
  keyVaultUri?: string;
  // Add more shared config as needed
};

export function loadConfig(overrides?: Partial<Config>): Config {
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

// Placeholder for future Key Vault integration
export type SecretResolver = (name: string) => Promise<string | undefined>;
export async function resolveSecret(_name: string, _resolver?: SecretResolver): Promise<string | undefined> {
  // Implement Azure Key Vault / Managed Identity fetch in later iteration.
  return undefined;
}