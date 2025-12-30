import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private maxComparisonItems = 4;
  private comparisonItems = new BehaviorSubject<Product[]>([]);
  private comparisonBarVisible = new BehaviorSubject<boolean>(false);
  private showEmptySlotHover = new BehaviorSubject<boolean>(false);
  
  comparisonItems$ = this.comparisonItems.asObservable();
  comparisonBarVisible$ = this.comparisonBarVisible.asObservable();
  showEmptySlotHover$ = this.showEmptySlotHover.asObservable();

  constructor() {
    // Load from localStorage if available
    const saved = localStorage.getItem('comparisonItems');
    if (saved) {
      try {
        const items = JSON.parse(saved);
        this.comparisonItems.next(items);
      } catch (error) {
        console.error('Error loading comparison items:', error);
      }
    }
  }

  toggleComparisonBar(): void {
    const isVisible = !this.comparisonBarVisible.value;
    this.comparisonBarVisible.next(isVisible);
    
    // Enable empty slot hover when bar is visible
    this.showEmptySlotHover.next(isVisible);
  }

  showComparisonBar(): void {
    this.comparisonBarVisible.next(true);
    this.showEmptySlotHover.next(true);
  }

  hideComparisonBar(): void {
    this.comparisonBarVisible.next(false);
    this.showEmptySlotHover.next(false);
  }

  enableEmptySlotHover(): void {
    this.showEmptySlotHover.next(true);
  }

  disableEmptySlotHover(): void {
    this.showEmptySlotHover.next(false);
  }

  isEmptySlotHoverEnabled(): boolean {
    return this.showEmptySlotHover.value;
  }

  addToComparison(product: Product): boolean {
    const currentItems = this.comparisonItems.value;
    
    // Check if already exists
    if (currentItems.find(item => item.id === product.id)) {
      return false; // Already in comparison
    }
    
    // Check if max limit reached
    if (currentItems.length >= this.maxComparisonItems) {
      return false; // Max limit reached
    }
    
    const updatedItems = [...currentItems, product];
    this.comparisonItems.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
    
    // Auto-show comparison bar when product is added
    this.showComparisonBar();
    
    return true;
  }

  removeFromComparison(productId: number): void {
    const currentItems = this.comparisonItems.value;
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.comparisonItems.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
    
    // Hide comparison bar if no items left
    if (updatedItems.length === 0) {
      this.hideComparisonBar();
    }
  }

  clearComparison(): void {
    this.comparisonItems.next([]);
    localStorage.removeItem('comparisonItems');
    this.hideComparisonBar();
  }

  getComparisonItems(): Product[] {
    return this.comparisonItems.value;
  }

  getComparisonCount(): number {
    return this.comparisonItems.value.length;
  }

  isInComparison(productId: number): boolean {
    return this.comparisonItems.value.some(item => item.id === productId);
  }

  canAddMore(): boolean {
    return this.comparisonItems.value.length < this.maxComparisonItems;
  }

  getAvailableSlots(): number {
    return this.maxComparisonItems - this.comparisonItems.value.length;
  }

  private saveToLocalStorage(items: Product[]): void {
    localStorage.setItem('comparisonItems', JSON.stringify(items));
  }
}