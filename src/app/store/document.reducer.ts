import { Action, createReducer, on } from '@ngrx/store';
import { DocumentActions } from './app.actions';
import { DocumentState } from '../core/models';

export const DOCUMENT_FEATURE_KEY = 'document';

export interface AuthPartialState {
  readonly [DOCUMENT_FEATURE_KEY]: DocumentState;
}

export const initialState: DocumentState = {
  documents: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(DocumentActions.loadDocuments, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DocumentActions.loadDocumentsSuccess, (state, { documents }) => ({
    ...state,
    documents,
    loading: false,
  })),
  on(DocumentActions.loadDocumentsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(DocumentActions.createDocument, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DocumentActions.createDocumentSuccess, (state, { document }) => ({
    ...state,
    documents: [...state.documents, document],
    loading: false,
  })),
  on(DocumentActions.createDocumentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(DocumentActions.updateDocument, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DocumentActions.updateDocumentSuccess, (state, { document }) => ({
    ...state,
    documents: state.documents.map((doc) =>
      doc.id === document.id ? document : doc
    ),
    loading: false,
  })),
  on(DocumentActions.updateDocumentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(DocumentActions.deleteDocument, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(DocumentActions.deleteDocumentSuccess, (state, { documentId }) => ({
    ...state,
    documents: state.documents.filter((doc) => doc.id !== documentId),
    loading: false,
  })),
  on(DocumentActions.deleteDocumentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export function documentReducer(
  state: DocumentState | undefined,
  action: Action
): DocumentState {
  return reducer(state, action);
}
