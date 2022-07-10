<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "./stores/auth";
import { useChartStore } from "./stores/charts";

const authStore = useAuthStore();
const chartStore = useChartStore();

onMounted(() => {
  authStore.setUser();
  chartStore.resetSeries();
});
</script>
