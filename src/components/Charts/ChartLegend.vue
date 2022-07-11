<template>
  <q-card>
    <div class="legend">
      <div class="legend--item row" v-for="item in series" :key="item.name">
        <div class="item--marker">
          <q-checkbox
            class="color-checkbox"
            v-model="item.show"
            keep-color
            checked-icon="check_circle"
            unchecked-icon="remove_circle_outline"
            dense
            :style="{
              color: item.color,
            }"
          />
        </div>
        <div class="item--name">
          <q-item-label :lines="3">
            {{ item.name }}
          </q-item-label>
        </div>
      </div>
      <div class="item--marker">
        <q-checkbox class="color-checkbox" v-model="showLabels" dense />
      </div>
      <div class="item--name">
        <q-item-label> Labels </q-item-label>
      </div>
    </div>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useChartStore } from "src/stores/charts";
const props = defineProps({
  series: { type: Array, required: true },
});

const chartStore = useChartStore();

const showLabels = ref(true);

watch(showLabels, () => {
  chartStore.chartOptions.dataLabels.enabled = showLabels.value;
});
</script>

<style  scoped>
.legend {
  display: flex;
  padding: 15px;
  padding-bottom: 0;
  flex-wrap: wrap;
}
.legend--item {
  flex-wrap: nowrap;
  align-items: center;
  padding-right: 20px;
  padding-bottom: 15px;
}
.item--marker {
  padding-right: 5px;
}
.item--name {
  padding-top: 3px;
}
</style>
