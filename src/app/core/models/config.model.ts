export class ConfigurationApp {
    production!: boolean;
    appVersion!: string;
    apiUrl!: string;
    timeout!: number;
    encryptionKey!: string;
    appName!: string;
    settings!: {
        auth: {
            accessTokenKey: string;
            refreshTokenKey: string;
        }
    };
}