import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdjuntoService {

  private urlEndPoint:string = 'http://localhost:8080/api/producto';

  constructor(public httpClient: HttpClient,) { }

  uploadFile(data:any){
    var url = "";
    url = this.urlEndPoint + 'secure/ui/uploadFileSelected';
    let body = 'data=' + encodeURIComponent(data);
    return this.httpClient.post(url,  data,{ responseType: 'text' });
  }
}
