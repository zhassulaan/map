<template>
  <div id="map-container">
    <GoogleMap
      api-key="AIzaSyAOVYRIgupAurZup5y1PRh8Ismb1A3lLao"
      :center="center"
      :zoom="12"
      style="width: 100%; height: 500px"
    >
      <Marker :options="{ position: center }" />
      <Polygon
        v-for="(polygon, index) in polygons"
        :key="index"
        :options="polygon"
      />
    </GoogleMap>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { GoogleMap, Marker, Polygon } from 'vue3-google-map'
import axios from 'axios';

const center = ref({ lat: 36.1699, lng: -115.1398 });
const polygons = ref([]);
const polygonOptions = {
  strokeColor: '#4285F4',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#4285F4',
  fillOpacity: 0.4
};

async function fetchData() {
  const response = await axios.get('/src/points.json');
  const data = response.data;
  polygons.value = data.map(entry => ({
    ...polygonOptions,
    paths: getPolygonCoordinates(entry.boundaries.coordinates[0][0]),
  }));
};
function getPolygonCoordinates(coordinates) {
  return coordinates.map(polygon => ({
    lat: polygon[1],
    lng: polygon[0]
  }));
};

onMounted(() => {
  fetchData();
});
</script>
