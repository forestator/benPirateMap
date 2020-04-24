import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CRS, Layer, Map, MapOptions} from 'leaflet';
import {MarkerOptions} from 'leaflet';
import {MatDialog} from '@angular/material';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {MarkerService} from '../marker.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  mapOptions: MapOptions = {};
  private map: Map;
  modeAjout = false;

  constructor(public dialog: MatDialog, private markerService: MarkerService) {
  }

  ngOnInit(): void {
    this.markerService.subMarkers.subscribe(marker => {
      marker.addTo(this.map);
    });
    this.markerService.subModeAjout.subscribe(rep => {
      this.modeAjout = rep;
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const bounds: any = [[0, 0], [700, 980]];
    this.mapOptions.maxBounds = bounds;
    this.mapOptions.crs = CRS.Simple;

    this.map = L.map('map', this.mapOptions);

    L.imageOverlay('assets/map/carteNO.jpg', bounds).addTo(this.map);

    this.map.fitBounds(bounds);
    this.map.on('click', (ev) => this.openDialog(ev));
  }

  openDialog(ev: any): void {
    if (this.modeAjout) {
      this.dialog.open(InfoDialogComponent, {
        width: '20vw',
        data: {event: ev}
      });
    }
  }

}
