let alt = require('../alt');

let MapSetting = require('./../../setting/map.json');


class MapActions {
  addMap(id, map, type) {
    return (dispatch) => {
      // we dispatch an event here so we can have "loading" state.
      dispatch({id, map, type});
    }
  }
  setTile(id, tile) {
    return {id, tile};
  }
  setZoom(id, zoom) {
    return {id, zoom};
  }
  setLoaded(id, loaded) {
    return {id, loaded};
  }
  setMapType(type) {
    return {type};
  }
  moveToUserLocation(id) {
    return (dispatch) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let location = new L.LatLng(position.coords.latitude, position.coords.longitude);
          this.moveToLocationWithMarker(id, location, MapSetting.iFocusZoom);
        }.bind(this), function(error) {
          if (error.code == error.PERMISSION_DENIED) {
            // displayErrorMessage(localization(332));
            if (__DEV__) {
              console.error(`Failed to detect the user location. Permission is denied.`);
            }
          }
        });
      }
    }
  }
  moveToLocation(id, location, zoom) {
    return {id, location, zoom};
  }
  moveToLocationWithMarker(id, location, zoom) {
    return {id, location, zoom};
  }
}

module.exports = alt.createActions(MapActions);
