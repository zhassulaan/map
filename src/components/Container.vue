<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  height: 100%;
  background-color: #FFF;
  border-radius: 16px;
  padding: 16px;
}
</style>
