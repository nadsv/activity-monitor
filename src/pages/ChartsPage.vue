<template>
  <q-page class="flex flex-center">
    <DataFilters />
    <MonitoringCharts />
  </q-page>
</template>

<script setup>
import MonitoringCharts from "../components/Charts/MonitoringCharts.vue";
import DataFilters from "../components/Charts/DataFilters.vue";
</script>

<style scoped></style>
