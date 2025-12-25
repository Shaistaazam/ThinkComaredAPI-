import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';

// Export a function that properly handles the BootstrapContext for SSR
export default function () {
  return bootstrapApplication(AppComponent, config);
}
