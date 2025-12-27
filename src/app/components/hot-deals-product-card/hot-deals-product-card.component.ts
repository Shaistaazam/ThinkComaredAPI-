import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { NgIf, NgFor } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';

@Component({
  selector: 'app-hot-deals-product-card',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './hot-deals-product-card.component.html',
  styleUrls: ['./hot-deals-product-card.component.scss']
})
export class HotDealsProductCardComponent {
  @Input() product!: Product;
  @Output() productAdded = new EventEmitter<void>();
  Math = Math; // Make Math available in template
  
  constructor(private comparisonService: ComparisonService, private router: Router) {}
  
  onCompareClick(): void {
    const result = this.comparisonService.addToComparison(this.product);
    
    if (result) {
      // Emit event to parent to keep sidebar visible
      this.productAdded.emit();
    } else {
      if (this.comparisonService.isInComparison(this.product.id)) {
        alert('This product is already in the comparison list.');
      } else if (!this.comparisonService.canAddMore()) {
        alert('You can only compare up to 4 products at once.');
      }
    }
  }
  
  onComparePriceClick(): void {
    // Add product to comparison first
    const result = this.comparisonService.addToComparison(this.product);
    
    if (result) {
      // Emit event to parent to keep sidebar visible
      this.productAdded.emit();
      
      // Navigate to comparison view page if we have at least 2 products
      const comparisonCount = this.comparisonService.getComparisonCount();
      if (comparisonCount >= 2) {
        this.router.navigate(['/compare/view']);
      }
    } else {
      // If product is already in comparison, just navigate to comparison view
      if (this.comparisonService.isInComparison(this.product.id)) {
        const comparisonCount = this.comparisonService.getComparisonCount();
        if (comparisonCount >= 2) {
          this.router.navigate(['/compare/view']);
        } else {
          alert('Add at least one more product to compare.');
        }
      } else if (!this.comparisonService.canAddMore()) {
        alert('You can only compare up to 4 products at once.');
      }
    }
  }
  
  removeFromComparison(): void {
    this.comparisonService.removeFromComparison(this.product.id);
  }
  
  isProductInComparison(): boolean {
    return this.comparisonService.isInComparison(this.product.id);
  }
  
  canAddMore(): boolean {
    return this.comparisonService.canAddMore();
  }
}