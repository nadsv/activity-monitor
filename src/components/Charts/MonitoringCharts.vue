<template>
  <div class="col">
    <q-card class="card-wrapper"
      ><apexchart
        type="line"
        height="450"
        :options="chartOptions"
        :series="series"
      ></apexchart
    ></q-card>
    <chart-legend :series="legendItems" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useChartStore } from "src/stores/charts";
import { deepCopyFunction } from "src/utils";
import ChartLegend from "./ChartLegend.vue";

const props = defineProps({
  typeOfUnites: { type: String, required: true },
});

const chartStore = useChartStore();

let chartOptions = computed(() => {
  let options = deepCopyFunction(chartStore.chartOptions);
  if (props.typeOfUnites === "time") {
    options.title.text = "Time in Minutes";
  }
  if (props.typeOfUnites === "quantity") {
    options.title.text = "Number of Times";
    options.yaxis.title.text = "Times";
  }
  return options;
});
let series = computed(() =>
  chartStore.allSeries.filter(
    (item) => item.show && item.unit === props.typeOfUnites
  )
);

let legendItems = computed(() =>
  chartStore.allSeries.filter((item) => item.unit === props.typeOfUnites)
);
</script>

<style lang="scss" scoped>
</style>
