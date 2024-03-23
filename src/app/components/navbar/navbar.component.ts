import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {
  public options = this._formBuilder.group({
    bottom: 0,
    fixed: false,
    top: 0,
  });

  public itemsMenu =[
    {
      item:'Productos',
      route:'producto',
      icon:'storage'
    },
    {
      item:'Ventas',
      route:'ventas',
      icon:'payment'
    },
    {
      item:'Pedido de Compra',
      route:'pedidoDeCompra',
      icon:'loyalty'
    },
    {
      item:'Proveedor',
      route:'proveedor',
      icon:'person'
    },
    {
      item:'Sector',
      route:'sector',
      icon: 'bookmarks'
    },
    {
      item:'Categorias',
      route:'categorias',
      icon: 'category'
    },
    {
      item:'Marcas',
      route:'marcas',
      icon: 'BrandingWatermark'
    },

  ]

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router
    ) {}

  clickMenu(item:any) {
    if( item == "Productos") {
      let path = "productos"
      this.router.navigate([path]);
    } else if( item == "Sector") {
      let path = "sector"
      this.router.navigate([path]);
    } else if( item == "Categorias") {
      let path = "categorias"
      this.router.navigate([path])
    } else if (item == "Marcas") {
      let path = "marcas"
      this.router.navigate([path])
    } else if (item == "Ventas") {
      let path = "ventas"
      this.router.navigate([path])
    }
  }

}


