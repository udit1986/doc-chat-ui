import { Component } from '@angular/core';
import { LayoutHeaderComponent } from '../layout-header/layout-header.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [LayoutHeaderComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss'
})
export class PageLayoutComponent {

}
