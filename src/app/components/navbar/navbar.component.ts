import { Component } from '@angular/core';
import {FormBuilder} from '@angular/forms';

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
    { item:'Proveedor',
      icon:'person'
    }
  ]

  constructor(private _formBuilder: FormBuilder) {}


}
