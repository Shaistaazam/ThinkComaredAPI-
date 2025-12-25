import { Component } from '@angular/core';

@Component({
  selector: 'app-help-section',
  standalone: true,
  imports: [],
  templateUrl: './help-section.component.html',
  styleUrls: ['./help-section.component.scss'],
})
export class HelpSectionComponent {
  constructor() {}

  onSearchSubmit(event: Event) {
    event.preventDefault();
    // Handle search submission logic here
    console.log('Search submitted');
  }
}
