import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-comparison-bar',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './comparison-bar.component.html',
  styleUrls: ['./comparison-bar.component.scss']
})
export class ComparisonBarComponent implements OnInit, OnDestroy {
  comparisonItems: Product[] = [];
  maxSlots = 4;
  isVisible = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private comparisonService: ComparisonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.comparisonService.comparisonItems$.subscribe(items => {
        this.comparisonItems = items;
      })
    );

    this.subscription.add(
      this.comparisonService.comparisonBarVisible$.subscribe(visible => {
        this.isVisible = visible;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getEmptySlots(): number[] {
    const emptyCount = this.maxSlots - this.comparisonItems.length;
    return Array(emptyCount).fill(0).map((_, i) => i);
  }

  removeProduct(productId: number): void {
    this.comparisonService.removeFromComparison(productId);
  }

  clearAll(): void {
    this.comparisonService.clearComparison();
  }

  compareProducts(): void {
    console.log('Compare Products clicked!');
    console.log('Comparison items count:', this.comparisonItems.length);
    console.log('Comparison items:', this.comparisonItems);
    
    if (this.comparisonItems.length >= 2) {
      console.log('Navigating to /comparison');
      this.router.navigate(['/comparison']).then(
        success => console.log('Navigation success:', success),
        error => console.error('Navigation error:', error)
      );
    } else {
      alert(`Need at least 2 products to compare. Currently have ${this.comparisonItems.length}`);
    }
  }

  hasProducts(): boolean {
    return this.comparisonItems.length > 0;
  }

  canCompare(): boolean {
    return this.comparisonItems.length >= 2;
  }

  shouldShow(): boolean {
    return this.isVisible;
  }

  toggleBar(): void {
    this.comparisonService.hideComparisonBar();
  }
}