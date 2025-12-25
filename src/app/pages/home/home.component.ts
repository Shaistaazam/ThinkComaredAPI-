import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/product.model';
import { HelpSectionComponent } from '../../components/help-section/help-section.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { HotDealsComponent } from '../../components/hot-deals/hot-deals.component';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HelpSectionComponent,
    BestSellersComponent,
    HotDealsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  @ViewChild(HotDealsComponent) hotDealsComponent!: HotDealsComponent;

  products: Product[] = [
    {
      id: 1,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick1.png',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick2.png',
      rating: 4.2,
    },
    {
      id: 3,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick3.png',
      rating: 4.0,
    },
    {
      id: 4,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick4.png',
      rating: 4.7,
    },
    {
      id: 5,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick5.png',
      rating: 4.5,
    },
    {
      id: 6,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick6.png',
      rating: 4.3,
    },
    {
      id: 7,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick7.png',
      rating: 4.6,
    },
    {
      id: 8,
      name: 'New LG IID RES MONITOR',
      price: 275.97,
      description: 'IN STOCK',
      imageUrl: 'assets/images/pick8.png',
      rating: 4.4,
    },
  ];

  constructor(
    private router: Router,
    private services: ProductService
  ) {}

  ngOnInit() {
    this.services.getProducts().subscribe((result) => {
      console.log("Product :", result)
    })
  }

  // Category click handlers
  onCategoryClick(category: string) {
    if (this.hotDealsComponent) {
      this.hotDealsComponent.onCategoryChange(category);
    }
    
    // Smooth scroll to hot deals section
    const hotDealsElement = document.querySelector('app-hot-deals');
    if (hotDealsElement) {
      hotDealsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  navigateToCategories() {
    this.router.navigate(['/category']);
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}