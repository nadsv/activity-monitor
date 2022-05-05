<template>
  <q-page class="q-pa-md">
    <div
      class="
        fit
        row
        wrap
        justify-center
        items-start
        content-center
        q-gutter-y-lg
      "
    >
      <q-date
        v-model="calendarStore.date"
        :events="calendarStore.dates"
        class="date-checker"
        :locale="myLocale"
      />
      <DayForm :report="report" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";
import DayForm from "../components/Calendar/DayForm.vue";
import { useCalendarStore } from "stores/calendar";
import { useSettingsStore } from "stores/settings";

const calendarStore = useCalendarStore();
const settingsStore = useSettingsStore();

const myLocale = {
  firstDayOfWeek: 1,
  format24h: true,
};

let report = computed(() => {
  const index = calendarStore.dates.indexOf(calendarStore.date);
  if (index > -1) {
    return {
      activities: calendarStore.reportActivities,
      note: calendarStore.note,
    };
  } else {
    return {
      activities: settingsStore.pattern,
      note: "",
    };
  }
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
