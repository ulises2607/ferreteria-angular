import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoriasService } from './categorias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent {
  ColumnTableCategorias = ['Id', 'Descripcion', 'Id Estado Categoria', 'Descripcion Estado Categoria']
  listaCategoria :any;

  @ViewChild(MatSort) sort!: MatSort;
  public dataSource = new MatTableDataSource<any>();

  constructor(
    private serviceCategorias : CategoriasService,
    private router: Router
    ){ }

  ngOnInit(): void {
    this.getCategorias();

    this.dataSource.sort = this.sort;
  }

  getCategorias(){
    this.serviceCategorias.getCategorias().subscribe((data:any) => {
      if(data){
        this.listaCategoria = data.data;
        this.dataSource = new MatTableDataSource(this.listaCategoria);
      }
    }
    ,error => {
      console.error(error);
      
    })
  }
  
}
