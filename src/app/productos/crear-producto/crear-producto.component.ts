import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit{

    public url_image:string = '';
    public imagen!: File;
    public listCategoria = [];
    public listSector = [];

    constructor(){

    }

    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.

    }

    selectFile(event:any){
      if(event.target.files){
        var reader =new FileReader();
        const file = event.target.files[0];
        this.imagen = file;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event:any) => {
          this.url_image = event.target.result;
        }
      }
    }
}
