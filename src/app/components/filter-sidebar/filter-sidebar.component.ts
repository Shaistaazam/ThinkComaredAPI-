import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface PriceRange {
  min: number;
  max: number;
}

interface ColorFilter {
  name: string;
  value: string;
  selected: boolean;
}

interface ReviewFilter {
  stars: number;
  percentage: number;
  selected: boolean;
}

interface FilterData {
  priceRange: PriceRange;
  colors: string[];
  minRating: number;
  categories: string[];
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.scss']
})
export class FilterSidebarComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<FilterData>();
  @Output() filtersApplied = new EventEmitter<void>();
  
  // Price Range
  priceRange: PriceRange = { min: 0, max: 5000 };
  minPrice = 0;
  maxPrice = 5000;
  
  // Expandable sections
  expandedSections: { [key: string]: boolean } = {
    priceRange: true,
    colors: true,
    reviews: true,
    specifications: false
  };
  
  // Color filters
  colors: ColorFilter[] = [
    { name: 'Silver', value: 'silver', selected: false },
    { name: 'White', value: 'white', selected: false },
    { name: 'Black', value: 'black', selected: false },
    { name: 'Gold', value: 'gold', selected: false },
    { name: 'Purple', value: 'purple', selected: false },
    { name: 'Grey', value: 'grey', selected: false },
    { name: 'Pink', value: 'pink', selected: false },
    { name: 'Maroon', value: 'maroon', selected: false },
    { name: 'Orange', value: 'orange', selected: false },
    { name: 'Green', value: 'green', selected: false },
    { name: 'Blue', value: 'blue', selected: false },
    { name: 'Red', value: 'red', selected: false }
  ];
  
  // Review filters
  reviews: ReviewFilter[] = [
    { stars: 5, percentage: 89, selected: false },
    { stars: 4, percentage: 75, selected: false },
    { stars: 3, percentage: 60, selected: false },
    { stars: 2, percentage: 45, selected: false },
    { stars: 1, percentage: 20, selected: false }
  ];
  
  // Specification filters
  specifications = [
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
  
  constructor(private router: Router) {}
  
  ngOnInit(): void {
    this.emitFilters();
  }
  
  toggleSection(section: string): void {
    this.expandedSections[section] = !this.expandedSections[section];
  }
  
  onPriceRangeChange(): void {
    // Ensure min is not greater than max
    if (this.priceRange.min > this.priceRange.max) {
      this.priceRange.min = this.priceRange.max;
    }
    this.emitFilters();
  }
  
  onColorChange(color: ColorFilter): void {
    color.selected = !color.selected;
    this.emitFilters();
  }
  
  onReviewChange(review: ReviewFilter): void {
    // Unselect all others and select this one
    this.reviews.forEach(r => r.selected = false);
    review.selected = true;
    this.emitFilters();
  }
  
  private emitFilters(): void {
    const filterData: FilterData = {
      priceRange: { ...this.priceRange },
      colors: this.colors.filter(c => c.selected).map(c => c.value),
      minRating: this.reviews.find(r => r.selected)?.stars || 0,
      categories: []
    };
    
    this.filtersChanged.emit(filterData);
  }
  
  onApplyFilters(): void {
    console.log('Apply Filters button clicked');
    this.filtersApplied.emit();
  }
  
  onClearFilters(): void {
    console.log('Clear Filters button clicked');
    // Reset all filters
    this.priceRange = { min: 0, max: 5000 };
    this.colors.forEach(c => c.selected = false);
    this.reviews.forEach(r => r.selected = false);
    this.emitFilters();
  }
  
  goToCompare(): void {
    this.router.navigate(['/compare']);
  }
  
  getStarArray(count: number): number[] {
    return Array(count).fill(0);
  }
}