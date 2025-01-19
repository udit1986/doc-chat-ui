import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataApiEndpoint } from './data.endpoint';
import { RestApiService } from '../restapi/restapi.service';
import { DocumentItem } from '../../../core/models';


@Injectable()
export class DataService {
    constructor(private restApiService: RestApiService) {
    }


  public getDocItems(
    docId: number
  ): Observable<DocumentItem> {
    return this.restApiService
      .getData(DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_GET + docId)
      .pipe(map((result: any): DocumentItem => result));
  }
  public createDocItem(
    docItem: DocumentItem
  ): Observable<boolean> {
    return this.restApiService
      .postData(
        DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_POST,
        docItem
      )
      .pipe(map((result: any): boolean => result));
  }
  public updateDocItem(
    controllerItem: DocumentItem
  ): Observable<boolean> {
    return this.restApiService
      .postData(
        DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_PUT,
        controllerItem
      )
      .pipe(map((result: any): boolean => result));
  }
  public deleteDocItem(id: number): Observable<boolean> {
    return this.restApiService
      .deleteData(
        DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_DELTE + '/' + id,
        {}
      )
      .pipe(map((result: any): boolean => result));
  }
}
