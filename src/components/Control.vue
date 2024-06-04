<template>
  <div class="control">
    <div class="control-row">
      <h3>Filters</h3>
      <Button text="Add new" :active="true" />
    </div>

    <div class="control-row">
      <Dropdown />
      <Button text="Rename" />
    </div>
    
    <div class="control-row">
      <Button text="Delete" />
      <Button text="Save" />
      <Button text="Save as" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from '@/components/Button.vue';
import Dropdown from '@/components/Dropdown.vue';

const savedFilters = ref({});

function loadSavedFilters() {
  const filters = JSON.parse(localStorage.getItem('filterSettings') || '{}');
  savedFilters.value = filters;
}

loadSavedFilters();
</script>

<style scoped lang="scss">
.control {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;
  &-row {
    display: flex;
    gap: 8px;
  }
}
</style>
