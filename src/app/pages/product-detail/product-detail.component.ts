import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ComparisonService } from '../../services/comparison.service';
import { Product } from '../../models/product.model';
import { CategoryHeroComponent } from '../../components/category-hero/category-hero.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { HelpSectionComponent } from '../../components/help-section/help-section.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, CategoryHeroComponent, BestSellersComponent, HelpSectionComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  Math = Math;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const productId = Number(params['id']);
      this.loadProduct(productId);
    });
  }

  loadProduct(id: number): void {
    this.loading = true;
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product || null;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading product:', error);
        this.loading = false;
      }
    });
  }

  addToComparison(): void {
    if (this.product) {
      const result = this.comparisonService.addToComparison(this.product);
      if (!result) {
        if (this.comparisonService.isInComparison(this.product.id)) {
          alert('This product is already in comparison!');
        } else {
          alert('Maximum 4 products can be compared at once!');
        }
      }
    }
  }

  removeFromComparison(): void {
    if (this.product) {
      this.comparisonService.removeFromComparison(this.product.id);
    }
  }

  isInComparison(): boolean {
    return this.product ? this.comparisonService.isInComparison(this.product.id) : false;
  }

  canAddMore(): boolean {
    return this.comparisonService.canAddMore();
  }

  goBack(): void {
    this.router.navigate(['/hot-deals']);
  }

  navigateToComparison(): void {
    if (this.comparisonService.getComparisonCount() >= 2) {
      this.router.navigate(['/comparison']);
    } else {
      alert('Add at least 2 products to compare.');
    }
  }
}
