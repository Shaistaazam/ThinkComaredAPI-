import { Component, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comparison-filter-sidebar',
  standalone: true,
  imports: [NgFor, FormsModule],
  template: `
    <div class="bg-white rounded-lg shadow-sm border p-4">
      <!-- Filters -->
      <h3 class="font-semibold text-gray-800 mb-4">Filters</h3>
      
      <!-- Filter List -->
      <div class="space-y-3">
        <div
          *ngFor="let filter of filters"
          class="cursor-pointer"
        >
          <div 
            class="flex justify-between items-center"
          >
            <span class="font-medium text-gray-700">{{ filter }}</span>
            <span class="text-gray-500" style="margin-left: 2rem;">▶</span>
          </div>
        </div>
      </div>
    </div>
  `,
  
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ComparisonFilterSidebarComponent {
  @Output() filtersChanged = new EventEmitter<{[key: string]: string[]}[]>();
  
  filters = [
    'Price Range',
    'Reviews'
  ];
}