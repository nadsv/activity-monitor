<template>
  <q-page class="q-pa-md">
    <div
      class="
        fit
        row
        wrap
        justify-center
        items-start
        content-start
        q-gutter-x-lg q-gutter-y-md
      "
    >
      <q-date v-model="date" :events="events" />
      <DayForm />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import DayForm from "../components/Calendar/DayForm.vue";

const date = ref("2022/05/05");
const events = ref(["2022/05/05", "2022/05/01", "2022/05/03"]);
</script>

<style scoped>
</style>
