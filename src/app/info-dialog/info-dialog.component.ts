import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatIconRegistry} from '@angular/material';
import {MarkerService} from '../marker.service';
import {Marker, MarkerOptions} from 'leaflet';
import * as L from 'leaflet';
import {mark} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent {
  selectedMarker = 'home';
  popupText: string;

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    private markerService: MarkerService,
    @Inject(MAT_DIALOG_DATA) public data: { event: any }) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setNewMarker() {
    const icon = L.icon({
      iconUrl: `assets/marker/1x/baseline_${this.selectedMarker}_black_18dp.png`,
      iconSize: [20, 30], // size of the icon
      shadowSize: [20, 30], // size of the shadow
      iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
      popupAnchor: [-10, -30] // point from which the popup should open relative to the iconAnchor
    });

    const markerOptions: MarkerOptions = {};
    markerOptions.icon = icon;


    const marker = L.marker([this.data.event.latlng.lat, this.data.event.latlng.lng], markerOptions);
    marker.bindPopup(this.popupText);
    this.markerService.subMarkers.next(marker);

    this.dialogRef.close();
  }

  setSelectedIicon(icon: string) {
    this.selectedMarker = icon;
  }
}
