<template>
  <q-card class="summary-card">
    <q-card-section>
      <mood-panel v-model="mood"></mood-panel>
    </q-card-section>
    <q-card-section>
      <text-note v-model="note"></text-note>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import MoodPanel from "./MoodPanel.vue";
import TextNote from "./TextNote.vue";
import { useCalendarStore } from "stores/calendar";

const calendarStore = useCalendarStore();
let mood = ref(calendarStore.mood);
let note = ref(calendarStore.note);
</script>

<style scoped>
.summary-card {
  width: 290px;
}
</style>
