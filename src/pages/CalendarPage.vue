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
        :events="calendarStore.datesInMonth"
        class="date-checker"
        :locale="myLocale"
        :emit-immediately="true"
        :navigation-max-year-month="navigationMaxYearMonth"
      />
      <DayForm
        :activities="activities"
        :note="note"
        :date="calendarStore.date"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import DayForm from "../components/Calendar/DayForm.vue";
import { useCalendarStore } from "stores/calendar";
import { useSettingsStore } from "stores/settings";
import { useAuthStore } from "../stores/auth";
import { debounce } from "quasar";

const calendarStore = useCalendarStore();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const date = ref("");
let note = ref("");
let activities = ref([]);
let id = ref("");
const today = new Date();
const MONTH = today.getMonth() + 1;
const YEAR = today.getFullYear();
const navigationMaxYearMonth = ref(`${YEAR}/${("0" + MONTH).substring(0, 2)}`);

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
  const index = calendarStore.datesInMonth.indexOf(date);
  if (date === calendarStore.date) {
    activities.value = calendarStore.reportActivities;
    note.value = calendarStore.note;
    id.value = calendarStore.id;
    return;
  }
  if (index > -1) {
    calendarStore.setReportActivities(date).then(() => {
      activities.value = calendarStore.reportActivities;
      note.value = calendarStore.note;
      calendarStore.setDate(date);
    });
  } else {
    activities.value = pattern();
    note.value = "";
    calendarStore.setDate(date);
    calendarStore.setReportId("0");
  }
};

onMounted(() => {
  date.value = calendarStore.date;
  if (settingsStore.activities.length === 0) {
    settingsStore.setActivities(localStorage.getItem("userId"));
  }
});

const changeMonthYear = debounce(function (cur) {
  calendarStore.getReports({
    year: cur.getFullYear(),
    month: cur.getMonth() + 1,
    userId: authStore.user.id,
  });
}, 1000);

watch(date, (curDate, prevDate) => {
  const cur = new Date(curDate);
  const prev = new Date(prevDate);
  if (cur.getMonth() !== prev.getMonth() || cur.getYear() !== prev.getYear()) {
    changeMonthYear(cur);
  }

  if (curDate !== null) {
    createFieldList(curDate);
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
