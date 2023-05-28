<template>
  <q-card class="actions">
    <q-card-actions align="right">
      <q-btn color="negative" type="button" @click="clearForm">Clear</q-btn>
      <q-btn color="secondary" type="button" @click="saveForm">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { onMounted } from "vue";
import { useCalendarStore } from "stores/calendar";
import { useAuthStore } from "stores/auth";

const calendarStore = useCalendarStore();
const authStore = useAuthStore();

const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
});

const saveForm = () => {
  calendarStore.isNewForm = false;
  const currentReport = {
    id: calendarStore.id,
    note: calendarStore.note,
    mood: calendarStore.mood,
    date: calendarStore.date,
    activities: props.activities,
    userId: authStore.user.id,
  };
  if (+calendarStore.id === 0) {
    calendarStore.addReport(currentReport);
  } else {
    calendarStore.updateReport(currentReport);
  }
  console.log(currentReport);
};

const clearForm = () => {
  calendarStore.isNewForm = true;
  calendarStore.deleteReport().then(() => {
    calendarStore.note = "";
    calendarStore.mood = "4";
    activities.value = calendarStore.activities;
  });
};
</script>

<style scoped>
.actions {
  width: 290px;
}
</style>
