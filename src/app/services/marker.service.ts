import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {Subject} from 'rxjs';
import * as L from 'leaflet';
import {Marker, MarkerOptions} from 'leaflet';
import {MarkerIcon} from '../dto/marker-icon';
import {environment} from '../../environments/environment';
import {MarkerTexte} from '../dto/marker-texte';
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  markers: Array<MarkerTexte | MarkerIcon> = [];

  markersLeaflet: Marker[] = [];

  moovableMarker = ['boat', 'group'];

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
  addMarkerToMap(myMarker: MarkerIcon | MarkerTexte) {
    this.markers.push(myMarker);
    this.saveMarkers();
    this.markerToMap(myMarker);
  }

  /**
   * Transforme les MyMarker en markers pour la map leaflet
   * @param myMarker
   */
  private markerToMap(myMarker: MarkerIcon | MarkerTexte) {
    const marker = L.marker([myMarker.lat, myMarker.lng], this.getMarkerOptions(myMarker));
    if (myMarker['popupText']) {
      marker.bindPopup(myMarker['popupText']);
    }

    if (marker.options.draggable && this.moovableMarker.includes(marker.options.icon.options.className)) {
      this.initMoovableMarker(marker);
    }

    this.markersLeaflet.push(marker);
    // Sub pour annoncer à la map l'ajout d'un nouveau marker
    this.subMarkers.next(marker);
  }

  /**
   * Init ship marker
   * @param marker
   */
  private initMoovableMarker(marker: Marker<any>) {
    marker.on('drag', (e) => {
      const marker2 = e.target;
      const position = marker2.getLatLng();
    });

    marker.on('dragend', (e) => {
      const ma = this.markers.find(m => m['icon'] && m['icon'] === marker.options.icon.options.className);
      ma.lat = e.target.getLatLng().lat;
      ma.lng = e.target.getLatLng().lng;
      this.saveMarkers();
    });
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
  removeMarker(marker: MarkerIcon) {
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
  private getMarkerOptions(myMarker: MarkerIcon | MarkerTexte): MarkerOptions {
    let icon;
    if (myMarker['icon']) {
      icon = L.icon({
        iconUrl: `assets/marker/1x/baseline_${myMarker['icon']}_black_18dp.png`,
        iconSize: [20, 30], // size of the icon
        shadowSize: [10, 30], // size of the shadow
        iconAnchor: [10, 30], // point of the icon which will correspond to marker's location
        popupAnchor: [-10, -30], // point from which the popup should open relative to the iconAnchor
        className: myMarker['icon']
      });
    } else {
      const marker = myMarker as MarkerTexte;
      icon = L.divIcon({
        className: `marker-texte ${marker.classe}`,
        html: marker.texte
      });
    }
    const markerOptions: MarkerOptions = {};
    markerOptions.icon = icon;
    markerOptions.draggable = this.moovableMarker.includes(myMarker['icon']);
    return markerOptions;
  }

  /**
   * Sauvegarde tous les markers dans la base
   */
  private saveMarkers() {
    firebase.database().ref('/markers').set(this.markers);
  }
}
