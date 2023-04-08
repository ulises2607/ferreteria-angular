import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from './producto';
import { Observable , of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private urlEndPoint:string = 'http://localhost:8080/api/producto'

  constructor(private http:HttpClient) { }

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint+'/getProductos');
  }
}
