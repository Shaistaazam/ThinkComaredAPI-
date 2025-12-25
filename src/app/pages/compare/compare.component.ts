import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { FloatingCompareButtonComponent } from '../../components/floating-compare-button/floating-compare-button.component';

@Component({
  selector: 'app-compare',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FloatingCompareButtonComponent],
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {
  comparisonItems: Product[] = [];
  availableProducts: Product[] = [];
  maxSlots = 4;
  isLoading = false;

  constructor(
    private comparisonService: ComparisonService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to comparison items
    this.comparisonService.comparisonItems$.subscribe(items => {
      this.comparisonItems = items;
    });

    // Load available products
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.availableProducts = products;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
      }
    });
  }

  getEmptySlots(): number[] {
    const emptyCount = this.maxSlots - this.comparisonItems.length;
    return Array(emptyCount).fill(0).map((_, i) => i);
  }

  removeFromComparison(productId: number): void {
    this.comparisonService.removeFromComparison(productId);
  }

  clearAll(): void {
    this.comparisonService.clearComparison();
  }

  proceedToComparison(): void {
    if (this.comparisonItems.length >= 2) {
      this.router.navigate(['/compare/view']);
    }
  }

  canProceed(): boolean {
    return this.comparisonItems.length >= 2;
  }
}