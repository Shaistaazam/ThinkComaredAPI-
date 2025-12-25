import { Component, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent {
  @Output() filtersApplied = new EventEmitter<void>();
  
  constructor(private router: Router) {}
  
  onApplyFilters(): void {
    console.log('Apply Filters button clicked');
    this.filtersApplied.emit();
  }
  
  onClearFilters(): void {
    console.log('Clear Filters button clicked');
    // Clear any applied filters here if needed
  }
  
  goToCompare(): void {
    this.router.navigate(['/comparison']);
  }
  filters = [
    'Price Range',
    'Colors',
    'Reviews',
    'Graphics',
    'Guarantee',
    'Internal Storage',
    'Operating System',
    'Processor',
    'RAM',
    'Screen Size',
    'TouchScreen',
    'Type'
  ];

  
}