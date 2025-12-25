import { Component, Input, OnInit } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from '../../models/product.model';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-hot-deals',
  standalone: true,
  imports: [NgFor, NgIf, ProductCardComponent],
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss'],
})
export class HotDealsComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() category: string = 'all'; // New input for category filtering
  @Input() productCount: number = 8; // New input for product count
  @Input() showCategoryFilter: boolean = false; // Show category buttons
  
  isLoading = false;
  isUsingFallbackData = false;
  availableCategories = ['All', 'Mobile', 'Desktop', 'Electronics', 'Audio', 'Accessories', 'Storage'];
  selectedCategory = 'All';

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.selectedCategory = this.category === 'all' ? 'All' : this.category;
    
    // If no products were passed in, fetch from API with fallback
    if (this.products.length === 0) {
      this.loadHotDeals();
    }
  }

  loadHotDeals() {
    this.isLoading = true;
    this.isUsingFallbackData = false;
    
    // Try to get data from API first, then fallback to category-based products
    this.productService.getHotDealsItems(1, this.productCount).subscribe({
      next: (response) => {
        this.products = response.products;
        this.isLoading = false;
        
        // If we got less than expected products, we might be using fallback
        if (response.products.length <= 6) {
          this.isUsingFallbackData = true;
        }
      },
      error: (error) => {
        console.error('Failed to load hot deals from API, using local data:', error);
        // Fallback to local category-based products
        this.loadLocalProducts();
      }
    });
  }

  loadLocalProducts() {
    const categoryToLoad = this.selectedCategory === 'All' ? 'all' : this.selectedCategory;
    
    this.productService.getHotDealsByCategory(categoryToLoad, this.productCount).subscribe(
      products => {
        this.products = products;
        this.isLoading = false;
        this.isUsingFallbackData = true;
      }
    );
  }

  onCategoryChange(category: string) {
    this.selectedCategory = category;
    this.loadLocalProducts();
  }

  retryLoadData() {
    this.loadHotDeals();
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
