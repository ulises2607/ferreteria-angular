import { Component, OnInit, Input, Output,EventEmitter, ViewChild, Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdjuntoService } from './adjunto.service';
@Component({
  selector: 'app-adjunto',
  templateUrl: './adjunto.component.html',
  styleUrls: ['./adjunto.component.css']
})
export class AdjuntoComponent implements OnInit{

  @Input() habilitadoAlta! : boolean;
  @Input() textoBoton!: string;
  @Input() extensiones!: string;
  @Input() maxSize:any;
  @Input() esBoton = true;
  @Input() mostrarMensajes = true;
  @Input() disabledSelector = false;
  @Input() unicoArchivo = true;
  @Input() selectPrivacidad=false;
  @Input() actuacionEdicion: any;
  // @Output() retorno= new EventEmitter<SelectorArchivo[]>();

  @ViewChild('myInput', {static: true}) input!: ElementRef;



  public errorMessage !:any;
  public formData!: FormData;
  displayedColumns = [ 'eliminar', 'titulo'];
  public dataSource!: MatTableDataSource<any> | null;
  // public archivos:SelectorArchivo[]= [];
  public archivo:any;
  public adjEdicion: any;
  public actualSize =0;

  constructor(private adjuntoService: AdjuntoService,
    public dialog: MatDialog,
    // @Inject(DOCUMENT) public document,
    // private blockService: BlockService
    ) { }

  ngOnInit() {

    if(this.selectPrivacidad) {
      this.displayedColumns = [ 'eliminar', 'titulo', 'privacidad'];
    }
  }

  ngOnChanges(){
    // this.archivos = [];
    let suma=0;
    this.adjEdicion = this.actuacionEdicion;
    if(this.adjEdicion !=null && this.adjEdicion != ""){
      for(let adjunto of this.adjEdicion){
      //   const ret:SelectorArchivo = {
      //     file:null,
      //     filename:adjunto.aac.aacNombre,
      //     nombreArchivo : adjunto.aac.aacNombre,
      //     privacidad : adjunto.aac.nac.nacCod,
      //     idAac : adjunto.aac.aacId,
      //     size : adjunto.size
      // };
        suma=suma+adjunto.size;
        // this.archivos.push(ret);
      }
      // this.dataSource = new MatTableDataSource<any>(this.archivos);
      // this.retorno.emit(this.archivos);
      // this.actualSize=suma;
    }



    if(this.disabledSelector){
      this.errorMessage = "Ha alcanzado la cantidad máxima de archivos";
    }
  }

  async upFile(formData:any, fileSelected:any, nombreArchivo:any){
    this.adjuntoService.uploadFile(formData).subscribe((data: any)=>{
      // const ret:SelectorArchivo = {
      //     file:fileSelected,
      //     filename:data,
      //     nombreArchivo : nombreArchivo,
      //     privacidad : 'PUBLIC',
      //     idAac : null,
      //     size : null
      // };
      if (this.unicoArchivo){
        // this.archivos = [];
      }
      // this.archivos.push(ret);
      // this.dataSource = new MatTableDataSource<any>(this.archivos);

    }, error => {
      if(error.message.includes("0 Unknown Error"))
        this.errorMessage = "El archivo no puede ser procesado.";
      else
        this.errorMessage = "Error al cargar archivo.";

      // this.blockService.unblock();
      this.procesarError();
    });
  }

  public handleFileInput2(e:any) {
    var actualSizeOrig = this.actualSize;
    this.errorMessage = null;
    for (var i=0 ; i < e.target.files.length ; i++){
      var element =  e.target.files[i];
      if (!this.verificarExtension(element.type)){
        this.errorMessage = "El tamaño del archivo no puede superar los " + (this.maxSize / 1048576).toFixed(2) + " MB y deberá ser del tipo " + (this.extensiones.split(".")[1]).toUpperCase();
      }else if (!this.verificarSize(element.size)){
        this.errorMessage = "El archivo supera el tamaño de " + (this.maxSize / 1048576).toFixed(2) + " MB";
      }else if(!this.verificarSizeTotal(element.size)){
        this.errorMessage = "La presentación total no puede superar los " + (this.maxSize / 1048576).toFixed(2) + " MB";
      }
      else
       this.actualSize=this.actualSize + e.target.files[i].size;
    }

    if (this.errorMessage == null){
      // this.blockService.block();
      for (var i=0 ; i < e.target.files.length ; i++){
        var element =  e.target.files[i];
        this.formData = new FormData();
        this.formData.append('file', element);
        this.upFile(this.formData, element, element.name);
      }

      // this.blockService.unblock();
      // this.retorno.emit(this.archivos);
    }
    else
      this.actualSize = actualSizeOrig;

  }

  /*
  public handleFileInput(e) {
    console.log(e.target.files)
    let MaxSizeActual=this.maxSize-this.actualSize;
    this.blockService.block();
    this.errorMessage = null;

    console.log(e.target.files.length);

    for (var i=0 ; i < e.target.files.length ; i++){

      this.formData = new FormData();
      this.formData.append('file', e.target.files[i]);
       if (!this.verificarExtension(e.target.files[i].type)){
        this.errorMessage = "El tamaño del archivo no puede superar los " + (this.maxSize / 1048576).toFixed(2) + " MB y deberá ser del tipo " + (this.extensiones.split(".")[1]).toUpperCase();
      }else if (!this.verificarSize(e.target.files[i].size)){
        this.errorMessage = "El archivo supera el tamaño de " + (this.maxSize / 1048576).toFixed(2) + " MB";
      }else if(!this.verificarSizeTotal(e.target.files[i].size)){
        this.errorMessage = "La presentación total no puede superar los " + (this.maxSize / 1048576).toFixed(2) + " MB";
      }else{
        this.selectorArchivoService.uploadFile(this.formData).subscribe((data: any)=>{
          const ret:SelectorArchivo = {
              file:e.target.files[i],
              filename:data,
              nombreArchivo : e.target.files[i].name,
              privacidad : 'PUBLIC',
              idAac : null,
              size : null
          };
          if (this.unicoArchivo){
            this.archivos = [];
          }
        //  this.actualSize=this.actualSize + e.target.files[i].size;
          this.archivos.push(ret);
          this.dataSource = new MatTableDataSource<any>(this.archivos);
          this.retorno.emit(this.archivos);
          this.blockService.unblock();
        }, error => {
          if(error.message.includes("0 Unknown Error"))
            this.errorMessage = "El archivo no puede ser procesado.";
          else
            this.errorMessage = "Error al cargar archivo.";

          this.blockService.unblock();
          this.procesarError();
        });
      }
      if(this.errorMessage != null){
        this.blockService.unblock();
        this.procesarError();
      }
    }



  }
  */

  procesarError(){
    // if (!this.mostrarMensajes)
    //   this.mostrarPopUpError();
    // else
    //  this.retorno.emit(null);
  }

  verificarSize(size:any):boolean{
    if (this.maxSize == null || size <= this.maxSize){
      return true;
    }
    return false;
  }

  verificarSizeTotal(size:any):boolean{

    let suma=this.actualSize + size;
    if(this.maxSize == null || suma < this.maxSize )
      return true;
    else
      return false;

  }

  verificarExtension(file:string):boolean{
    if (this.extensiones == ".*")
      return true;
    if (file== null || file =="")
      return false;
    var parse= file.split('/');
    if (parse.length < 2)
      return false;
      else{
        var ext = parse[1];
        if ( this.extensiones.indexOf(ext) == -1 )
          return false;
      }
      return true;
  }

  mostrarPopUpError(){
    // if (this.errorMessage){
    //   this.blockService.unblock();
    //   const dialogRef = this.dialog.open(ModalAccion, {
    //     disableClose: true,
    //     width: '500px',
    //     data: {
    //       componente : DialogoErrorSelectorArchivoComponent,
    //       titulo: 'Carga de archivo',
    //       data: {descripcion: this.errorMessage}
    //     }
    //   });

    //   dialogRef.afterClosed().subscribe(result => {
    //       return this.retorno.emit(result);
    //   });
    // }
  }

  public selectFile():void{
      //  this.document.getElementById('sa-fileInput').click();
  }

  public eliminar(archivo:any){
    //console.log(archivo)
    //this.actualSize=this.actualSize - archivo.file.size;
   // this.actualSize=this.actualSize - archivo.size;

    // this.blockService.block();
    // var removeIndex = this.archivos.map(function(item) { return item.nombreArchivo; }).indexOf(archivo.nombreArchivo);
    // this.archivos.splice(removeIndex, 1);
    // this.errorMessage = null;
    // if (this.archivos && this.archivos.length > 0){
    //   this.dataSource = new MatTableDataSource<any>(this.archivos);
    // }else{
    //   this.dataSource = null;
    // }
    // this.retorno.emit(this.archivos);
    // if(archivo.idAac != null)
    //   this.actualSize=this.actualSize - archivo.size;
    // else
    //  this.actualSize=this.actualSize - archivo.file.size;
    // this.blockService.unblock();
  }



  limpiar(){
    // this.archivos = [];
    this.dataSource = null;
    this.errorMessage = null;
  }

}
