export class MarkerTexte {
  lat: number;
  lng: number;
  texte: string;
  classe: string;


  constructor(lat: number, lng: number, texte: string, classe: string) {
    this.lat = lat;
    this.lng = lng;
    this.texte = texte;
    this.classe = classe;
  }
}
