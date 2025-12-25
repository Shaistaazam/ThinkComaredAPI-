import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {
  Math = Math; // Make Math available in template
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() itemsPerPage: number = 12;
  @Input() itemsPerPageOptions: number[] = [12, 24, 48, 96];
  
  ngOnInit() {
    // Ensure itemsPerPageOptions is sorted
    this.itemsPerPageOptions.sort((a, b) => a - b);
    console.log('Pagination component initialized with:', {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage
    });
  }
  
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  // Generate array of page numbers to display (always 1-9)
  getPageNumbers(): number[] {
    // Always show pages 1 through 9
    const range = [];
    for (let i = 1; i <= 9; i++) {
      range.push(i);
    }
    
    return range;
  }

  // TrackBy function for page numbers
  trackByFn(index: number, item: number): number {
    return index;
  }

  // Method to go to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  // Method to change items per page
  onItemsPerPageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const itemsPerPage = Number(selectElement.value);
    this.itemsPerPageChange.emit(itemsPerPage);
  }

  // Check if we can go to previous page
  canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  // Check if we can go to next page
  canGoNext(): boolean {
    return this.currentPage < this.totalPages;
  }

  // Navigate to previous page
  onPreviousPage(): void {
    if (this.canGoPrevious()) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  // Navigate to next page
  onNextPage(): void {
    if (this.canGoNext()) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}