<template>
  <div class="slider">
    <label :for="id">{{ label }}</label>

    <div class="slider-input">
      <input
        :id="`${id}-fromSlider`"
        type="number"
        :value="filters[id][0]"
        @input="updateRange(id, 'from', $event.target.value)"
      />
      <input
        :id="`${id}-toSlider`"
        type="number"
        :value="filters[id][1]"
        @input="updateRange(id, 'to', $event.target.value)"
      />
    </div>

    <div class="slider-range">
      <p>{{ min }}</p>
      <p>{{ max }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';

const props = defineProps<{
  id: string,
  label: string,
  min: number,
  max: number
}>();
const store = useStore();
const filters = computed(() => store.getters.filters);

function updateRange(key: string, handle: 'from' | 'to', value: string) {
  const numValue = parseFloat(value);
  if (!isNaN(numValue)) {
    const clampedValue = Math.min(Math.max(numValue, props.min), props.max);
    const newValue = handle === 'from' ? [clampedValue, filters.value[key][1]] : [filters.value[key][0], clampedValue];
    store.commit('setFilter', { key, value: newValue });
  }
}
</script>

<style scoped lang="scss">
.slider {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  height: 100%;
  margin-bottom: 16px;
  &-input,
  &-range {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  &-input {
    position: relative;
    min-height: 24px;
  }
}
</style>
