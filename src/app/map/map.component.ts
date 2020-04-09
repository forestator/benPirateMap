import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import {MarkerService} from '../services/marker.service';
import {PopupService} from '../services/popup.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map: any;

  constructor(private markerService: MarkerService) {
  }

  ngAfterViewInit(): void {
    this.initMap();
    // this.markerService.makeCapitalMarkers(this.map);
    // this.markerService.makeCapitalCircleMarkers(this.map);
  }

  private initMap(): void {
    const map = L.map('map', {
      crs: L.CRS.Simple
    });

    const bounds = [[0, 0], [1000, 1000]];
    const image = L.imageOverlay('assets/map/carteNO.jpg', [[0, 0], [1000, 1000]]).addTo(map);

    map.fitBounds([[0, 0], [1000, 1000]]);
  }
}
