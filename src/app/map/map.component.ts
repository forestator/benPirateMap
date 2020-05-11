import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {CRS, Map, MapOptions} from 'leaflet';
import {MatDialog} from '@angular/material';
import {InfoDialogComponent} from '../info-dialog/info-dialog.component';
import {MarkerService} from '../services/marker.service';

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
    // Ajoute le marker à la map
    this.markerService.subMarkers.subscribe(marker => {
      marker.addTo(this.map);
    });
    // Supprime le marker de la map
    this.markerService.subRemovedMarker.subscribe(marker => {
      this.map.removeLayer(marker);
    });
    // Passe en mod ajout de marker
    this.markerService.subModeAjout.subscribe(rep => {
      this.modeAjout = rep;
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  /**
   * Initialisation de la carte
   */
  private initMap(): void {
    const bounds: any = [[0, 0], [10348, 7392]];
    this.mapOptions.maxBounds = bounds;
    this.mapOptions.crs = CRS.Simple;
    this.mapOptions.minZoom = -3;
    this.mapOptions.maxZoom = 1;

    this.map = L.map('map', this.mapOptions);

    L.imageOverlay('assets/map/Map2on4Part.jpg', bounds).addTo(this.map);

    this.map.fitBounds(bounds);
    this.map.on('click', (ev) => this.openDialog(ev));
  }

  /**
   * Si en mode ajout on ouvre la dialog pour ajouter un marker
   * @param ev
   */
  openDialog(ev: any): void {
    if (this.modeAjout) {
      this.dialog.open(InfoDialogComponent, {
        width: '30vw',
        data: {event: ev}
      });
    }
  }

}
