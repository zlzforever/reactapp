import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { get as getProjection } from "ol/proj";

export default function registerProj() {
  const projections = [
    {
      code: 4490,
      name: "China Geodetic Coordinate System 2000",
      def: "+proj=longlat +ellps=GRS80 +no_defs",
      bbox: [53.56, 73.62, 16.7, 134.77],
    },
    {
      code: 4508,
      name: "CGCS2000 / Gauss-Kruger CM 111E",
      def: "+proj=tmerc +lat_0=0 +lon_0=111 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
      bbox: [45.11, 108.0, 16.7, 114.0],
    },
    {
      code: 4548,
      name: "CGCS2000 / 3-degree Gauss-Kruger CM 117E",
      def: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
      bbox: [49.88, 115.5, 22.6, 118.5],
    },
    {
      code: 4549,
      name: "CGCS2000 / 3-degree Gauss-Kruger CM 120E",
      def: "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
      bbox: [53.33, 118.5, 24.43, 121.5],
    },
    {
      code: 4550,
      name: "CGCS2000 / 3-degree Gauss-Kruger CM 123E",
      def: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
      bbox: [53.56, 121.5, 28.22, 124.5],
    },

    {
      code: 4527,
      name: "CGCS2000 / 3-degree Gauss-Kruger zone 39",
      def: "+proj=tmerc +lat_0=0 +lon_0=117 +k=1 +x_0=39500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
      bbox: [49.88, 115.5, 22.6, 118.5],
    },
    {
      code: 4528,
      name: "CGCS2000 / 3-degree Gauss-Kruger zone 40",
      def: "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=40500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
      bbox: [53.33, 18.5, 24.43, 121.5],
    },
    {
      code: 4529,
      name: "CGCS2000 / 3-degree Gauss-Kruger zone 41",
      def: "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=41500000 +y_0=0 +ellps=GRS80 +units=m +no_defs",
      bbox: [53.56, 121.5, 28.22, 124.5],
    },
  ];
  projections.forEach((x) => {
    setProjection(x.code, x.name, x.def, x.bbox);
  });
}

function setProjection(code: any, name: any, proj4def: any, bbox: any) {
  if (code === null || name === null || proj4def === null || bbox === null) {
    return;
  }

  var newProjCode = "EPSG:" + code;
  proj4.defs(newProjCode, proj4def);
  register(proj4);

  var newProj = getProjection(newProjCode);

  var worldExtent = [bbox[1], bbox[2], bbox[3], bbox[0]];
  newProj.setWorldExtent(worldExtent);
  // approximate calculation of projection extent,
  // checking if the world extent crosses the dateline
  if (bbox[1] > bbox[3]) {
    worldExtent = [bbox[1], bbox[2], bbox[3] + 360, bbox[0]];
  }

  // var extent = applyTransform(worldExtent, fromLonLat, undefined, 8);

  newProj.setExtent(worldExtent);
}
