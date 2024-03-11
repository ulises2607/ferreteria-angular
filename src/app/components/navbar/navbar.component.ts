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
       icon:'storage'
    },
    {
      item:'Ventas',
      icon:'payment'
    },
    {
      item:'Pedido de Compra',
      icon:'loyalty'
    },
    { 
      item:'Proveedor',
      icon:'person'
    },
    { 
      item:'Sector',
      icon: 'bookmarks'
    }
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
    }
  }

}


