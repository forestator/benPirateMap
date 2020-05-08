import {Component} from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {MarkerService} from '../services/marker.service';
import {MarkerIcon} from '../dto/marker-icon';
import {SelectionModel} from '@angular/cdk/collections';
import {IconesPasMaterial} from '../dto/icones-pas-material.enum';

@Component({
  selector: 'app-supression-dialog',
  templateUrl: './supression-dialog.component.html',
  styleUrls: ['./supression-dialog.component.css']
})
export class SupressionDialogComponent {
  dataSource = new MatTableDataSource<any>(this.markerService.markers);
  displayedColumns: string[] = ['select', 'icon', 'text'];
  selection = new SelectionModel<MarkerIcon>(true, []);
  iconesNonMat = Object.values(IconesPasMaterial);

  constructor(
    public dialogRef: MatDialogRef<SupressionDialogComponent>,
    private markerService: MarkerService) {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * Supprime les éléments sélectionnés
   */
  supprimerSelection() {
    this.selection.selected.forEach(marker => this.markerService.removeMarker(marker));
    this.dialogRef.close();
  }

  /**
   * Si c'est une icone material on l'affiche avec lla balise mat-icon
   * sinon img
   * @param icon
   */
  isIconMat(icon: string): boolean {
    return !this.iconesNonMat.includes(icon);
  }
}
