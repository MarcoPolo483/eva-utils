export type Config = {
    env: string;
    region: string;
    keyVaultUri?: string;
};
export declare function loadConfig(overrides?: Partial<Config>): Config;
export type SecretResolver = (name: string) => Promise<string | undefined>;
export declare function resolveSecret(_name: string, _resolver?: SecretResolver): Promise<string | undefined>;
//# sourceMappingURL=index.d.ts.map