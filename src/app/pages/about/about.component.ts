import { Component } from '@angular/core';
import { CategoryHeroComponent } from '../../components/category-hero/category-hero.component';

@Component({
  selector: 'app-about',
  imports: [CategoryHeroComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}
