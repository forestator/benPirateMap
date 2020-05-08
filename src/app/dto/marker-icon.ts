export class MarkerIcon {
  lat: number;
  lng: number;
  icon: string;
  popupText: string;


  constructor(lat: number, lng: number, icon: string, popupText: string) {
    this.lat = lat;
    this.lng = lng;
    this.icon = icon;
    this.popupText = popupText;
  }
}
