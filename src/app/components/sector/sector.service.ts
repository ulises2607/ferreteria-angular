import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sector } from './sector';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  private urlEndPoint:string = 'http://127.0.0.1:8000/api/sector'

  constructor(private http:HttpClient) { }

  getSectores():Observable<Sector[]>{
    return this.http.get<Sector[]>(this.urlEndPoint+'/get_sectores');
  }
}
