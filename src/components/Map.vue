<template>
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { GoogleMap, Marker, Polygon } from 'vue3-google-map';
import axios from 'axios';

interface Coordinate {
  lat: number;
  lng: number;
}
interface Boundary {
  type: string;
  coordinates: number[][][][];
}
interface PolygonData {
  id: number;
  n_of_donuts: number;
  attend_a_zoo: boolean;
  can_cook_pizza: boolean;
  n_of_coffee: number;
  spent_in_amazon: number;
  boundaries: Boundary;
}
interface PolygonOptions {
  strokeColor: string;
  strokeOpacity: number;
  strokeWeight: number;
  fillColor: string;
  fillOpacity: number;
  paths: Coordinate[];
}

const center = ref<Coordinate>({ lat: 36.1699, lng: -115.1398 });
const polygons = ref<PolygonOptions[]>([]);
const polygonOptions = {
  strokeColor: '#4285F4',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#4285F4',
  fillOpacity: 0.4
};

async function fetchData() {
  const response = await axios.get<PolygonData[]>('/src/points.json');
  const data = response.data;
  polygons.value = data.map(entry => ({
    ...polygonOptions,
    paths: getPolygonCoordinates(entry.boundaries.coordinates[0][0]),
  }));
};

function getPolygonCoordinates(coordinates: number[][]): Coordinate[] {
  return coordinates.map(([lng, lat]) => ({
    lat,
    lng
  }));
};

onMounted(() => {
  fetchData();
});
</script>
