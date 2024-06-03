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
      :options="{ ...polygonOptions, paths: polygon.paths }"
    />
  </GoogleMap>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { GoogleMap, Marker, Polygon } from 'vue3-google-map';
import axios from 'axios';

interface Coordinate {
  lat: number;
  lng: number;
}

const center = ref<Coordinate>({ lat: 36.1699, lng: -115.1398 });
const store = useStore();
const polygons = computed(() => store.getters.filteredPolygons);
const polygonOptions = {
  strokeColor: '#4285F4',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#4285F4',
  fillOpacity: 0.4
};

onMounted(() => {
  store.dispatch('fetchPolygons');
});
</script>
