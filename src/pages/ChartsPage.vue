<template>
  <q-page class="flex flex-center">
    <MonitoringCharts />
  </q-page>
</template>

<script>
import { reactive, toRefs } from "vue";
import MonitoringCharts from "../components/Charts/MonitoringCharts.vue";

export default {
  setup() {
    const state = reactive({
      count: 0,
    });
    return {
      ...toRefs(state),
    };
  },
  components: { MonitoringCharts },
};
</script>

<style scoped></style>
