import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {CRS, Map, MapOptions} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  mapOptions: MapOptions = {};
  private map: Map;

  constructor() {
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
    this.map.on('click', (ev) =>  this.clickEvent(ev));
  }

  private clickEvent(ev: any) {
    const marker = L.marker([ev.latlng.lat, ev.latlng.lng]).addTo(this.map);
    marker.bindPopup('On peut marquer des trucs !');
  }
}
