import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatTableDataSource} from '@angular/material';
import {MarkerService} from '../services/marker.service';
import {MyMarker} from '../dto/my-marker';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-supression-dialog',
  templateUrl: './supression-dialog.component.html',
  styleUrls: ['./supression-dialog.component.css']
})
export class SupressionDialogComponent {
  dataSource = new MatTableDataSource<any>(this.markerService.markers);
  displayedColumns: string[] = ['select', 'icon', 'text'];
  selection = new SelectionModel<MyMarker>(true, []);

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
}
