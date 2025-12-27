import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
}

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  
  contactInfo: ContactInfo = {
    phone: '+92 300 1234567',
    email: 'support@thinkcompared.com',
    address: 'Karachi, Pakistan',
    hours: {
      weekdays: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    }
  };

  categories = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Payment' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'other', label: 'Other' }
  ];

  faqs = [
    {
      question: 'How do I compare products?',
      answer: 'Simply browse our products, click "Add to Compare" on up to 4 products, then click the floating compare button to view detailed comparisons.',
      isOpen: false
    },
    {
      question: 'Is the price comparison accurate?',
      answer: 'Yes, we update prices regularly from multiple sources to ensure accuracy. However, prices may change frequently, so we recommend checking the retailer\'s website for final pricing.',
      isOpen: false
    },
    {
      question: 'How can I track my orders?',
      answer: 'You can track your orders by logging into your account and visiting the Orders section. You\'ll receive email updates with tracking information.',
      isOpen: false
    },
    {
      question: 'Do you offer customer support?',
      answer: 'Yes! Our customer support team is available Monday-Friday 9AM-6PM and Saturday 10AM-4PM. Contact us via phone, email, or this contact form.',
      isOpen: false
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]{10,}$/)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      category: ['general', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize component
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        console.log('Contact form submitted:', this.contactForm.value);
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.contactForm.reset();
        this.contactForm.patchValue({ category: 'general' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email';
      if (field.errors['minlength']) return `${fieldName} is too short`;
      if (field.errors['pattern']) return 'Please enter a valid phone number';
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  toggleFaq(index: number): void {
    this.faqs[index].isOpen = !this.faqs[index].isOpen;
  }

  callPhone(): void {
    window.open(`tel:${this.contactInfo.phone}`, '_self');
  }

  sendEmail(): void {
    window.open(`mailto:${this.contactInfo.email}`, '_self');
  }

  openMap(): void {
    // Open Google Maps for the address
    const encodedAddress = encodeURIComponent(this.contactInfo.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  }
}
