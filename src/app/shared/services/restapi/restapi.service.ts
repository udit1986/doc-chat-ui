
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { IRestApi } from './restapi.interface';
import { ConfigService } from '../config/config.service'; 


@Injectable()
export class RestApiService implements IRestApi {           
    constructor(private http: HttpClient,
                private configService: ConfigService) {                                   
    }
     
    public getData(endpoint: string, data?: HttpParams, headers? : HttpHeaders):Observable<any>{                          
        return this.http.get(this.configService.ApiServer + endpoint, { params: data, headers })                                                                                                   
    }
              
    public postData<T>(endpoint: string, data: any): Observable<any> {                   
        return this.http.post<T>(this.configService.ApiServer + endpoint, data);               
    }
        
    public putData<T>(endpoint: string, data: any): Observable<any> {
        return this.http.put<T>(this.configService.ApiServer + endpoint, data);               
    }
     
    public patchData<T>(endpoint: string, data: any): Observable<any> {
        return this.http.patch<T>(this.configService.ApiServer + endpoint, data);                 
    }

    public deleteData<T>(endpoint: string, data: any): Observable<any> {
        return this.http.delete<T>(this.configService.ApiServer + endpoint, data);                
    }        
}
