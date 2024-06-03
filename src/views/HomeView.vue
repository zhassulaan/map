<template>
  <main>
    <Container id="container1">
      <Map/>
      <Button text="Export to CSV" :active="true" @click="exportToCSV">
        <template #icon>
          <SaveIcon class="button-icon" />
        </template> 
      </Button>
    </Container>

    <Container id="container2">
      <Control />
      <Filter />
    </Container>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { parse } from 'json2csv';
import Container from '@/components/Container.vue';
import Map from '@/components/Map.vue';
import Button from '@/components/Button.vue';
import Filter from '@/components/Filter.vue';
import Control from '@/components/Control.vue';
import SaveIcon from '@/components/icons/Save.vue';

const store = useStore();
const polygons = computed(() => store.getters.filteredPolygons);

function convertToCSV(data: any[], fields: string[]): string {
  const csvRows = [];
  const headers = fields.join(',');
  csvRows.push(headers);

  for (const row of data) {
    const values = fields.map(field => {
      const escaped = ('' + row[field]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}
function exportToCSV() {
  const fields = ["id", "n_of_donuts", "attend_a_zoo", "can_cook_pizza", "n_of_coffee", "spent_in_amazon"];
  const csv = convertToCSV(polygons.value, fields);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'filtered_areas.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped lang="scss">
#container1 {
  width: calc((100% - (16px * 3)) * 0.7);
  .button {
    background-color: transparent;
    &-icon {
      width: 16px;
      height: 24px;
    }
  }
}
#container2 {
  width: calc((100% - (16px * 3)) * 0.3);
}
</style>
