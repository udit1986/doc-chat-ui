import { Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';

export interface IRestApi {
    getData(endpoint: string, data?: HttpParams, headers? : HttpHeaders): Observable<Object>; 
    postData<T>(endpoint: string, data: any): Observable<boolean>;  
    putData<T>(endpoint: string, data: any): Observable<Object>; 
    patchData<T>(endpoint: string, data: any): Observable<Object>; 
    deleteData<T>(endpoint: string, data: any): Observable<Object>;                                        
}
