import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { CrearProductoComponent } from './components/productos/crear-producto/crear-producto.component';
import { NgModule } from '@angular/core';
import { ProductosComponent } from './components/productos/productos.component';
import { LoginComponent } from './components/login/login.component';
import { SectorComponent } from './components/sector/sector.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { MarcasComponent } from './components/marcas/marcas.component';

const appRoutes: Routes = [
  // { path: '', component: LoginComponent},
  // { path: 'inicio' , component: LoginComponent},
  { path: 'productos', component: ProductosComponent },
  { path: 'crearProducto', component: CrearProductoComponent },
  { path: 'sector', component: SectorComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'marcas', component: MarcasComponent },
  { path: '', redirectTo: '/productos', pathMatch: 'full' }, // Si deseas redirigir a una ruta predeterminada
  // { path: '**', redirectTo: '/productos' } // Redirige a /productos si la URL no coincide con ninguna ruta definida
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}

// export const routing = RouterModule.forRoot(appRoutes);
