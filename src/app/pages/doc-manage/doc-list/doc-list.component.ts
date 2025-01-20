import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DocEditComponent } from '../doc-edit/doc-edit.component';
import { DocumentFacade } from '../../../store/document.facade';
import { DocumentItem } from '../../../core/models';
import { startWith } from 'rxjs';
import { AuthFacade } from '../../../core/auth/store/auth.facade';

@Component({
  selector: 'app-doc-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, DocEditComponent],
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss'],
})
export class DocListComponent implements OnInit {
  private readonly docFacade = inject(DocumentFacade);
  private readonly dialog = inject(MatDialog);
  private readonly authFacade = inject(AuthFacade);
  authUser: any;
  documents$ = this.docFacade.documents$.pipe(startWith([] as DocumentItem[]));

  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'content',
    'createdDate',
    'lastModifiedDate',
    'actions',
  ];

  ngOnInit() {
    this.docFacade.loadDocuments();
    this.authFacade.authUser$.subscribe((user) => {
      this.authUser = user;
    });
  }

  onEditDocument(document: DocumentItem) {
    const dialogRef = this.dialog.open(DocEditComponent, {
      width: '400px',
      data: { document },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.docFacade.updateDocument({
          ...result,
          lastChangedBy: this.authUser?.name,
        });
      }
    });
  }

  onCreateDocument() {
    const dialogRef = this.dialog.open(DocEditComponent, {
      width: '400px',
      data: { document: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.docFacade.createDocument({
          ...result,
          lastChangedBy: this.authUser?.name,
        });
      }
    });
  }

  onDeleteDocument(documentId: number) {
    this.docFacade.deleteDocument(documentId);
  }
}
