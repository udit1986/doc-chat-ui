import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentActions } from './app.actions';
import * as DocumentSelectors from './document.selectors';
import { DocumentItem } from '../core/models';

@Injectable({ providedIn: 'root' })
export class DocumentFacade {
  private readonly store = inject(Store);

  readonly documents$ = this.store.select(DocumentSelectors.selectAllDocuments);
  readonly loading$ = this.store.select(DocumentSelectors.selectDocumentLoading);
  readonly error$ = this.store.select(DocumentSelectors.selectDocumentError);

  loadDocuments() {
    this.store.dispatch(DocumentActions.loadDocuments());
  }

  createDocument(document: DocumentItem) {
    this.store.dispatch(DocumentActions.createDocument({ document }));
  }

  updateDocument(document: DocumentItem) {
    this.store.dispatch(DocumentActions.updateDocument({ document }));
  }

  deleteDocument(documentId: DocumentItem['id']) {
    this.store.dispatch(DocumentActions.deleteDocument({ documentId }));
  }
}