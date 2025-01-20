import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataApiEndpoint } from './data.endpoint';
import { RestApiService } from '../restapi/restapi.service';
import { DocumentItem } from '../../../core/models';

@Injectable()
export class DataService {
  constructor(private restApiService: RestApiService) {}

  public getDocuments(): Observable<DocumentItem[]> {
    return this.restApiService
      .getData(DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_GET)
      .pipe(map((result: any): DocumentItem[] => result.data?.data));
  }

  public getDocItem(docId: number): Observable<DocumentItem> {
    return this.restApiService
      .getData(DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_GET + docId)
      .pipe(map((result: any): DocumentItem => result.data));
  }
  public createDocItem(docItem: DocumentItem): Observable<DocumentItem> {
    return this.restApiService
      .postData(DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_POST, docItem)
      .pipe(map((result: any): DocumentItem => result.data));
  }
  public updateDocItem(docItem: DocumentItem): Observable<DocumentItem> {
    return this.restApiService
      .patchData(DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_PUT + docItem.id, docItem)
      .pipe(map((result: any): DocumentItem => result.data));
  }
  public deleteDocItem(id: number): Observable<boolean> {
    return this.restApiService
      .deleteData(DataApiEndpoint.DOCUMENT.DOCUMENT_DATA_DELETE + id, {})
      .pipe(map((result: any): boolean => result));
  }
}
