import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotDealsComponent } from './pages/hot-deals/hot-deals.component';
import { CategoryComponent } from './pages/category/category.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AccountComponent } from './pages/account/account.component';
import { CategoryNextComponent } from './pages/category/category-next/category-next.component';
import { ComparisonComponent } from './pages/comparison/comparison.component';
import { ComparisonProductsComponent } from './pages/comparison-products/comparison-products.component';
import { CompareComponent } from './pages/compare/compare.component';
import { CompareViewComponent } from './pages/compare/compare-view.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'category-next', component: CategoryNextComponent },
  { path: 'hot-deals', component: HotDealsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'account', component: AccountComponent },
  { path: 'comparison', component: ComparisonComponent },
  { path: 'compare', component: CompareComponent },
  { path: 'compare/view', component: CompareViewComponent },
  { path: 'products', component: ComparisonProductsComponent },

  { path: '**', redirectTo: '' },
];
