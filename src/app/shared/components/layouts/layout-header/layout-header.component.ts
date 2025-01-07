import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgbCollapse, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu  } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-layout-header',
  standalone: true,
  imports: [RouterLink, NgbCollapse, RouterLinkActive, NgbDropdown, NgbDropdownToggle, NgbDropdownMenu],
  templateUrl: './layout-header.component.html',
  styleUrl: './layout-header.component.scss',
})
export class LayoutHeaderComponent implements OnInit {
  public isMenuCollapsed: boolean = true;

  constructor(private router: Router) {}

  public ngOnInit(): void {}
  public async onClickLogout(): Promise<void> {
    this.router.navigate(['/auth/login']);
  }
}
