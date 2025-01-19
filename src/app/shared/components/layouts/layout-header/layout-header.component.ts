import { Component, Input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { AuthUser } from '../../../../core/models';
import { AvatarComponent } from '../../avatar/avatar.component';
import { IconModule } from '../../icon/icon.module';

interface MenuItem {
  link: string;
  label: string;
  icon: IconProp;
}

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [
    AvatarComponent,
    IconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss'],
})
export class HeaderComponent {
  @Input({ required: true })
  authUser: AuthUser | null | undefined = null;

  readonly logout = output<void>();

  readonly menuItems: MenuItem[] = [
    { link: '/home', label: 'Home', icon: 'home' },
    { link: '/docs', label: 'Document Manage', icon: 'info-circle' },
    { link: '/chat', label: 'Chatbot', icon: 'info-circle' },
    { link: '/user-manage', label: 'User Manage', icon: 'lock' }
  ];
}