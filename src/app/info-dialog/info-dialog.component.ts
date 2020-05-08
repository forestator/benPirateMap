import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MarkerService} from '../services/marker.service';
import {MarkerIcon} from '../dto/marker-icon';
import {MarkerTexte} from '../dto/marker-texte';

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.css']
})
export class InfoDialogComponent {
  selectedMarker = 'home';
  popupText: string;
  typeNewMarker: 'text' | 'icon' = 'icon';
  texteSurCarte: string;
  tailleTexte = 'texte-normal';
  couleurTexte = 'couleur-noir';
  fontStyle = 'font-normal';

  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    private markerService: MarkerService,
    @Inject(MAT_DIALOG_DATA) public data: { event: any }) {
  }

  /**
   * Ajoute le nouveau maker
   */
  setNewMarker() {
    if (this.typeNewMarker === 'icon') {
      this.markerService.addMarkerToMap(new MarkerIcon(this.data.event.latlng.lat, this.data.event.latlng.lng,
        this.selectedMarker, this.popupText));
    } else {
      this.markerService.addMarkerToMap(
        new MarkerTexte(this.data.event.latlng.lat, this.data.event.latlng.lng, this.texteSurCarte,
          `${this.tailleTexte} ${this.couleurTexte} ${this.fontStyle}`));
    }
    this.dialogRef.close();
  }

  /**
   * Sélectionne l'icôné
   */
  setSelectedIicon(icon: string) {
    this.selectedMarker = icon;
  }

  /**
   * Raz test dans les inputs
   */
  resetTexte() {
    this.popupText = null;
    this.texteSurCarte = null;
  }
}
