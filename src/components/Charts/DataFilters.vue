<template>
  <q-card class="data-filters-wrapper">
    <q-form @submit="submitForm" greedy>
      <q-card-section>
        <div class="row q-mb-lg">
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
              v-model="chartsStore.period.start"
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
                    <q-date v-model="chartsStore.period.start">
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
            <q-input
              outlined
              v-model="chartsStore.period.end"
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
                    <q-date v-model="chartsStore.period.end">
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
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" type="submit">Build Chart</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { formatedToday, calcDate } from "src/utils";
import { useChartStore } from "stores/charts";

const chartsStore = useChartStore();

let start = ref(calcDate({ days: -7 }));
let end = ref(formatedToday());
let period = ref("week");
let periods = chartsStore.periods;

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
  chartsStore.setEndDates(period.value);
});

const submitForm = () => {
  const payload = {
    start: start.value,
    end: end.value,
  };
  chartsStore.setSeries(payload);
};
</script>

<style scoped>
.data-filters-wrapper {
  margin-right: 50px;
  margin-bottom: 20px;
  max-width: 350px;
}
@media screen and (max-width: 600px) {
  .data-filters-wrapper {
    margin-right: 0;
  }
}
</style>
