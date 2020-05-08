import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';
import * as L from 'leaflet';
import {Marker, MarkerOptions} from 'leaflet';
import {MyMarker} from '../dto/my-marker';
import {environment} from '../../environments/environment';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  markers: MyMarker[] = [];

  markersLeaflet: Marker[] = [];

  // Sub pour l'ajout de marker sur la carte
  subMarkers: Subject<Marker> = new Subject<Marker>();
  // Etat de la checkbox en mode ajout
  subModeAjout: Subject<boolean> = new Subject<boolean>();
  // sub pour la suppression de markers sur la map
  subRemovedMarker: Subject<Marker> = new Subject<Marker>();


  constructor() {
    // Init de la base
    firebase.initializeApp(environment.firebase);
    // Récupère les markers de la base
    this.getMarkers();
  }

  /**
   * Sauvegarde d'un marker et l'ajoute à la carte
   * @param myMarker
   */
  addMarkerToMap(myMarker: MyMarker) {
    this.markers.push(myMarker);
    this.saveMarkers();
    this.markerToMap(myMarker);
  }

  /**
   * Transforme les MyMarker en markers pour la map leaflet
   * @param myMarker
   */
  private markerToMap(myMarker: MyMarker) {
    const marker = L.marker([myMarker.lat, myMarker.lng], this.getMarkerOptions(myMarker));
    marker.bindPopup(myMarker.popupText);
    this.markersLeaflet.push(marker);
    // Sub pour annoncer à la map l'ajout d'un nouveau marker
    this.subMarkers.next(marker);
  }

  /**
   * Récupère les markers sauvegardés en base
   */
  private getMarkers() {
    firebase.database().ref('/markers')
      .once('value', (data: DataSnapshot) => {
          this.markers = data.val() ? data.val() : [];
          this.markers.forEach(myMarker => this.markerToMap(myMarker));
        }
      );
  }

  /**
   * Supprimer un marker
   * @param marker
   */
  removeMarker(marker: MyMarker) {
    const markerIndex = this.markers.findIndex(
      (myMarker) => {
        if (marker.lat === myMarker.lat && marker.lng === myMarker.lng) {
          return true;
        }
      }
    );
    // Supprimer dans la liste des markers de type MyMarker
    this.markers.splice(markerIndex, 1);
    // Supprimer de la carte
    this.removeLeafLetMarker(markerIndex);
    // Save nouvel état des markers
    this.saveMarkers();
  }

  /**
   * Supprime le marker de la carte leaflet
   * @param markerIndex
   */
  private removeLeafLetMarker(markerIndex: number) {
    this.subRemovedMarker.next(this.markersLeaflet[markerIndex]);
    this.markersLeaflet.splice(markerIndex, 1);
  }

  /**
   * Spécifie les options pour l'icône du marker
   * @param myMarker
   */
  private getMarkerOptions(myMarker: MyMarker): MarkerOptions {
    const icon = L.icon({
      iconUrl: `assets/marker/1x/baseline_${myMarker.icon}_black_18dp.png`,
      iconSize: [20, 30], // size of the icon
      shadowSize: [20, 30], // size of the shadow
      iconAnchor: [20, 30], // point of the icon which will correspond to marker's location
      popupAnchor: [-10, -30] // point from which the popup should open relative to the iconAnchor
    });
    const markerOptions: MarkerOptions = {};
    markerOptions.icon = icon;
    return markerOptions;
  }

  /**
   * Sauvegarde tous les markers dans la base
   */
  private saveMarkers() {
    firebase.database().ref('/markers').set(this.markers);
  }
}
