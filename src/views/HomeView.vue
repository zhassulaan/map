<template>
  <main>
    <Container id="container1">
      <Map/>
    </Container>
    <Container id="container2">
      <h5>Filter</h5>
    </Container>
  </main>
</template>

<script setup>
import Container from '@/components/Container.vue';
import Map from '@/components/Map.vue';
</script>

<style scoped>
#container1 {
  width: calc((100% - (16px * 3)) * 0.7);
}
#container2 {
  width: calc((100% - (16px * 3)) * 0.3);
}
</style>
