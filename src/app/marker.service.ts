import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';
import {Marker} from 'leaflet';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  subMarkers: Subject<Marker> = new Subject<Marker>();
  subModeAjout: Subject<boolean> = new Subject<boolean>();

  constructor() {
    console.log('init');
  }

  saveMarkers() {
    // firebase.database().ref('/markers').set(this.posts);
  }
}
