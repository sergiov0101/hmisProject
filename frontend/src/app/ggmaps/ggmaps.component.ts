import { Component, OnInit } from '@angular/core';
import {DetailTableService, Bike} from '../detail-table/detail-table.service';

@Component({
  selector: 'app-ggmaps',
  templateUrl: './ggmaps.component.html',
  styleUrls: ['./ggmaps.component.css']
})
export class GgmapsComponent implements OnInit {

  public bikes;
  constructor(private bikeService: DetailTableService) { 
    bikeService.getBikes().subscribe(data => {
      this.bikes = data;
    });
  }


  ngOnInit() { }

  // TODO: INTENTAR IMPLEMENTAR EL MAPA
  // TODO: RECOGER DATOS DE RUTA
  // TODO: PINTAR DATOS EN MAPA

}

