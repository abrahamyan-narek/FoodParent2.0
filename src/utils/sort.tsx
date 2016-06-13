import * as $ from 'jquery';

var Settings = require('./../constraints/settings.json');
import * as moment from 'moment';
import {NoteModel} from './../stores/note.store';
import {DonateModel} from './../stores/donate.store';

export function sortNoteByDateDESC(a: NoteModel, b: NoteModel): number {
  if (a.getDate().valueOf() > b.getDate().valueOf()) {
    return -1;
  } else if (a.getDate().valueOf() < b.getDate().valueOf()) {
    return 1;
  } else {
    return 0;
  }
}

export function sortNoteByDateASC(a: NoteModel, b: NoteModel): number {
  if (a.getDate().valueOf() > b.getDate().valueOf()) {
    return 1;
  } else if (a.getDate().valueOf() < b.getDate().valueOf()) {
    return -1;
  } else {
    return 0;
  }
}

export function sortDonateByDateDESC(a: DonateModel, b: DonateModel): number {
  if (a.getDate().valueOf() > b.getDate().valueOf()) {
    return -1;
  } else if (a.getDate().valueOf() < b.getDate().valueOf()) {
    return 1;
  } else {
    return 0;
  }
}

export function sortGoogleLocationByDistanceASC(location: L.LatLng) {
  return function(a, b) {
    let dista = Math.sqrt(Math.pow(a.geometry.location.lat - location.lat, 2) + Math.pow(a.geometry.location.lng - location.lng, 2));
    let distb = Math.sqrt(Math.pow(b.geometry.location.lat - location.lat, 2) + Math.pow(b.geometry.location.lng - location.lng, 2));
    return dista - distb;
  }
}
