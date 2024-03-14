import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marcas } from './marcas';

@Injectable({
  providedIn: 'root'
})
export class MarcasService {
  private urlEndPoint:string = 'http://localhost:8000/api/marcas'

  constructor(private http:HttpClient) { }

  getMarcas():Observable<Marcas[]>{
    return this.http.get<any[]>(this.urlEndPoint+'/get_marcas');
  }

}
