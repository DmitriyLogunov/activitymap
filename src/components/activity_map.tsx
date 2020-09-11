import React, {useState} from 'react';
import {Map, Marker, Polyline, Popup, TileLayer} from 'react-leaflet';
import L, {LatLng} from 'leaflet';
import polyUtil from 'polyline-encoded';
import Activities from "../classes/activities";

interface ActivityMapProps {
  activities: Activities;
}

const ActivityMap = (props: ActivityMapProps) => {
  const [state, setState] = useState({
    lat: -37.8380,
    lng: 145.1440,
    zoom: 13
  })

  const polylines = new Array<Array<LatLng>>(0);


  props.activities.getFiltered().map(activity => {
    const polyline = Array<LatLng>(0);

    const polylineEncoded = activity.summaryActivity.map.summary_polyline;
    const latlngs: Array<[number, number]> = polyUtil.decode(polylineEncoded);

    latlngs.map(polyLineNode => {
      const latLng = new LatLng(polyLineNode[0], polyLineNode[1]);
      polyline.push(latLng);
    })

    polylines.push(polyline);
  });

  // TODO: Centroid of selected activities, and have checkbox to uncheck and opt out of auto-centering
  const mapCenter: LatLng = new LatLng(state.lat, state.lng);


  return (
    <div className="map">
      <Map center={mapCenter} zoom={state.zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
        />

        {polylines.map((polyline, index) =>
          <Polyline color="blue" positions={polyline} />
        )}

      </Map>
    </div>
  );
}

export default ActivityMap;