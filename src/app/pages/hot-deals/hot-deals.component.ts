import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryHeroComponent } from '../../components/category-hero/category-hero.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { HotDealsProductCardComponent } from '../../components/hot-deals-product-card/hot-deals-product-card.component';
import { FilterSidebarComponent } from '../../components/filter-sidebar/filter-sidebar.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ComparisonBarComponent } from '../../components/comparison-bar/comparison-bar.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { HelpSectionComponent } from '../../components/help-section/help-section.component';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hot-deals',
  standalone: true,
  imports: [
    CategoryHeroComponent,
    HotDealsProductCardComponent,
    FilterSidebarComponent,
    PaginationComponent,
    ComparisonBarComponent,
    BestSellersComponent,
    HelpSectionComponent,
    NgFor,
    NgIf,
    FormsModule
  ],
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.scss'],
})
export class HotDealsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  loading = true;
  pagination: {pageNo: number, perPage: number, totalItems: number, selectedItems: number} | null = null;
  currentPage = 1;
  selectedItemsPerPage = 12; // Default items per page
  itemsPerPageOptions = [12, 24, 48, 96]; // Items per page options
  selectedCategoryId: number | undefined = undefined; // No filter by default to show all
  selectedFilters: { [key: string]: string[] } = {}; // Selected filters
  selectedSortOption: string = 'popular'; // Default sort option
  Math = Math; // Make Math available in template
  private subscription: Subscription = new Subscription();

  // Split products for comparison bar placement
  get firstRowProducts(): Product[] {
    const itemsPerRow = 4; // Assuming 4 items per row on desktop
    return this.products.slice(0, itemsPerRow * 2); // First 2 rows
  }

  get remainingProducts(): Product[] {
    const itemsPerRow = 4;
    return this.products.slice(itemsPerRow * 2); // Remaining products
  }
  
  categories = [
    { id: undefined, name: 'All Categories' },
    { id: 22, name: 'Laptops' },
    { id: 23, name: 'Monitors' }, 
    { id: 24, name: 'Desktops' },
    { id: 3, name: 'Mobiles' }
  ];
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    // Set default values
    this.selectedItemsPerPage = 12;
    this.selectedCategoryId = undefined;
    
    // Listen for query parameter changes
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategoryId = Number(params['category']);
      }
      this.loadHotDealProducts();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  loadHotDealProducts(pageNo: number = 1): void {
    this.loading = true;
    this.currentPage = pageNo;
      
    // Call the API to get items with current category filter and selected items per page
    this.productService.getHotDealsItems(pageNo, this.selectedItemsPerPage, this.selectedCategoryId).subscribe({
      next: (result: {products: Product[], pagination: {pageNo: number, perPage: number, totalItems: number, selectedItems: number}}) => {
        this.products = result.products;
        this.pagination = result.pagination;
        this.loading = false;
        console.log('Hot deal products loaded:', this.products);
        console.log('Pagination:', this.pagination);
          
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (error: any) => {
        console.error('Error loading hot deal products:', error);
        this.loading = false;
      }
    });
  }

  onNextPage(): void {
    if (this.pagination && this.canGoNext()) {
      this.loadHotDealProducts(this.currentPage + 1);
    }
  }

  onPreviousPage(): void {
    if (this.pagination && this.canGoPrevious()) {
      this.loadHotDealProducts(this.currentPage - 1);
    }
  }

  canGoNext(): boolean {
    if (!this.pagination) return false;
    return this.currentPage * this.pagination.perPage < this.pagination.totalItems;
  }

  canGoPrevious(): boolean {
    return this.currentPage > 1;
  }

  getTotalPages(): number {
    if (!this.pagination) return 0;
    // For 936 items, calculate actual pages needed
    const totalPages = Math.ceil(this.pagination.totalItems / this.selectedItemsPerPage);
    console.log('Calculated total pages:', totalPages, 'Total items:', this.pagination.totalItems, 'Items per page:', this.selectedItemsPerPage);
    return totalPages;
  }

  onCategoryChange(categoryId: number | undefined): void {
    this.selectedCategoryId = categoryId;
    this.currentPage = 1; // Reset to page 1 when category changes
    this.loadHotDealProducts(1);
    
    // Update URL with category parameter
    const queryParams = categoryId ? { category: categoryId } : {};
    // Note: For a complete implementation, you would use Router to update the URL
    // This requires importing Router and using router.navigate with queryParamsHandling
  }

  onFiltersChanged(filters: any): void {
    console.log('Filters changed:', filters);
    // TODO: Implement filter functionality
  }

  onFiltersApplied(): void {
    console.log('Filters applied button clicked in hot-deals component');
    // Reload products when filters are applied
    this.loadHotDealProducts(this.currentPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadHotDealProducts(page);
  }

  onItemsPerPageChange(event: any): void {
    const itemsPerPage = event.target ? parseInt(event.target.value, 10) : parseInt(event, 10);
    this.selectedItemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to first page when changing items per page
    this.loadHotDealProducts(1);
  }

  onProductAdded(): void {
    // This method is called when a product is added to comparison
    // The comparison bar will automatically show due to the subscription
  }

}
