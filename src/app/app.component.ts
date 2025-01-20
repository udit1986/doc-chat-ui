import { Component, inject } from '@angular/core';
import { AuthFacade } from './core/auth/store/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly authFacade = inject(AuthFacade);
  readonly authUser$ = this.authFacade.authUser$;
  title = 'doc-chat-ui';

  protected onLogout() {
    this.authFacade.logout();
  }
}
