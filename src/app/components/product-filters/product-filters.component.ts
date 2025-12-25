import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgFor } from '@angular/common';

interface FilterSection {
  key: string;
  title: string;
  options: string[];
}

@Component({
  selector: 'app-product-filters',
  standalone: true,
  imports: [NgFor],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
})
export class ProductFiltersComponent implements OnInit {
  @Output() filtersChanged = new EventEmitter<any>();

  // Filter sections data
  filterSections: FilterSection[] = [
    {
      key: 'price',
      title: 'Price Range',
      options: ['Under $100', '$100 - $200', '$200 - $500', 'Over $500'],
    },
    {
      key: 'reviews',
      title: 'Reviews',
      options: ['★★★★★ (5 stars)', '★★★★☆ & Up (4 stars)', '★★★☆☆ & Up (3 stars)'],
    },
    {
      key: 'os',
      title: 'Operating System',
      options: ['Windows', 'MacOS', 'Linux', 'Chrome OS'],
    },
    {
      key: 'storage',
      title: 'Internal Storage',
      options: ['Up to 128GB', '256GB', '512GB', '1TB or More'],
    },
    {
      key: 'guarantee',
      title: 'Guarantee',
      options: ['1 Year', '2 Years', '3 Years', 'Lifetime'],
    },
    {
      key: 'colors',
      title: 'Colors',
      options: ['Black', 'White', 'Silver', 'Gray'],
    },
    {
      key: 'graphics',
      title: 'Graphics',
      options: ['Integrated', 'Dedicated', 'Hybrid'],
    },
    {
      key: 'ram',
      title: 'RAM',
      options: ['4GB', '8GB', '16GB', '32GB or More'],
    },
  ];

  // Collapsible filter sections
  openFilterSections: string[] = [
    'price',
    'reviews',
    'os',
    'storage',
    'guarantee',
    'colors',
    'graphics',
    'ram',
  ];

  ngOnInit() {
    // Initialize with all sections open
  }

  toggleFilterSection(section: string) {
    const index = this.openFilterSections.indexOf(section);
    if (index > -1) {
      this.openFilterSections.splice(index, 1);
    } else {
      this.openFilterSections.push(section);
    }
  }

  onFilterChange() {
    // Emit event when filters change
    this.filtersChanged.emit({
      openSections: this.openFilterSections,
    });
  }

  clearAllFilters() {
    // Reset all filters
    this.onFilterChange();
  }
}