import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';


const appRoutes = [
  { path: '', component: NavbarComponent,  pathMatch: 'full'}
];

// export const routing = RouterModule.forRoot(appRoutes);
