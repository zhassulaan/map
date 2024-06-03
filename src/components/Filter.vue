<template>
  <div class="filter">
    <Slider
      id="n_of_donuts"
      label="# of donuts eaten in January"
      :min="range.n_of_donuts[0]"
      :max="range.n_of_donuts[1]"
    />
    <Slider
      id="attend_a_zoo"
      label="Attended a zoo at least once per year"
      :min="range.attend_a_zoo[0]"
      :max="range.attend_a_zoo[1]"
    />
    <Slider
      id="can_cook_pizza"
      label="Knows how to cook pizza"
      :min="range.can_cook_pizza[0]"
      :max="range.can_cook_pizza[1]"
    />
    <Slider
      id="n_of_coffee"
      label="# of cups of coffee per year"
      :min="range.n_of_coffee[0]"
      :max="range.n_of_coffee[1]"
    />
    <Slider
      id="spent_in_amazon"
      label="$$$ spent in Amazon in last 3 years"
      :min="range.spent_in_amazon[0]"
      :max="range.spent_in_amazon[1]"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Slider from '@/components/Slider.vue';

const store = useStore();
const range = computed(() => store.getters.min_max);
</script>
