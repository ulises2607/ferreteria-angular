import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MarcasService } from './marcas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent {
  ColumnTableMarcas = ['Id','Descripcion'];
  listaMarcas :any;

  @ViewChild(MatSort) sort!: MatSort;
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private serviceMarcas : MarcasService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getMarcas();

    this.dataSource.sort = this.sort;
  }

  getMarcas(){

    this.serviceMarcas.getMarcas().subscribe((data:any) => {
      if(data){
        this.listaMarcas = data.data;
        this.dataSource = new MatTableDataSource(this.listaMarcas);
      }
    }
    ,error => {
      console.error(error);
    })

  }

}
