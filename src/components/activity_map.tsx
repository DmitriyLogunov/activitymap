import React, {useState} from 'react';
import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import L, {LatLng} from 'leaflet';
import polyUtil from 'polyline-encoded';

import {Activity} from "../classes/strava_api";

interface ActivityMapProps {
  activities: Array<Activity>;
}

const ActivityMap = (props: ActivityMapProps) => {
  const [state, setState] = useState({
    lat: -37.8380,
    lng: 145.1440,
    zoom: 13
  })

  const polylines = new Array<Array<LatLng>>(0);


  props.activities.map(activity => {
    const polyline = Array<LatLng>(0);

    const polylineEncoded = activity.map.summary_polyline;
    const latlngs: Array<[number, number]> = polyUtil.decode(polylineEncoded);

    latlngs.map(polyLineNode => {
      const latLng = new LatLng(polyLineNode[0], polyLineNode[1]);
      polyline.push(latLng);
    })

    polylines.push(polyline);
  });

  // TODO: Centroid of selected activities, and have checkbox to uncheck and opt out of auto-centering
  const mapCenter: LatLng = new LatLng(state.lat, state.lng);


  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const rainbow = (numOfSteps: number, step: number) => {
    // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
    // Adam Cole, 2011-Sept-14
    // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
    var r = 0, g = 0, b = 0;
    var h = step / numOfSteps;
    var i = ~~(h * 6);
    var f = h * 6 - i;
    var q = 1 - f;
    switch(i % 6){
      case 0: r = 1; g = f; b = 0; break;
      case 1: r = q; g = 1; b = 0; break;
      case 2: r = 0; g = 1; b = f; break;
      case 3: r = 0; g = q; b = 1; break;
      case 4: r = f; g = 0; b = 1; break;
      case 5: r = 1; g = 0; b = q; break;
    }
    var c = "#" + ("00" + (~ ~(r * 255)).toString(16)).slice(-2) + ("00" + (~ ~(g * 255)).toString(16)).slice(-2) + ("00" + (~ ~(b * 255)).toString(16)).slice(-2);
    return (c);
  }

  return (
    <div className="map">
      <Map center={mapCenter} zoom={state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {polylines.map((polyline, index) =>
          <Polyline color={rainbow(polyline.length, index)} positions={polyline} />
        )}

      </Map>
    </div>
  );
}

export default ActivityMap;