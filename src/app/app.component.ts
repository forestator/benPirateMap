import {Component} from '@angular/core';
import {MatCheckboxChange, MatDialog, MatIconRegistry} from '@angular/material';
import {MarkerService} from './services/marker.service';
import {SupressionDialogComponent} from './supression-dialog/supression-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'benMapPirates';

  constructor(private markerService: MarkerService,
              public dialog: MatDialog,
              private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      `island`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/marker/1x/baseline_island_black_18dp.png')
    );
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
