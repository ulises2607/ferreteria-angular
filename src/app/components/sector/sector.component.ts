import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SectorService } from './sector.service';
import { Router } from '@angular/router';
import { Sector } from './sector';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.css']
})
export class SectorComponent {
  ColumnTableSector = ['Id','Descripcion'];
  listaSector :any;

  @ViewChild(MatSort) sort!: MatSort;
  public dataSource = new MatTableDataSource<any>();

  constructor(private serviceSector : SectorService,
    private router: Router ) { }

  ngOnInit(): void {
    this.getSectores();

    this.dataSource.sort = this.sort;
  }

  getSectores(){

    this.serviceSector.getSectores().subscribe((data:any) => {
      if(data){
        this.listaSector = data.data;
        this.dataSource = new MatTableDataSource(this.listaSector);
      }
    }
    ,error => {
      console.error(error);
    })

  }


}
