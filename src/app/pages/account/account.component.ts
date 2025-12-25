import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  phone: string;
  address: string;
}

interface Order {
  id: string;
  productName: string;
  productImage: string;
  price: number;
  status: 'delivered' | 'processing' | 'shipped' | 'cancelled';
  orderDate: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  activeTab: string = 'dashboard';
  
  user: User = {
    name: 'Shaista Azam',
    email: 'shaistaazam@email.com',
    avatar: 'SA',
    joinDate: 'January 2024',
    phone: '+92 300 1234567',
    address: 'Karachi, Pakistan'
  };

  orders: Order[] = [
    {
      id: 'TC-12345',
      productName: 'iPhone 15 Pro Max',
      productImage: 'assets/images/pick1.png',
      price: 1199.99,
      status: 'delivered',
      orderDate: '2024-12-20'
    },
    {
      id: 'TC-12346',
      productName: 'Samsung Galaxy S24 Ultra',
      productImage: 'assets/images/pick2.png',
      price: 1099.99,
      status: 'processing',
      orderDate: '2024-12-22'
    },
    {
      id: 'TC-12347',
      productName: 'MacBook Pro M3 Max',
      productImage: 'assets/images/pick3.png',
      price: 3199.99,
      status: 'shipped',
      orderDate: '2024-12-18'
    },
    {
      id: 'TC-12348',
      productName: 'Dell XPS 15',
      productImage: 'assets/images/pick4.png',
      price: 2299.99,
      status: 'cancelled',
      orderDate: '2024-12-15'
    }
  ];

  wishlistItems: WishlistItem[] = [
    {
      id: 1,
      name: 'Gaming Mouse',
      price: 49.99,
      image: 'assets/images/pick5.png'
    },
    {
      id: 2,
      name: 'Mechanical Keyboard',
      price: 129.99,
      image: 'assets/images/pick6.png'
    },
    {
      id: 3,
      name: '4K Monitor',
      price: 599.99,
      image: 'assets/images/pick1.png'
    },
    {
      id: 4,
      name: 'Wireless Headphones',
      price: 299.99,
      image: 'assets/images/pick2.png'
    }
  ];

  // Edit profile form
  editingProfile = false;
  editForm = { ...this.user };

  ngOnInit(): void {
    // Initialize component
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getOrderStats() {
    const total = this.orders.length;
    const completed = this.orders.filter(o => o.status === 'delivered').length;
    const pending = this.orders.filter(o => o.status === 'processing' || o.status === 'shipped').length;
    const cancelled = this.orders.filter(o => o.status === 'cancelled').length;
    
    return { total, completed, pending, cancelled };
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-orange-100 text-orange-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }

  startEditProfile(): void {
    this.editingProfile = true;
    this.editForm = { ...this.user };
  }

  cancelEditProfile(): void {
    this.editingProfile = false;
    this.editForm = { ...this.user };
  }

  saveProfile(): void {
    this.user = { ...this.editForm };
    this.editingProfile = false;
    // Here you would typically save to backend
    console.log('Profile updated:', this.user);
  }

  removeFromWishlist(itemId: number): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== itemId);
    console.log('Removed from wishlist:', itemId);
  }

  reorderProduct(orderId: string): void {
    console.log('Reordering product:', orderId);
    // Add reorder logic here
  }

  trackOrder(orderId: string): void {
    console.log('Tracking order:', orderId);
    // Add order tracking logic here
  }

  logout(): void {
    console.log('Logging out...');
    // Add logout logic here
  }
}
