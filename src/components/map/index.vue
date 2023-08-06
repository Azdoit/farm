<template>
  <div id="business-map"></div>
</template>

<script setup>
import { onMounted, defineProps, watchEffect, watch, ref } from "vue";
import mapUrls from "@/GIS/mapUrls.js";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { Map, View } from "ol";
import { ScaleLine, defaults as defaultControls } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, XYZ } from "ol/source";
import { Fill, Stroke, Style } from "ol/style";

let businessMap,
  baseLayers = [],
  vecLayer,
  imgLayer,
  layerLp,
  cropHigh,
  cropLow,
  cropOrigin,
  resultSource,
  resultLayer;

const props = defineProps({
  date: {
    type: Number,
  },
});




// 创建矢量底图和影像底图
const createdBaseLayer = () => {
  vecLayer = new TileLayer({
    source: new XYZ({
      url: mapUrls["tian-vec"],
    }),
    title: "矢量底图",
  });
  // 默认关闭矢量底图
  vecLayer.setVisible(false);
  baseLayers.push(vecLayer);

  imgLayer = new TileLayer({
    source: new XYZ({
      url: mapUrls["tian-img"],
    }),
    title: "影像底图",
  });
  baseLayers.push(imgLayer);
};

createdBaseLayer();

// 创建临平遥感影像地图
const createdLPLayer = () => {
  layerLp = new TileLayer({
    source: new TileWMS({
      url: "http://8.136.203.16:8090/geoserver/wms/",
      params: {
        VERSION: "1.1.0",
        REQUEST: "GetMap",
        layers: "LYN:LPQ3857", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
      },
      zIndex: 1000,
      crossOrigin: "anonymous",
      serverType: "geoserver",
    }),
  });
  businessMap.addLayer(layerLp);
};

const createdLCropOriginLayer = () => {
  cropOrigin = new TileLayer({
    source: new TileWMS({
      url: "http://8.136.203.16:8090/geoserver/wms/",
      params: {
        VERSION: "1.1.0",
        REQUEST: "GetMap",
        layers: "LYN:crop_origin", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
      },
      zIndex: 1001,
      crossOrigin: "anonymous",
      serverType: "geoserver",
    }),
  });
  businessMap.addLayer(cropOrigin);
};

const createdLCropHighLayer = () => {
  cropHigh = new TileLayer({
    source: new TileWMS({
      url: "http://8.136.203.16:8090/geoserver/wms/",
      params: {
        VERSION: "1.1.0",
        REQUEST: "GetMap",
        layers: "LYN:crop_high", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
      },
      zIndex: 1001,
      crossOrigin: "anonymous",
      serverType: "geoserver",
    }),
  });
  businessMap.addLayer(cropHigh);
};

const createdLCropLowLayer = () => {
  cropLow = new TileLayer({
    source: new TileWMS({
      url: "http://8.136.203.16:8090/geoserver/wms/",
      params: {
        VERSION: "1.1.0",
        REQUEST: "GetMap",
        layers: "LYN:crop_low", // LYN:linping_16db,(地名标记)  LYN:LPQ3857,LYN:lp_water,LYN:osm_lp,LYN:lp_vegetatin,LYN:BJK
      },
      zIndex: 1001,
      crossOrigin: "anonymous",
      serverType: "geoserver",
    }),
  });
  businessMap.addLayer(cropLow);
};

watch(
  () => props.date,
  (newVal) => {
    if (newVal === 0) {
      cropOrigin.setVisible(true);
      cropHigh.setVisible(false);
      cropLow.setVisible(false);
    } else if (newVal === 1) {
      cropLow.setVisible(true);
      cropHigh.setVisible(false);
      cropOrigin.setVisible(false);
    } else {
      cropLow.setVisible(false);
      cropHigh.setVisible(true);
      cropOrigin.setVisible(false);
    }
  }
);

onMounted(() => {
  // 加载天地图底图
  businessMap = new Map({
    target: "business-map",
    layers: baseLayers,
    view: new View({
      projection: "EPSG:4326",
      center: [120.2275, 30.497],
      zoom: 17.5,
      maxZoom: 20,
      minZoom: 5,
    }),
    controls: defaultControls({
      zoom: false,
      rotate: false,
      attribution: false,
    }),
  });
  createdLPLayer();
  createdLCropHighLayer();
  createdLCropLowLayer();
  createdLCropOriginLayer();
});
</script>

<style lang="scss" scoped>
#business-map {
  height: 100%;
  width: 100%;
}
</style>
