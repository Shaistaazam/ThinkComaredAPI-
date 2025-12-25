import { Injectable } from '@angular/core';
import { Observable, of, catchError, map, throwError } from 'rxjs';
import { Product } from '../models/product.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = environment.apiUrl;
  private readonly backupUrls = environment.backupApiUrls;
  private currentApiIndex = 0;

  constructor(private http: HttpClient) { }

  private products: Product[] = [
    // Mobile Phones
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system.',
      price: 1199.99,
      category: 'Mobile',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.8,
      reviewsCount: 342,
      isFeatured: true,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      description: 'Premium Android phone with S Pen, 200MP camera, and AI features.',
      price: 1099.99,
      category: 'Mobile',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.7,
      reviewsCount: 289,
      isFeatured: true,
    },
    {
      id: 3,
      name: 'Google Pixel 8 Pro',
      description: 'AI-powered photography, pure Android experience, and Magic Eraser.',
      price: 899.99,
      category: 'Mobile',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.6,
      reviewsCount: 156,
      isFeatured: true,
    },
    {
      id: 4,
      name: 'OnePlus 12',
      description: 'Fast charging, smooth performance, and flagship camera system.',
      price: 799.99,
      category: 'Mobile',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.5,
      reviewsCount: 198,
      isFeatured: true,
    },
    {
      id: 5,
      name: 'Xiaomi 14 Ultra',
      description: 'Leica camera partnership, premium build, and competitive pricing.',
      price: 699.99,
      category: 'Mobile',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.4,
      reviewsCount: 167,
      isFeatured: true,
    },
    {
      id: 6,
      name: 'Nothing Phone 2',
      description: 'Unique transparent design with Glyph interface and clean Android.',
      price: 599.99,
      category: 'Mobile',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.3,
      reviewsCount: 134,
      isFeatured: true,
    },

    // Desktop/Laptops
    {
      id: 7,
      name: 'MacBook Pro M3 Max',
      description: 'Ultimate creative powerhouse with M3 Max chip and Liquid Retina XDR display.',
      price: 3199.99,
      category: 'Desktop',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.9,
      reviewsCount: 245,
      isFeatured: true,
    },
    {
      id: 8,
      name: 'Dell XPS 15',
      description: 'Premium Windows laptop with OLED display and RTX graphics.',
      price: 2299.99,
      category: 'Desktop',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.6,
      reviewsCount: 189,
      isFeatured: true,
    },
    {
      id: 9,
      name: 'Gaming Desktop RTX 4090',
      description: 'High-end gaming PC with RTX 4090, Intel i9, and liquid cooling.',
      price: 4999.99,
      category: 'Desktop',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.8,
      reviewsCount: 156,
      isFeatured: true,
    },
    {
      id: 10,
      name: 'Surface Studio 2+',
      description: 'All-in-one creative workstation with touch display and Surface Pen.',
      price: 3499.99,
      category: 'Desktop',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.5,
      reviewsCount: 98,
      isFeatured: true,
    },
    {
      id: 11,
      name: 'iMac 24" M3',
      description: 'Colorful all-in-one with M3 chip and 4.5K Retina display.',
      price: 1699.99,
      category: 'Desktop',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.7,
      reviewsCount: 234,
      isFeatured: true,
    },
    {
      id: 12,
      name: 'ASUS ROG Strix',
      description: 'Gaming laptop with RTX 4080, RGB keyboard, and high refresh display.',
      price: 2799.99,
      category: 'Desktop',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.6,
      reviewsCount: 167,
      isFeatured: true,
    },

    // Electronics
    {
      id: 13,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 99.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.5,
      reviewsCount: 128,
      isFeatured: true,
    },
    {
      id: 14,
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with health monitoring and waterproof design.',
      price: 199.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.2,
      reviewsCount: 97,
      isNew: true,
    },
    {
      id: 15,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker with excellent sound quality and 12-hour battery.',
      price: 79.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.0,
      reviewsCount: 64,
    },
    {
      id: 16,
      name: '4K Webcam',
      description: 'Professional 4K webcam with auto-focus and noise reduction.',
      price: 149.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.4,
      reviewsCount: 89,
      isFeatured: true,
    },
    {
      id: 17,
      name: 'Wireless Charger',
      description: 'Fast wireless charging pad compatible with all Qi devices.',
      price: 39.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.1,
      reviewsCount: 156,
    },
    {
      id: 18,
      name: 'Smart Home Hub',
      description: 'Central control for all your smart home devices with voice control.',
      price: 129.99,
      category: 'Electronics',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.3,
      reviewsCount: 203,
      isFeatured: true,
    },

    // Accessories
    {
      id: 19,
      name: 'Gaming Mouse',
      description: 'Ergonomic gaming mouse with customizable buttons and RGB lighting.',
      price: 49.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.7,
      reviewsCount: 215,
      isFeatured: true,
    },
    {
      id: 20,
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard with programmable keys and anti-ghosting.',
      price: 129.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.8,
      reviewsCount: 189,
      isNew: true,
    },
    {
      id: 21,
      name: 'USB-C Hub',
      description: 'Multi-port USB-C hub with HDMI, USB 3.0, and power delivery.',
      price: 69.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.2,
      reviewsCount: 134,
    },
    {
      id: 22,
      name: 'Phone Stand',
      description: 'Adjustable phone stand with wireless charging capability.',
      price: 24.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.0,
      reviewsCount: 87,
    },
    {
      id: 23,
      name: 'Laptop Sleeve',
      description: 'Premium leather laptop sleeve with magnetic closure.',
      price: 59.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.5,
      reviewsCount: 112,
      isFeatured: true,
    },
    {
      id: 24,
      name: 'Cable Organizer',
      description: 'Magnetic cable management system for desk organization.',
      price: 19.99,
      category: 'Accessories',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.3,
      reviewsCount: 98,
    },

    // Audio
    {
      id: 25,
      name: 'Studio Headphones',
      description: 'Professional studio headphones for music production and mixing.',
      price: 299.99,
      category: 'Audio',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.8,
      reviewsCount: 167,
      isFeatured: true,
    },
    {
      id: 26,
      name: 'Podcast Microphone',
      description: 'USB condenser microphone perfect for podcasting and streaming.',
      price: 179.99,
      category: 'Audio',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.6,
      reviewsCount: 234,
      isFeatured: true,
    },
    {
      id: 27,
      name: 'Soundbar',
      description: 'Premium soundbar with Dolby Atmos and wireless subwoofer.',
      price: 399.99,
      category: 'Audio',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.7,
      reviewsCount: 145,
      isFeatured: true,
    },
    {
      id: 28,
      name: 'Earbuds Pro',
      description: 'True wireless earbuds with active noise cancellation.',
      price: 249.99,
      category: 'Audio',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.5,
      reviewsCount: 189,
      isFeatured: true,
    },
    {
      id: 29,
      name: 'Audio Interface',
      description: 'Professional audio interface for recording and music production.',
      price: 199.99,
      category: 'Audio',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.4,
      reviewsCount: 76,
    },
    {
      id: 30,
      name: 'Vinyl Player',
      description: 'Modern turntable with USB conversion and Bluetooth connectivity.',
      price: 349.99,
      category: 'Audio',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.6,
      reviewsCount: 123,
      isFeatured: true,
    },

    // Storage
    {
      id: 31,
      name: 'External SSD 2TB',
      description: 'Fast external SSD with 2TB storage capacity and USB 3.2 Gen 2.',
      price: 249.99,
      category: 'Storage',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.7,
      reviewsCount: 156,
      isFeatured: true,
    },
    {
      id: 32,
      name: 'NAS Drive 4-Bay',
      description: 'Network attached storage for home and office backup solutions.',
      price: 599.99,
      category: 'Storage',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.5,
      reviewsCount: 89,
    },
    {
      id: 33,
      name: 'USB Flash Drive 128GB',
      description: 'High-speed USB 3.0 flash drive with metal construction.',
      price: 29.99,
      category: 'Storage',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.2,
      reviewsCount: 234,
    },
    {
      id: 34,
      name: 'Cloud Storage 1TB',
      description: 'Secure cloud storage with automatic backup and sync.',
      price: 99.99,
      category: 'Storage',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.4,
      reviewsCount: 167,
      isFeatured: true,
    },
    {
      id: 35,
      name: 'Memory Card 256GB',
      description: 'High-speed microSD card for cameras and mobile devices.',
      price: 49.99,
      category: 'Storage',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.3,
      reviewsCount: 198,
    },
    {
      id: 36,
      name: 'Portable HDD 5TB',
      description: 'Large capacity portable hard drive for backup and storage.',
      price: 149.99,
      category: 'Storage',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.1,
      reviewsCount: 112,
    },
  ];

  getProducts(): Observable<Product[]> {
    return this.tryApiCall('/getItems').pipe(
      map(response => this.mapApiResponseToProducts(response)),
      catchError(error => {
        console.error('All API endpoints failed, using local data:', error);
        return of(this.products);
      })
    );
  }

  private tryApiCall(endpoint: string, params?: any): Observable<any> {
    const urls = [this.apiUrl, ...this.backupUrls];
    
    const attemptCall = (urlIndex: number): Observable<any> => {
      if (urlIndex >= urls.length) {
        return throwError(() => new Error('All API endpoints failed'));
      }
      
      const url = urls[urlIndex] + endpoint;
      console.log(`Trying API endpoint ${urlIndex + 1}/${urls.length}: ${url}`);
      
      return this.http.get<any>(url, { params }).pipe(
        catchError((error: HttpErrorResponse) => {
          console.warn(`API endpoint ${urlIndex + 1} failed:`, error.message);
          
          // If this isn't the last URL, try the next one
          if (urlIndex < urls.length - 1) {
            return attemptCall(urlIndex + 1);
          }
          
          // If all URLs failed, throw the error
          return throwError(() => error);
        })
      );
    };
    
    return attemptCall(0);
  }

  private mapApiResponseToProducts(response: any): Product[] {
    if (response && response.response && response.response.data && response.response.data.data) {
      return response.response.data.data.map((item: any) => ({
        id: this.generateIdFromString(item.id || ''),
        name: item.title || 'Unknown Product',
        description: item.longDescription || 'No description available',
        price: item.price && item.price.length > 0 ? item.price[0].amount : 0,
        category: item.categoryId ? `Category ${item.categoryId}` : 'Uncategorized',
        imageUrl: item.images && item.images.additional_images && item.images.additional_images.length > 0 
          ? item.images.additional_images[0] 
          : 'assets/images/placeholder.png',
        rating: item.overAllRating || 0,
        reviewsCount: 0,
        isFeatured: item.isFavourite || false,
        isNew: item.condition === 'New'
      }));
    }
    return this.products; // Fallback to local data
  }

  private generateIdFromString(str: string): number {
    // Generate a numeric ID from string by summing character codes
    return str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find(p => p.id === id);
    return of(product);
  }

  getFeaturedProducts(): Observable<Product[]> {
    const featured = this.products.filter(p => p.isFeatured);
    return of(featured);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    const filtered = this.products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    return of(filtered);
  }

  // New method for getting products by category with count limit
  getProductsByCategoryWithLimit(category: string, limit?: number): Observable<Product[]> {
    let filtered = this.products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    
    if (limit && limit > 0) {
      filtered = filtered.slice(0, limit);
    }
    
    return of(filtered);
  }

  // New method for getting hot deals by category
  getHotDealsByCategory(category?: string, limit: number = 12): Observable<Product[]> {
    let products = this.products;
    
    // Filter by category if provided
    if (category && category.toLowerCase() !== 'all') {
      products = products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    
    // Get featured products first, then fill with regular products
    const featured = products.filter(p => p.isFeatured);
    const regular = products.filter(p => !p.isFeatured);
    
    // Combine and limit
    const combined = [...featured, ...regular].slice(0, limit);
    
    return of(combined);
  }

  getHotDealsItems(pageNo: number = 1, perPage: number = 12, categoryId?: number): Observable<{products: Product[], pagination: {pageNo: number, perPage: number, totalItems: number, selectedItems: number}}> {
    // Build query parameters
    let params: any = {
      pageNo: pageNo,
      perPage: perPage
    };
    
    if (categoryId !== undefined) {
      params.categoryId = categoryId;
    }
    
    return this.tryApiCall('/getItems', params).pipe(
      map(response => {
        if (response && response.response && response.response.data && response.response.data.data) {
          console.log('API Response:', response);
          
          let products = this.mapApiResponseToProducts(response);

          // Calculate pagination from API response
          const apiPagination = response.response.data.pagination;
          const simulatedTotalItems = 936;
          
          const pagination = {
            pageNo: apiPagination?.pageNo || pageNo,
            perPage: apiPagination?.perPage || perPage,
            totalItems: simulatedTotalItems,
            selectedItems: Math.min(perPage, products.length)
          };

          return {
            products: products,
            pagination: pagination
          };
        }
        
        // This shouldn't happen as tryApiCall handles fallback
        return this.getFallbackHotDeals(pageNo, perPage);
      }),
      catchError(error => {
        console.error('Error fetching hot deals from API, using local data instead:', error);
        return of(this.getFallbackHotDeals(pageNo, perPage));
      })
    );
  }

  private getFallbackHotDeals(pageNo: number, perPage: number) {
    const totalItems = this.products.length;
    const startIndex = (pageNo - 1) * perPage;
    const endIndex = startIndex + perPage;
    const selectedItems = Math.min(perPage, totalItems - startIndex);
    const paginatedProducts = this.products.slice(startIndex, endIndex);
    
    return {
      products: paginatedProducts,
      pagination: {
        pageNo: pageNo,
        perPage: perPage,
        totalItems: totalItems,
        selectedItems: selectedItems
      }
    };
  }
}