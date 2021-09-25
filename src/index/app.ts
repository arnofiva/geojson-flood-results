import "./style.scss";

import Map = require("esri/Map");
import SceneView = require("esri/views/SceneView");

const map = new Map({
  basemap: "satellite",
  ground: "world-elevation"
});

const view = new SceneView({
  container: "viewDiv",
  map
});