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
        v-model="date"
        :events="calendarStore.dates"
        class="date-checker"
        :locale="myLocale"
      />
      <DayForm
        :activities="activities"
        :note="note"
        :id="id"
        :date="calendarStore.date"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeMount } from "vue";
import DayForm from "../components/Calendar/DayForm.vue";
import { useCalendarStore } from "stores/calendar";
import { useSettingsStore } from "stores/settings";

const calendarStore = useCalendarStore();
const settingsStore = useSettingsStore();
const date = ref(calendarStore.date);
let note = ref("");
let activities = ref([]);
let id = ref("");

const myLocale = {
  firstDayOfWeek: 1,
  format24h: true,
};

const pattern = () => {
  let dailyPattern = [];
  for (const activity of settingsStore.activities) {
    if (activity.active) {
      dailyPattern.push({ ...activity, value: 0 });
    }
  }
  return dailyPattern;
};

const createFieldList = (date) => {
  const index = calendarStore.dates.indexOf(date);
  if (index > -1) {
    activities.value = calendarStore.reportActivities;
    note.value = calendarStore.note;
    id.value = calendarStore.id;
  } else {
    activities.value = pattern();
    note.value = "";
    id.value = "0";
  }
};

onBeforeMount(() => {
  createFieldList(date.value);
});

watch(date, (curDate, prevDate) => {
  if (new Date(curDate).getMonth() !== new Date(prevDate).getMonth()) {
    console.log("Month changed");
  }

  if (curDate !== null) {
    createFieldList(curDate);
    calendarStore.setDate(curDate);
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
