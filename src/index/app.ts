import "./style.scss";

import Map = require("esri/Map");
import SceneView = require("esri/views/SceneView");
import GeoJSONLayer = require("esri/layers/GeoJSONLayer");
import SceneLayer = require("esri/layers/SceneLayer");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import MeshSymbol3D = require("esri/symbols/MeshSymbol3D");
import FillSymbol3DLayer = require("esri/symbols/FillSymbol3DLayer");
import ObjectSymbol3DLayer = require("esri/symbols/ObjectSymbol3DLayer");
import { IconSymbol3DLayer, PointSymbol3D } from "esri/symbols";
import ColorVariable = require("esri/renderers/visualVariables/ColorVariable");

declare var refreshGeoJSON: HTMLButtonElement;

const map = new Map({
  basemap: "topo-vector",
  ground: "world-elevation"
});

const view = new SceneView({
  container: "viewDiv",
  map,

  // Camera looking at Zurich
  camera: {
    position: {
      longitude: 8.53653003,
      latitude: 47.34295501,
      z: 3458.36136
    },
    heading: 359.97,
    tilt: 48.91
  },
  environment: {
    lighting: {
      directShadowsEnabled: true
    }
  }
});

view.ui.add(refreshGeoJSON, "top-right");

let layer: GeoJSONLayer;

const renderer = new SimpleRenderer({
  symbol: new PointSymbol3D({
    symbolLayers: [
      new IconSymbol3DLayer({
        material: {
          color: "white"
        },
        resource: {
          primitive: "circle"
        }
      })
    ],

    verticalOffset: {
      screenLength: 40,
      maxWorldLength: 200,
      minWorldLength: 35
    },

    callout: {
      type: "line", // autocasts as new LineCallout3D()
      color: "white",
      size: 0.75,
      border: {
        color: [50, 50, 50]
      }
    }
  }),
  visualVariables: [
    new ColorVariable({
      field: "risk",
      stops: [
        {
          value: 0,
          color: "green"
        },
        {
          value: 0.5,
          color: "orange"
        },
        {
          value: 1,
          color: "red"
        }
      ]
    })
  ]
});

refreshGeoJSON.onclick = () => {
  if (layer) {
    map.remove(layer);
  }

  layer = new GeoJSONLayer({
    url: "./results.geojson",
    renderer
  });
  map.add(layer);
};

// 3D Buildings

const buildings = new SceneLayer({
  portalItem: {
    id: "a714a2ca145446b79d97aaa7b895ff95"
  },
  renderer: new SimpleRenderer({
    symbol: new MeshSymbol3D({
      symbolLayers: [
        new FillSymbol3DLayer({
          material: {
            color: "white",
            colorMixMode: "replace"
          }
        })
      ]
    })
  })
});

map.add(buildings);

view.popup.defaultPopupTemplateEnabled = true;