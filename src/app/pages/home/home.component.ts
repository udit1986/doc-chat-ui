import { Component, computed } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '../../shared/components/icon/icon.module';
import { Feature, features } from './feature.data';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IconModule, MatButtonModule, MatCardModule, MatTooltipModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly features = computed<Feature[]>(() => features);
}
