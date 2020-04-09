import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {CRS, Map, MapOptions} from 'leaflet';
import {MarkerOptions} from 'leaflet';

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
    this.map.on('click', (ev) => this.clickEvent(ev));
  }

  private clickEvent(ev: any) {
    console.log(ev);

    const icon = L.icon({
      iconUrl: 'assets/marker-icon.png',

      iconSize: [20, 30], // size of the icon
      shadowSize: [20, 30], // size of the shadow
      iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
      popupAnchor: [-10, -30] // point from which the popup should open relative to the iconAnchor
    });

    const markerOptions: MarkerOptions = {};
    markerOptions.icon = icon;

    const marker = L.marker([ev.latlng.lat, ev.latlng.lng], markerOptions).addTo(this.map);
    marker.bindPopup('On peut marquer des trucs !');
  }
}
