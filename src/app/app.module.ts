import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {MapComponent} from './map/map.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularFireModule, FirebaseApp} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {InfoDialogComponent} from './info-dialog/info-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {MarkerService} from './marker.service';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    LeafletModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, MatIconModule, DragDropModule, MatCheckboxModule,
  ],
  providers: [
    MarkerService
  ],
  bootstrap: [AppComponent],
  entryComponents: [InfoDialogComponent]
})
export class AppModule {
}
