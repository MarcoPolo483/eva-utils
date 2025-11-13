import "dotenv/config";
import { z } from "zod";
export declare const ConfigSchema: z.ZodObject<{
    env: z.ZodDefault<z.ZodString>;
    region: z.ZodDefault<z.ZodString>;
    keyVaultUri: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    env: string;
    region: string;
    keyVaultUri?: string | undefined;
}, {
    env?: string | undefined;
    region?: string | undefined;
    keyVaultUri?: string | undefined;
}>;
export type Config = z.infer<typeof ConfigSchema>;
export declare function loadConfig(overrides?: Partial<Config>): Config;
export type SecretResolver = (name: string) => Promise<string | undefined>;
/**
 * Resolve a secret by name. If KEYVAULT_URI is provided and azure SDKs are available, it attempts Key Vault.
 * This function dynamically imports Azure SDKs so they can remain optional.
 */
export declare function resolveSecret(name: string, keyVaultUri?: string | undefined): Promise<string | undefined>;
//# sourceMappingURL=index.d.ts.map