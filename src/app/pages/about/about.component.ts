import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit, OnDestroy {
  // Animation states
  isVisible = false;
  
  // Stats animation
  stats = [
    { value: 0, target: 30000, suffix: 'K+', label: 'Trusted Retailers', description: 'Verified Partners' },
    { value: 0, target: 5000000, suffix: 'M+', label: 'Products Listed', description: 'Updated Daily' },
    { value: 0, target: 500000, suffix: 'K+', label: 'Happy Users', description: 'Growing Daily' },
    { value: 0, target: 24, suffix: '/7', label: 'Customer Support', description: 'Always Available' }
  ];
  
  private animationInterval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Trigger entrance animations
    setTimeout(() => {
      this.isVisible = true;
    }, 100);
    
    // Start stats animation when component loads
    this.animateStats();
    
    // Add scroll animations
    this.setupScrollAnimations();
  }

  ngOnDestroy(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  private animateStats(): void {
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 FPS
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    
    this.animationInterval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      this.stats.forEach(stat => {
        stat.value = Math.floor(stat.target * easeOutProgress);
      });
      
      if (currentStep >= steps) {
        clearInterval(this.animationInterval);
        // Ensure final values are exact
        this.stats.forEach(stat => {
          stat.value = stat.target;
        });
      }
    }, stepDuration);
  }

  private setupScrollAnimations(): void {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements with animation classes
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
      animatedElements.forEach(el => observer.observe(el));
    }, 500);
  }

  // Navigation methods
  navigateToHotDeals(): void {
    this.router.navigate(['/hot-deals']);
  }

  navigateToCompare(): void {
    this.router.navigate(['/compare']);
  }

  // Utility method to format large numbers
  formatStatValue(stat: any): string {
    if (stat.target >= 1000000) {
      return (stat.value / 1000000).toFixed(1) + 'M+';
    } else if (stat.target >= 1000) {
      return (stat.value / 1000).toFixed(0) + 'K+';
    } else {
      return stat.value.toString() + stat.suffix;
    }
  }

  // Scroll to section method
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
