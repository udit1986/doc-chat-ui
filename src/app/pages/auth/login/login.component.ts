import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { combineLatest } from 'rxjs';

import { AuthFacade } from '../../../core/auth/store/auth.facade';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly authFacade = inject(AuthFacade);

  readonly loginForm = new FormGroup({
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
    const { email, password } = this.loginForm.value;
    this.authFacade.login(email as string, password as string);
  }
}