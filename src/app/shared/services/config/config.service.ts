import { Injectable } from '@angular/core';
import { ConfigurationApp } from '../../../core/models';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {           
    private readonly config: ConfigurationApp = environment as ConfigurationApp;     
            
    public get ApiServer(): string { 
        return this.config.apiUrl;
    }
    
    public get EncryptionKey(): string { 
        return this.config.encryptionKey;
    }

    public get AppName(): string {
        return this.config.appName;
    }
}
