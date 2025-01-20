import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DataService} from '../shared/services';
import { DocumentActions } from './app.actions';


@Injectable()
export class DocumentEffects {
  private readonly actions$ = inject(Actions);
  private readonly documentService = inject(DataService);
  
  readonly loadDocuments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.loadDocuments),
      mergeMap(() =>
        this.documentService.getDocuments().pipe(
          map(documents => DocumentActions.loadDocumentsSuccess({ documents })),
          catchError(error => of(DocumentActions.loadDocumentsFailure({ error })))
        )
      )
    )
  );

  readonly createDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.createDocument),
      mergeMap(action =>
        this.documentService.createDocItem(action.document).pipe(
          map(document => DocumentActions.createDocumentSuccess({ document })),
          catchError(error => of(DocumentActions.createDocumentFailure({ error })))
        )
      )
    )
  );

  readonly updateDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.updateDocument),
      mergeMap(action =>
        this.documentService.updateDocItem(action.document).pipe(
          map(document => DocumentActions.updateDocumentSuccess({ document })),
          catchError(error => of(DocumentActions.updateDocumentFailure({ error })))
        )
      )
    )
  );

  readonly deleteDocument$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DocumentActions.deleteDocument),
      mergeMap(action =>
        this.documentService.deleteDocItem(action.documentId).pipe(
          map(() => DocumentActions.deleteDocumentSuccess({ documentId: action.documentId })),
          catchError(error => of(DocumentActions.deleteDocumentFailure({ error })))
        )
      )
    )
  );
}
