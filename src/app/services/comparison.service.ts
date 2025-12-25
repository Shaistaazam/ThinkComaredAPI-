import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {
  private maxComparisonItems = 4;
  private comparisonItems = new BehaviorSubject<Product[]>([]);
  
  comparisonItems$ = this.comparisonItems.asObservable();

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
    return true;
  }

  removeFromComparison(productId: number): void {
    const currentItems = this.comparisonItems.value;
    const updatedItems = currentItems.filter(item => item.id !== productId);
    this.comparisonItems.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }

  clearComparison(): void {
    this.comparisonItems.next([]);
    localStorage.removeItem('comparisonItems');
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