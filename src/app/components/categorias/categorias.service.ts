import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from './categorias';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private urlEndPoint:string = 'http://127.0.0.1:8000/api/categorias'
  constructor(private http:HttpClient) { }

  getCategorias():Observable<Categoria[]> {
    return this.http.get<any[]>(this.urlEndPoint+'/get_categorias')
  }

}
