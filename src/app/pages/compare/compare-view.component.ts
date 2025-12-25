import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-compare-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compare-view.component.html',
  styleUrls: ['./compare-view.component.scss']
})
export class CompareViewComponent implements OnInit {
  comparisonItems: Product[] = [];
  comparisonFeatures = [
    { key: 'name', label: 'Product Name', type: 'text' },
    { key: 'price', label: 'Price', type: 'currency' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'reviewsCount', label: 'Reviews', type: 'number' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'isFeatured', label: 'Featured', type: 'boolean' },
    { key: 'isNew', label: 'New Product', type: 'boolean' }
  ];

  constructor(
    private comparisonService: ComparisonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comparisonService.comparisonItems$.subscribe(items => {
      this.comparisonItems = items;
      
      // Redirect if no items to compare
      if (items.length < 2) {
        this.router.navigate(['/compare']);
      }
    });
  }

  getFeatureValue(product: Product, feature: any): any {
    return product[feature.key as keyof Product] || 'N/A';
  }

  formatValue(value: any, type: string): string {
    switch (type) {
      case 'currency':
        return typeof value === 'number' ? `$${value.toFixed(2)}` : 'N/A';
      case 'rating':
        return typeof value === 'number' ? `${value}/5` : 'N/A';
      case 'number':
        return typeof value === 'number' ? value.toString() : 'N/A';
      case 'boolean':
        return value === true ? 'Yes' : value === false ? 'No' : 'N/A';
      default:
        return value?.toString() || 'N/A';
    }
  }

  removeProduct(productId: number): void {
    this.comparisonService.removeFromComparison(productId);
  }

  addMoreProducts(): void {
    this.router.navigate(['/compare']);
  }

  clearAll(): void {
    this.comparisonService.clearComparison();
    this.router.navigate(['/compare']);
  }

  getBestValue(feature: any): number | null {
    if (feature.key === 'price') {
      // For price, lowest is best
      const prices = this.comparisonItems
        .map(item => item.price)
        .filter(price => typeof price === 'number');
      return prices.length > 0 ? Math.min(...prices) : null;
    } else if (feature.key === 'rating') {
      // For rating, highest is best
      const ratings = this.comparisonItems
        .map(item => item.rating)
        .filter(rating => typeof rating === 'number');
      return ratings.length > 0 ? Math.max(...ratings) : null;
    }
    return null;
  }

  isBestValue(product: Product, feature: any): boolean {
    const bestValue = this.getBestValue(feature);
    if (bestValue === null) return false;
    
    const productValue = product[feature.key as keyof Product];
    return productValue === bestValue;
  }

  generateStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}