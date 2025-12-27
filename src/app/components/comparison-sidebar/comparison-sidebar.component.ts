import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ComparisonService } from '../../services/comparison.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-comparison-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white border border-gray-200 rounded-lg shadow-lg p-4 animate-fade-in">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-[#1E293B]">Compare Products</h3>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">{{ comparisonItems.length }}/{{ maxSlots }}</span>
          <button (click)="onClose()" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Comparison Slots -->
      <div class="space-y-3">
        <!-- Filled Slots -->
        <div *ngFor="let item of comparisonItems" 
             class="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition-colors">
          <div class="flex items-start space-x-3">
            <img [src]="item.imageUrl" 
                 [alt]="item.name" 
                 class="w-12 h-12 object-cover rounded-md flex-shrink-0">
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-medium text-[#1E293B] truncate">{{ item.name }}</h4>
              <p class="text-sm font-semibold text-[#DC2626] mt-1">\${{ item.price }}</p>
            </div>
            <button (click)="removeFromComparison(item.id)"
                    class="text-gray-400 hover:text-red-500 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Empty Slots - Only show when no products are added -->
        <div *ngIf="comparisonItems.length === 0" 
             class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
          <div class="text-gray-400">
            <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <p class="text-sm">Click product to add</p>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 space-y-2" *ngIf="comparisonItems.length > 0">
        <button (click)="compareNow()"
                [disabled]="comparisonItems.length < 2"
                class="w-full bg-[#4F46E5] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#4338CA] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
          Compare Now ({{ comparisonItems.length }})
        </button>
        
        <button (click)="clearAll()"
                class="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Clear All
        </button>
      </div>

      <!-- Help Text -->
      <div class="mt-4 text-xs text-gray-500 text-center" *ngIf="comparisonItems.length === 0">
        <p>Add products to compare prices and features</p>
        <p class="mt-1">Maximum {{ maxSlots }} products</p>
      </div>
      
      <div class="mt-4 text-xs text-gray-500 text-center" *ngIf="comparisonItems.length === 1">
        <p>Add at least one more product to compare</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    
    .animate-fade-in {
      animation: fadeIn 0.2s ease-in-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class ComparisonSidebarComponent implements OnInit, OnDestroy {
  @Output() closeSidebar = new EventEmitter<void>();
  
  comparisonItems: Product[] = [];
  maxSlots = 4;
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
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeFromComparison(productId: number): void {
    this.comparisonService.removeFromComparison(productId);
  }

  clearAll(): void {
    this.comparisonService.clearComparison();
  }

  compareNow(): void {
    if (this.comparisonItems.length >= 2) {
      this.router.navigate(['/compare/view']);
    }
  }

  getEmptySlots(): number[] {
    const emptyCount = this.maxSlots - this.comparisonItems.length;
    return Array(emptyCount).fill(0).map((_, index) => index);
  }

  onClose(): void {
    this.closeSidebar.emit();
  }
}