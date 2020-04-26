import {Component} from '@angular/core';
import {MatCheckboxChange, MatDialog} from '@angular/material';
import {MarkerService} from './services/marker.service';
import {SupressionDialogComponent} from './supression-dialog/supression-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'benMapPirates';

  constructor(private markerService: MarkerService, public dialog: MatDialog) {
  }

  /**
   * Annonce le changement d'état pour la checkbox
   * @param $event
   */
  ajoutChange($event: MatCheckboxChange) {
    this.markerService.subModeAjout.next($event.checked);
  }

  /**
   * Ouvre la dialog pour supprimer les markers
   */
  supprimerMarkers() {
    this.dialog.open(SupressionDialogComponent, {
      width: '40vw'
    });
  }
}
