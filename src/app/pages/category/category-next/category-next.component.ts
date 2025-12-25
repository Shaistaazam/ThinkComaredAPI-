import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FilterSidebarComponent } from '../../../components/filter-sidebar/filter-sidebar.component';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product.model';
import { HotDealsProductCardComponent } from '../../../components/hot-deals-product-card/hot-deals-product-card.component';

@Component({
  selector: 'app-category-next',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, FilterSidebarComponent, HotDealsProductCardComponent, FormsModule],
  templateUrl: './category-next.component.html',
  styleUrl: './category-next.component.scss',
})
export class CategoryNextComponent implements OnInit {
  products: Product[] = [];
  selectedCategory: string = '';
  isLoading: boolean = false;
  
  // Map category names to API category IDs
  private categoryMapping: { [key: string]: number } = {
    'laptops': 22,
    'mobile-phones': 3,
    'desktops': 24,
    'monitors': 23
  };
  
  // Map category names to display names
  private categoryDisplayNames: { [key: string]: string } = {
    'laptops': 'Laptops',
    'mobile-phones': 'Mobile Phones',
    'desktops': 'Desktops',
    'monitors': 'Monitors'
  };

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
      }
      this.loadProductsFromAPI();
    });
  }

  loadProductsFromAPI() {
    this.isLoading = true;
    
    // Get category ID from mapping, or undefined for all categories
    const categoryId = this.selectedCategory ? this.categoryMapping[this.selectedCategory] : undefined;
    const categoryName = this.selectedCategory ? this.categoryDisplayNames[this.selectedCategory] : 'All';
    
    console.log(`Fetching products for category: ${this.selectedCategory} (ID: ${categoryId})`);
    
    // Using the hot deals method to fetch products from API with category filter
    this.productService.getHotDealsItems(1, 20, categoryId).subscribe(
      response => {
        this.products = response.products;
        this.isLoading = false;
        console.log(`Loaded ${response.products.length} products for category: ${categoryName}`);
      },
      error => {
        console.error('Error loading products from API:', error);
        this.isLoading = false;
      }
    );
  }

  onFiltersChanged(filters: any) {
    // TODO: Implement filter functionality
  }
  
  getCategoryDisplayName(): string {
    if (this.selectedCategory && this.categoryDisplayNames[this.selectedCategory]) {
      return this.categoryDisplayNames[this.selectedCategory];
    }
    return 'All Products';
  }
}