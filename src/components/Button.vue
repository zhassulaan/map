<template>
  <button class="button" :class="{ 'active': active }">
    <slot name="icon"></slot>
    <p class="button-text">{{ text }}</p>
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';

const props = withDefaults(defineProps<{
  text: string,
  active?: boolean
}>(), {
  active: false
});
</script>

<style scoped lang="scss">
.button {
  display: flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  border: 1px solid grey;
  border-radius: 4px;
  padding: 4px 10px;
  background-color: transparent;
  &.active {
    background-color: orange;
    border: none;
    .button-text {
      color: #1970E1;
    }
  }
}
</style>
