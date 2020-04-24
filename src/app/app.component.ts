import {Component} from '@angular/core';
import {latLng, MapOptions, tileLayer} from 'leaflet';
import {MatCheckboxChange} from '@angular/material';
import {MarkerService} from './marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'benMapPirates';

  constructor(private markerService: MarkerService) {
  }

  ajoutChange($event: MatCheckboxChange) {
    this.markerService.subModeAjout.next($event.checked);
  }
}
