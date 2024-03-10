
import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Producto } from './producto';
import { ProductoService } from './productos.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  ColumnTableProdcutos = ['Id','Imagen','Categoria','Sector','Codigo','Nombre','Stock' ,'Precio','Fecha alta' , 'Fecha modificacion',
    'Descripcion','Estado','Stock minimo'];
  listaProducto :any;

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
public dataSource = new MatTableDataSource<any>();

// public dataSource= new MatTableDataSource(this.listaProducto);
constructor(private serviceProducto : ProductoService,
            private router: Router ) { }

  ngOnInit(): void {
    this.getCLientes();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    // this.dataSource = new MatTableDataSource(this.listaProducto);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getCLientes(){

    this.serviceProducto.getProductos().subscribe((data:Producto[]) => {
      if(data){
        this.listaProducto = data;
        this.dataSource = new MatTableDataSource(this.listaProducto);
      }
    }
    ,error => {
      console.error(error);
    })

  }

  crearProducto(){
    this.router.navigateByUrl('crearProducto');
  }

}
