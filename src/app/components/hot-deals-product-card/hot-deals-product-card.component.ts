import { Component, Input } from '@angular/core';
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
  Math = Math; // Make Math available in template
  
  constructor(private comparisonService: ComparisonService) {}
  
  onCompareClick(): void {
    const result = this.comparisonService.addToComparison(this.product);
    
    if (!result) {
      if (this.comparisonService.isInComparison(this.product.id)) {
        alert('This product is already in the comparison list.');
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