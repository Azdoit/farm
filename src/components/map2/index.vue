<template>
  <div id="business-map"></div>
</template>

<script setup>
import { onMounted, defineProps, watchEffect, watch, ref, reactive } from "vue";
import mapUrls from "@/GIS/mapUrls.js";
import TileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import { Map, View } from "ol";
import { ScaleLine, defaults as defaultControls } from "ol/control";
import GeoJSON from "ol/format/GeoJSON";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource, XYZ } from "ol/source";
import { Fill, Stroke, Style } from "ol/style";
import farm1 from "./geojson/farm1.json";
import farm2 from "./geojson/farm2.json";
import farm3 from "./geojson/farm3.json";
import farm4 from "./geojson/farm4.json";
import farm2_1 from "./geojson/farm2_1.json";
import farm2_2 from "./geojson/farm2_2.json";
import farm2_3 from "./geojson/farm2_3.json";
import farm2_4 from "./geojson/farm2_4.json";
import grid1 from "./geojson/grid1.json";
import grid2 from "./geojson/grid2.json";
let businessMap,
  baseLayers = [],
  vecLayer,
  imgLayer,
  layerLp,
  cropHigh,
  cropLow,
  cropOrigin,
  resultSource1,
  resultLayer1,
  resultSource2,
  resultLayer2,
  resultSource3,
  resultLayer3,
  resultSource4,
  resultLayer4,
  gridSource1,
  gridSource2,
  gridLayer1,
  gridLayer2;
const props = defineProps({
  date: {
    type: Number,
  },
  option: {
    type: Number,
  },
  analysis: {
    type: Boolean,
  },
  options: {
    type: Array,
  },
});
const show1 = ref(true);
const show2 = ref(true);
const show3 = ref(true);
const show4 = ref(true);
const features1 = new GeoJSON().readFeatures(farm1);
const features2 = new GeoJSON().readFeatures(farm2);
const features3 = new GeoJSON().readFeatures(farm3);
const features4 = new GeoJSON().readFeatures(farm4);
const features2_1 = new GeoJSON().readFeatures(farm2_1);
const features2_2 = new GeoJSON().readFeatures(farm2_2);
const features2_3 = new GeoJSON().readFeatures(farm2_3);
const features2_4 = new GeoJSON().readFeatures(farm2_4);
const featuresGrid1 = new GeoJSON().readFeatures(grid1);
const featuresGrid2 = new GeoJSON().readFeatures(grid2);

// 结果图层
resultSource1 = new VectorSource();
resultSource2 = new VectorSource();
resultSource3 = new VectorSource();
resultSource4 = new VectorSource();
// 栅格图层
gridSource1 = new VectorSource();
gridSource2 = new VectorSource();

const resultSources = [
  resultSource1,
  resultSource2,
  resultSource3,
  resultSource4,
];
const features = [
  features1,
  features2_1,
  features2,
  features2_2,
  features3,
  features2_3,
  features4,
  features2_4,
];
const colors = ["#FF0000", "#FFA200", "#FFFF07", "#2CFF5D"];
for (let i = 0; i < 4; i++) {
  resultSources[i].addFeatures(features[2 * i]);
  resultSources[i].addFeatures(features[2 * i + 1]);
}
gridSource1.addFeatures(featuresGrid1);
gridSource2.addFeatures(featuresGrid2);

resultLayer1 = new VectorLayer({
  source: resultSource1,
  style: new Style({
    fill: new Fill({
      color: "#FF0000",
    }),
    stroke: new Stroke({
      color: "#FF0000",
      width: 1,
    }),
  }),
});
resultLayer2 = new VectorLayer({
  source: resultSource2,
  style: new Style({
    fill: new Fill({
      color: "#FFA200",
    }),
    stroke: new Stroke({
      color: "#FFA200",
      width: 1,
    }),
  }),
});
resultLayer3 = new VectorLayer({
  source: resultSource3,
  style: new Style({
    fill: new Fill({
      color: "#FFFF07",
    }),
    stroke: new Stroke({
      color: "#FFFF07",
      width: 1,
    }),
  }),
});
resultLayer4 = new VectorLayer({
  source: resultSource4,
  style: new Style({
    fill: new Fill({
      color: "#2CFF5D",
    }),
    stroke: new Stroke({
      color: "#2CFF5D",
      width: 1,
    }),
  }),
});
gridLayer1 = new VectorLayer({
  source: gridSource1,
  style: new Style({
    fill: new Fill({
      color: "black",
    }),
    stroke: new Stroke({
      color: "black",
      width: 1,
    }),
  }),
});
gridLayer2 = new VectorLayer({
  source: gridSource2,
  style: new Style({
    // fill: new Fill({
    //   color: "black",
    // }),
    stroke: new Stroke({
      color: "black",
      width: 1,
    }),
  }),
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

// 监听评估
watch(
  () => props.analysis,
  (newVal) => {
    if (newVal) {
      for (let i = 0; i < 4; i++) {
        resultSources[i].clear();
      }
      gridSource1.clear();
      gridSource2.clear();
    } else {
      for (let i = 0; i < 4; i++) {
        resultSources[i].addFeatures(features[2 * i]);
        resultSources[i].addFeatures(features[2 * i + 1]);
      }
      gridSource1.addFeatures(featuresGrid1);
      gridSource2.addFeatures(featuresGrid2);
    }
  }
);

// 监听选中的option是否显示
for (let i = 0; i < 4; i++) {
  watch(
    () => props.options[i],
    (newVal) => {
      if (newVal.show) {
        resultSources[i].addFeatures(features[2 * i]);
        resultSources[i].addFeatures(features[2 * i + 1]);
      } else {
        resultSources[i].clear();
      }
    },
    { deep: true }
  );
}
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
  businessMap.addLayer(resultLayer1);
  businessMap.addLayer(resultLayer2);
  businessMap.addLayer(resultLayer3);
  businessMap.addLayer(resultLayer4);
  businessMap.addLayer(gridLayer1);
  businessMap.addLayer(gridLayer2);
});
</script>

<style lang="scss" scoped>
#business-map {
  height: 100%;
  width: 100%;
}
</style>
