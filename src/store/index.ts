import { createStore } from 'vuex';
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
  paths: Coordinate[];
}

export default createStore({
  state: {
    polygons: [] as PolygonData[],
  },
  mutations: {
    setPolygons(state, polygons: PolygonData[]) {
      state.polygons = polygons;
    }
  },
  actions: {
    async fetchPolygons({ commit }) {
      const response = await axios.get<PolygonData[]>('/src/assets/points.json');
      const data = response.data;
      const polygons = data.map(entry => ({
        id: entry.id,
        n_of_donuts: entry.n_of_donuts,
        attend_a_zoo: entry.attend_a_zoo,
        can_cook_pizza: entry.can_cook_pizza,
        n_of_coffee: entry.n_of_coffee,
        spent_in_amazon: entry.spent_in_amazon,
        paths: entry.boundaries.coordinates[0][0].map(([lng, lat]) => ({ lat, lng }))
      }));
      commit('setPolygons', polygons);
    }
  },
  getters: {
    polygons: state => state.polygons,
  }
});
