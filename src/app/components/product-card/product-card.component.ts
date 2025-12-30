import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ComparisonService } from '../../services/comparison.service';
import { Product } from '../../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product!: Product;
  @Input() showCompareButton: boolean = true;

  showSelectOnHover = false; // Track if select overlay should show on hover
  private subscription: Subscription = new Subscription();

  constructor(private comparisonService: ComparisonService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to empty slot hover state
    this.subscription.add(
      this.comparisonService.showEmptySlotHover$.subscribe((showHover: boolean) => {
        this.showSelectOnHover = showHover;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

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

  onViewDetails(): void {
    this.router.navigate(['/product', this.product.id]);
  }

  canAddMore(): boolean {
    return this.comparisonService.canAddMore();
  }
}
