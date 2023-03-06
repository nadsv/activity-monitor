<template>
  <q-card class="summary-card">
    <q-card-section>
      <mood-panel v-model="calendarStore.mood"></mood-panel>
    </q-card-section>
    <q-card-section>
      <text-note v-model="calendarStore.note"></text-note>
    </q-card-section>
  </q-card>
</template>

<script setup>
import MoodPanel from "./MoodPanel.vue";
import TextNote from "./TextNote.vue";
import { useCalendarStore } from "stores/calendar";

const calendarStore = useCalendarStore();
</script>

<style scoped>
.summary-card {
  width: 290px;
}
</style>
