import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { NgModule } from '@angular/core';
import { ProductosComponent } from './productos/productos.component';

const appRoutes: Routes = [
  //{ path: '', component: NavbarComponent},
  { path: '', component: ProductosComponent},
  { path: 'crearProducto', component: CrearProductoComponent },
  { path: '**', pathMatch:'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}

// export const routing = RouterModule.forRoot(appRoutes);
