<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md row--justify-content">
      <DataFilters class="filter" />
    </div>
    <div
      class="charts row q-mb-md row--justify-content"
      v-if="chartStore.allSeries.length"
    >
      <MonitoringCharts class="monitoring-charts" :typeOfUnites="'time'" />
      <MonitoringCharts class="monitoring-charts" :typeOfUnites="'quantity'" />
    </div>
    <div
      class="charts row q-mb-md row--justify-content"
      v-if="notesStore.notes.length"
    >
      <daily-notes></daily-notes>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import DailyNotes from "src/components/Charts/DailyNotes.vue";
import MonitoringCharts from "../components/Charts/MonitoringCharts.vue";
import DataFilters from "../components/Charts/DataFilters.vue";
import { useChartStore } from "src/stores/charts";
import { useNotesStore } from "src/stores/notes";

const chartStore = useChartStore();
const notesStore = useNotesStore();
</script>

<style scoped>
.filter {
  align-self: flex-start;
}

.row--justify-content {
  flex-wrap: wrap;
  justify-content: center;
}
.monitoring-charts {
  min-width: 600px;
  margin-right: 50px;
  margin-bottom: 40px;
}
@media screen and (max-width: 600px) {
  .monitoring-charts {
    min-width: 0;
    margin-right: 0;
  }

  .charts {
    flex-direction: column;
  }
}
</style>
