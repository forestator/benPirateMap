import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapComponent} from './map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatTableModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MarkerService} from './services/marker.service';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {SupressionDialogComponent} from './supression-dialog/supression-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InfoDialogComponent,
    SupressionDialogComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    DragDropModule,
    MatCheckboxModule,
    MatButtonToggleModule,
    MatTableModule,
    MatRadioModule
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [InfoDialogComponent, SupressionDialogComponent]
})
export class AppModule {
}
