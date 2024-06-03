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
interface State {
  polygons: PolygonData[];
  filters: {
    n_of_donuts: [number, number];
    attend_a_zoo: [number, number];
    can_cook_pizza: [number, number];
    n_of_coffee: [number, number];
    spent_in_amazon: [number, number];
  };
}

export default createStore({
  state: {
    polygons: [],
    filters: {
      n_of_donuts: [0, Infinity],
      attend_a_zoo: [0, 1],
      can_cook_pizza: [0, 1],
      n_of_coffee: [0, Infinity],
      spent_in_amazon: [0, Infinity],
    },
    min_max: {
      n_of_donuts: [0, Infinity],
      attend_a_zoo: [0, 1],
      can_cook_pizza: [0, 1],
      n_of_coffee: [0, Infinity],
      spent_in_amazon: [0, Infinity],
    }
  },
  mutations: {
    setPolygons(state, polygons: PolygonData[]) {
      state.polygons = polygons;
    },
    setFilter(state, { key, value }) {
      state.filters[key] = value;
    },
    setMinMaxValues(state, minMax: State['filters']) {
      state.min_max = minMax;
      state.filters = { ...minMax };
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
      commit('setMinMaxValues', computeMinMax(polygons));
    }
  },
  getters: {
    filteredPolygons: state => {
      return state.polygons.filter(polygon =>
        polygon.n_of_donuts >= state.filters.n_of_donuts[0] && polygon.n_of_donuts <= state.filters.n_of_donuts[1] &&
        (polygon.attend_a_zoo >= state.filters.attend_a_zoo[0] && polygon.attend_a_zoo <= state.filters.attend_a_zoo[1]) &&
        (polygon.can_cook_pizza >= state.filters.can_cook_pizza[0] && polygon.can_cook_pizza <= state.filters.can_cook_pizza[1]) &&
        polygon.n_of_coffee >= state.filters.n_of_coffee[0] && polygon.n_of_coffee <= state.filters.n_of_coffee[1] &&
        polygon.spent_in_amazon >= state.filters.spent_in_amazon[0] && polygon.spent_in_amazon <= state.filters.spent_in_amazon[1]
      );
    },
    filters: state => state.filters,
    min_max: state => state.min_max
  }
});

function computeMinMax(polygons: PolygonData[]): State['filters'] {
  const minMax = {
    n_of_donuts: [Infinity, -Infinity],
    attend_a_zoo: [0, 1],
    can_cook_pizza: [0, 1],
    n_of_coffee: [Infinity, -Infinity],
    spent_in_amazon: [Infinity, -Infinity],
  };

  polygons.forEach(polygon => {
    minMax.n_of_donuts[0] = Math.min(minMax.n_of_donuts[0], polygon.n_of_donuts);
    minMax.n_of_donuts[1] = Math.max(minMax.n_of_donuts[1], polygon.n_of_donuts);
    minMax.attend_a_zoo[0] = Math.min(minMax.attend_a_zoo[0], polygon.attend_a_zoo ? 1 : 0);
    minMax.attend_a_zoo[1] = Math.max(minMax.attend_a_zoo[1], polygon.attend_a_zoo ? 1 : 0);
    minMax.can_cook_pizza[0] = Math.min(minMax.can_cook_pizza[0], polygon.can_cook_pizza ? 1 : 0);
    minMax.can_cook_pizza[1] = Math.max(minMax.can_cook_pizza[1], polygon.can_cook_pizza ? 1 : 0);
    minMax.n_of_coffee[0] = Math.min(minMax.n_of_coffee[0], polygon.n_of_coffee);
    minMax.n_of_coffee[1] = Math.max(minMax.n_of_coffee[1], polygon.n_of_coffee);
    minMax.spent_in_amazon[0] = Math.min(minMax.spent_in_amazon[0], polygon.spent_in_amazon);
    minMax.spent_in_amazon[1] = Math.max(minMax.spent_in_amazon[1], polygon.spent_in_amazon);
  });

  return minMax;
}
