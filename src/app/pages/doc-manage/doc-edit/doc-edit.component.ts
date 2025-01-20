import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DocumentItem } from '../../../core/models';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-doc-edit',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatDialogModule, MatButtonModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './doc-edit.component.html',
  styleUrls: ['./doc-edit.component.scss'],
})
export class DocEditComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DocEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { document: DocumentItem }
  ) {
    this.form = this.fb.group({
      id: [data.document?.id || null],
      title: [data.document?.title || '', Validators.required],
      content: [data.document?.content || '', Validators.required],
      author: [data.document?.author || ''],
      createdBy: [data.document?.createdBy || ''],
      lastChangedBy: [''],
    });
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
