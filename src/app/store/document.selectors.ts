import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DOCUMENT_FEATURE_KEY } from './document.reducer';
import { DocumentState } from '../core/models';

export const selectDocumentState = createFeatureSelector<DocumentState>(DOCUMENT_FEATURE_KEY);

export const selectAllDocuments = createSelector(
  selectDocumentState,
  (state: DocumentState) => state.documents
);

export const selectDocumentLoading = createSelector(
  selectDocumentState,
  (state: DocumentState) => state.loading
);

export const selectDocumentError = createSelector(
  selectDocumentState,
  (state: DocumentState) => state.error
);