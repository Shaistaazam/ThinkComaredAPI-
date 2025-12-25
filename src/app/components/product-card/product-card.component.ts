import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showCompareButton: boolean = true;

  constructor(private comparisonService: ComparisonService) {}

  addToCompare(): void {
    const success = this.comparisonService.addToComparison(this.product);
    if (!success) {
      if (this.isInComparison()) {
        alert('This product is already in comparison!');
      } else {
        alert('Maximum 4 products can be compared at once!');
      }
    }
  }

  removeFromCompare(): void {
    this.comparisonService.removeFromComparison(this.product.id);
  }

  isInComparison(): boolean {
    return this.comparisonService.isInComparison(this.product.id);
  }

  canAddMore(): boolean {
    return this.comparisonService.canAddMore();
  }
}
