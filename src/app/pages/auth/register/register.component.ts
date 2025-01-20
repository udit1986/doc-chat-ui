import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { combineLatest } from 'rxjs';

import { AuthFacade } from '../../../core/auth/store/auth.facade';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly authFacade = inject(AuthFacade);

  readonly registerForm = new FormGroup({
    firstName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    email: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  readonly vm$ = combineLatest({
    isLoading: this.authFacade.isLoadingLogin$,
    showLoginError: this.authFacade.hasLoginError$,
  });

  submit() {
    const { email, password, firstName, lastName } = this.registerForm.value;
    this.authFacade.register(
      email as string,
      password as string,
      firstName as string,
      lastName as string
    );
  }
}
