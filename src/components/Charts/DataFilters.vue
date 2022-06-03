<template>
  <q-card class="card-wrapper">
    <q-form @submit="submitForm" greedy>
      <q-card-section>
        <div class="row q-mb-sm">
          <div class="col-3 q-pt-sm text-subtitle2">Period</div>
          <div class="col-9">
            <q-select
              transition-show="jump-up"
              transition-hide="jump-up"
              outlined
              dense
              v-model="period"
              :options="periods"
            />
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-3 q-pt-sm text-subtitle2">From</div>
          <div class="col-9">
            <q-input
              outlined
              v-model="start"
              mask="date"
              :rules="['date']"
              dense
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="start">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-3 q-pt-sm text-subtitle2">To</div>
          <div class="col-9">
            <q-input outlined v-model="end" mask="date" :rules="['date']" dense>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy
                    cover
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-date v-model="end">
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
        <div class="row q-mb-sm">
          <div class="col-3 text-subtitle2">Only<br />Active</div>
          <div class="col-9">
            <q-toggle v-model="active" color="positive" left-label />
          </div>
        </div>
      </q-card-section>
      <q-separator spaced />
      <div class="row q-mb-sm">
        <ActivityList :list="list" :onlyActive="active" />
      </div>
      <q-card-actions align="right">
        <q-btn color="secondary" type="submit">Build Graph</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { formatedToday, calcDate } from "src/utils";
import { useCalendarStore } from "stores/calendar";
import ActivityMark from "../ActivityMark.vue";
import ActivityList from "./ActivityList.vue";
import { useSettingsStore } from "stores/settings";

const storeSettings = useSettingsStore();
let list = ref(
  storeSettings.activities.map((item) => ({
    ...item,
    show: true,
  }))
);

let start = ref(calcDate({ days: -7 }));
let end = ref(formatedToday());
let period = ref("week");
let periods = ref(["week", "month", "year", "2 years", "period"]);
let active = ref(true);

watch(period, () => {
  let diff = {};
  switch (period.value) {
    case "week":
      diff = { days: -7 };
      break;
    case "month":
      diff = { month: -1 };
      break;
    case "year":
      diff = { year: -1 };
      break;
    case "2 years":
      diff = { year: -2 };
      break;
    default:
      diff = { days: 0 };
      break;
  }
  start.value = calcDate(diff);
});

const submitForm = () => {
  const payload = {
    start: start.value,
    end: end.value,
  };
  console.log("submit form:", payload);
};
</script>

<style scoped>
</style>
