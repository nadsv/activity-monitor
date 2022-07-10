<template>
  <q-card>
    <q-list padding separator>
      <q-item-label header class="text-uppercase"
        >Show Activities on Charts:</q-item-label
      >

      <q-item v-for="item in chartStore.allSeries" :key="item.name">
        <q-item-section avatar>
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
            @click="toggleSeries(item.name)"
          />
        </q-item-section>
        <q-item-section>
          <q-item-label :lines="3">
            {{ item.name }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup>
import { useChartStore } from "src/stores/charts";

const chartStore = useChartStore();

const toggleSeries = (name) => {
  console.log(name);
};
</script>

<style  scoped>
.q-checkbox__inner.relative-position.non-selectable.q-checkbox__inner--truthy {
  color: currentColor !important;
}
</style>
