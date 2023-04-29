import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


  ColumnTableProdcutos = ['Id','Imagen','Categoria','Sector','Codigo','Nombre','Stock' ,'Precio','Fecha alta' , 'Fecha modificacion',
    'Descripcion','Estado','Stock minimo'];
  listaProducto :any;
//     "id_producto": 1,
//     "id_categoria": 1,
//     "id_sector":1,
//     "codigo_producto": 1,
//     "nombre_producto": 'TORNILLO',
//     "stock_producto": 30,
//     "precio_producto": 5 ,
//     "fecha_alta_producto": '04/04/2023' ,
//     "fecha_modificacion_producto": '' ,
//     "desc_producto": 'Tornillo',
//     "imagen_producto": '',
//     "descuento_producto": 0,
//     "estado_producto": 1,
//     "stock_minimo_producto": 10
//   },
//   {
//     "id_producto": 2,
//     "id_categoria": 1,
//     "id_sector":1,
//     "codigo_producto": 1,
//     "nombre_producto": 'CLAVO',
//     "stock_producto": 30,
//     "precio_producto": 5 ,
//     "fecha_alta_producto": '04/04/2023' ,
//     "fecha_modificacion_producto": '' ,
//     "desc_producto": 'Clavo',
//     "imagen_producto": '',
//     "descuento_producto": 0,
//     "estado_producto": 1,
//     "stock_minimo_producto": 10
//   },
//   {
//     "id_producto": 3,
//     "id_categoria": 2,
//     "id_sector":1,
//     "codigo_producto": 1,
//     "nombre_producto": 'MARTILLO',
//     "stock_producto": 30,
//     "precio_producto": 5 ,
//     "fecha_alta_producto": '04/05/2023' ,
//     "fecha_modificacion_producto": '' ,
//     "desc_producto": 'MARTILLO',
//     "imagen_producto": '',
//     "descuento_producto": 0,
//     "estado_producto": 1,
//     "stock_minimo_producto": 10
//   },
//   {
//     "id_producto": 4,
//     "id_categoria": 2,
//     "id_sector":1,
//     "codigo_producto": 1,
//     "nombre_producto": 'LLAVE FRANCESA',
//     "stock_producto": 30,
//     "precio_producto": 5 ,
//     "fecha_alta_producto": '04/05/2023' ,
//     "fecha_modificacion_producto": '' ,
//     "desc_producto": 'MARTLLAVE FRANCESAILLO',
//     "imagen_producto": '',
//     "descuento_producto": 0,
//     "estado_producto": 1,
//     "stock_minimo_producto": 5
//   },
//   {
//     "id_producto": 5,
//     "id_categoria": 3,
//     "id_sector":1,
//     "codigo_producto": 1,
//     "nombre_producto": 'ALICATE',
//     "stock_producto": 30,
//     "precio_producto": 5 ,
//     "fecha_alta_producto": '02/05/2023' ,
//     "fecha_modificacion_producto": '' ,
//     "desc_producto": 'ALICATE',
//     "imagen_producto": '',
//     "descuento_producto": 0,
//     "estado_producto": 1,
//     "stock_minimo_producto": 5
//   },
//   {
//     "id_producto": 6,
//     "id_categoria": 3,
//     "id_sector":1,
//     "codigo_producto": 1,
//     "nombre_producto": 'BUsCAPOLO',
//     "stock_producto": 30,
//     "precio_producto": 5 ,
//     "fecha_alta_producto": '02/05/2023' ,
//     "fecha_modificacion_producto": '' ,
//     "desc_producto": 'BUsCAPOLO',
//     "imagen_producto": '',
//     "descuento_producto": 0,
//     "estado_producto": 1,
//     "stock_minimo_producto": 5
//   },

// ];

@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
public dataSource = new MatTableDataSource<any>();

// public dataSource= new MatTableDataSource(this.listaProducto);
constructor(private serviceProducto : ProductoService ) { }

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

  }

}
