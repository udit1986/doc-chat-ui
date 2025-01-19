import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { RestApiService } from './restapi.service';
import { ConfigService } from '../config/config.service';  
  
export function RestApiServiceFactory(http: HttpClient,  configService: ConfigService): RestApiService {                                                                              
  return new RestApiService(http, configService);    
}

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule    
  ],
  providers: [
    {
      provide: RestApiService,
      deps:[HttpClient, ConfigService],
      useFactory: RestApiServiceFactory
    },         
  ],
  declarations: []
})
export class RestApiModule { }
