import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ComparisonService } from '../../services/comparison.service';
import { Product } from '../../models/product.model';
import { NgFor, NgIf, CommonModule } from '@angular/common';
import { FloatingCompareButtonComponent } from '../../components/floating-compare-button/floating-compare-button.component';

@Component({
  selector: 'app-comparison-products',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FloatingCompareButtonComponent],
  template: `
    <div class="bg-white">
      <!-- Header -->
      <div class="container mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <h1 class="text-2xl font-bold text-gray-900">Compare Products</h1>
          <button 
            (click)="backToShopping()" 
            class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">
            Continue Shopping
          </button>
        </div>
      </div>

      <!-- Comparison Content -->
      <div class="container mx-auto px-4 py-8">
        <!-- Empty State with 4 Slots -->
        <div *ngIf="comparisonProducts.length === 0" class="text-center py-8">
          <h3 class="text-xl font-medium text-gray-900 mb-6">Compare Products</h3>
          <p class="text-gray-500 mb-8">You can select up to 4 products</p>
          
          <!-- Empty Product Slots -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div *ngFor="let slot of [1,2,3,4]" class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-96 flex flex-col items-center justify-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-gray-500 text-sm">Empty Slot</p>
            </div>
          </div>
          
          <button 
            (click)="backToShopping()" 
            class="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors duration-300">
            Browse Products
          </button>
        </div>

        <!-- Comparison Table -->
        <div *ngIf="comparisonProducts.length > 0" class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr>
                <th class="text-left p-4 border-b border-gray-200 bg-gray-50">Product</th>
                <th *ngFor="let slot of getSlots(); let i = index" class="p-4 border-b border-gray-200 bg-gray-50 relative">
                  <div *ngIf="comparisonProducts[i]; else emptySlot">
                    <button 
                      (click)="removeProduct(comparisonProducts[i].id)"
                      class="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl">×</button>
                    <div class="flex flex-col items-center">
                      <img [src]="comparisonProducts[i].imageUrl" [alt]="comparisonProducts[i].name" class="w-16 h-16 object-contain mb-2">
                      <h3 class="font-medium text-gray-900 text-center">{{ comparisonProducts[i].name }}</h3>
                    </div>
                  </div>
                  <ng-template #emptySlot>
                    <div class="flex flex-col items-center">
                      <div class="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p class="text-gray-500 text-sm">Empty</p>
                    </div>
                  </ng-template>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="p-4 border-b border-gray-200 font-medium text-gray-700">Price</td>
                <td *ngFor="let slot of getSlots(); let i = index" class="p-4 border-b border-gray-200 text-center">
                  <span *ngIf="comparisonProducts[i]" class="text-lg font-bold text-orange-500">{{ '$' + comparisonProducts[i].price }}</span>
                  <span *ngIf="!comparisonProducts[i]" class="text-gray-400">-</span>
                </td>
              </tr>
              <tr>
                <td class="p-4 border-b border-gray-200 font-medium text-gray-700">Rating</td>
                <td *ngFor="let slot of getSlots(); let i = index" class="p-4 border-b border-gray-200 text-center">
                  <div *ngIf="comparisonProducts[i]" class="flex items-center justify-center">
                    <span class="text-orange-500 font-medium mr-1">{{ comparisonProducts[i].rating }}</span>
                    <svg *ngFor="let star of [0,1,2,3,4]; let j = index" 
                         [attr.fill]="j < comparisonProducts[i].rating ? '#FBBF24' : '#E5E7EB'" 
                         viewBox="0 0 20 20" 
                         class="w-4 h-4">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span *ngIf="!comparisonProducts[i]" class="text-gray-400">-</span>
                </td>
              </tr>
              <tr>
                <td class="p-4 border-b border-gray-200 font-medium text-gray-700">Reviews</td>
                <td *ngFor="let slot of getSlots(); let i = index" class="p-4 border-b border-gray-200 text-center">
                  <span *ngIf="comparisonProducts[i]">{{ comparisonProducts[i].reviewsCount }} reviews</span>
                  <span *ngIf="!comparisonProducts[i]" class="text-gray-400">-</span>
                </td>
              </tr>
              <tr>
                <td class="p-4 border-b border-gray-200 font-medium text-gray-700">Category</td>
                <td *ngFor="let slot of getSlots(); let i = index" class="p-4 border-b border-gray-200 text-center">
                  <span *ngIf="comparisonProducts[i]">{{ comparisonProducts[i].category }}</span>
                  <span *ngIf="!comparisonProducts[i]" class="text-gray-400">-</span>
                </td>
              </tr>
              <tr>
                <td class="p-4"></td>
                <td *ngFor="let slot of getSlots(); let i = index" class="p-4 text-center">
                  <button *ngIf="comparisonProducts[i]"
                    (click)="removeProduct(comparisonProducts[i].id)"
                    class="text-red-500 hover:text-red-700 text-sm font-medium">
                    Remove
                  </button>
                  <span *ngIf="!comparisonProducts[i]" class="text-gray-400">-</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <app-floating-compare-button></app-floating-compare-button>
  `,
  styles: [`
    /* Comparison Page Styles */
    table {
      border-collapse: collapse;
      min-width: 600px; /* Ensure table is wide enough for comparison */
    }

    th, td {
      border: 1px solid #e5e7eb;
      text-align: left;
    }

    th {
      background-color: #f9fafb;
      font-weight: 600;
      color: #374151;
    }

    /* Responsive table */
    @media (max-width: 768px) {
      .overflow-x-auto {
        -webkit-overflow-scrolling: touch;
      }
      
      th, td {
        min-width: 150px;
      }
    }
  `]
})
export class ComparisonProductsComponent implements OnInit {
  comparisonProducts: Product[] = [];
  Math = Math; // Make Math available in template
  
  getSlots(): number[] {
    return [0, 1, 2, 3];
  }

  constructor(
    private comparisonService: ComparisonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.comparisonService.comparisonItems$.subscribe(products => {
      this.comparisonProducts = products;
    });
  }

  removeProduct(productId: number): void {
    this.comparisonService.removeFromComparison(productId);
  }

  backToShopping(): void {
    this.router.navigate(['/hot-deals']);
  }
}