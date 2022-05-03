<template>
  <q-page class="q-pa-md">
    <div
      class="fit row wrap justify-center items-start content-center q-gutter-y-lg"
    >
      <q-date
        v-model="date"
        :events="calendarStore.dates"
        class="date-checker"
        :locale="myLocale"
      />
      <DayForm />
    </div>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";
import DayForm from "../components/Calendar/DayForm.vue";
import { useCalendarStore } from "stores/calendar";
import { useSettingsStore } from "stores/settings";

const calendarStore = useCalendarStore();
const settingsStore = useSettingsStore();
const date = ref(calendarStore.date);

const myLocale = {
  firstDayOfWeek: 1,
  format24h: true,
};

watch(date, (date, prevDate) => {
  const index = calendarStore.dates.indexOf(date);
  console.log(index, "index");
});
</script>

<style scoped>
.date-checker {
  margin-right: 50px;
}
@media screen and (max-width: 600px) {
  .date-checker {
    margin-right: 0;
  }
}
</style>
