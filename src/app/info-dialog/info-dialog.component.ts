import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MarkerService} from '../services/marker.service';
import {MyMarker} from '../dto/my-marker';

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

  /**
   * Ajoute le nouveau maker
   */
  setNewMarker() {
    this.markerService.addMarkerToMap(new MyMarker(this.data.event.latlng.lat, this.data.event.latlng.lng,
      this.selectedMarker, this.popupText));
    this.dialogRef.close();
  }

  /**
   * Sélectionne l'icôné
   */
  setSelectedIicon(icon: string) {
    this.selectedMarker = icon;
  }
}
