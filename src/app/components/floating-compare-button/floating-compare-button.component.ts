import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComparisonService } from '../../services/comparison.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-floating-compare-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Floating Compare Button -->
    <div *ngIf="shouldShowButton" class="fixed bottom-16 left-8 z-[9999]">
      <button 
        (click)="toggleComparisonBar()"
        class="bg-[#FEB854] hover:bg-orange-500 text-white w-16 h-16 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 flex items-center justify-center relative">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <!-- Count Badge -->
        <span *ngIf="comparisonCount > 0" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-7 w-7 flex items-center justify-center font-bold shadow-lg">
          {{ comparisonCount }}
        </span>
      </button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class FloatingCompareButtonComponent implements OnInit {
  comparisonCount = 0;
  shouldShowButton = false;
  allowedRoutes = ['/hot-deals', '/comparison', '/', '/category', '/category-next', '/about', '/contact', '/account', '/product'];
  currentRoute = '';

  constructor(
    private router: Router,
    private comparisonService: ComparisonService
  ) {}

  ngOnInit(): void {
    // Subscribe to comparison items
    this.comparisonService.comparisonItems$.subscribe(products => {
      this.comparisonCount = products.length;
    });

    // Check current route and listen for route changes
    this.checkRoute(this.router.url);
    
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkRoute(event.url);
    });
  }

  private checkRoute(url: string): void {
    this.currentRoute = url;
    this.shouldShowButton = this.allowedRoutes.some(route => url.startsWith(route));
    console.log('Current URL:', url, 'Should show button:', this.shouldShowButton);
  }

  toggleComparisonBar(): void {
    // Always show comparison bar with empty slots when button is clicked
    this.comparisonService.showComparisonBar();
    
    // If on hot-deals page, just toggle the bar
    if (this.currentRoute.startsWith('/hot-deals')) {
      // Bar is already shown above
      return;
    }
    
    // On other pages, show the bar and enable empty slot hover
    // If user has products and wants to compare, navigate to comparison page
    if (this.comparisonCount >= 2) {
      // Show option to either view comparison or add more products
      const userChoice = confirm('You have ' + this.comparisonCount + ' products selected. Do you want to compare them now? (Cancel to add more products)');
      if (userChoice) {
        this.router.navigate(['/comparison']);
      }
      // If cancelled, comparison bar will remain visible for adding more products
    } else if (this.comparisonCount === 1) {
      // Show bar to add more products
      // Bar is already shown above
    } else {
      // No products selected, show bar to start selecting
      // Bar is already shown above
    }
  }
}