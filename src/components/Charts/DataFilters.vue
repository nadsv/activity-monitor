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
              v-model="chartsStore.period.type"
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
              @click="onDateChanged"
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
              @click="onDateChanged"
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
        <div class="row q-mb-sm">
          <div class="q-gutter-sm">
            <q-radio val="charts" label="Charts" v-model="typeOfData" />
            <q-radio val="notes" label="Notes" v-model="typeOfData" />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="secondary" type="submit">Get Data</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { formatedToday, calcDate } from "src/utils";
import { useChartStore } from "stores/charts";
import { useNotesStore } from "stores/notes";

const chartsStore = useChartStore();
const notesStore = useNotesStore();

let periods = chartsStore.periods;
let typeOfData = ref("charts");

const onDateChanged = () => {
  console.log("12121");
  chartsStore.period.type = "period";
};

watch(
  () => chartsStore.period.type,
  () => {
    let diff = {};
    switch (chartsStore.period.type) {
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
        return;
    }
    chartsStore.period.end = formatedToday();
    chartsStore.period.start = calcDate(diff);
  }
);

const submitForm = () => {
  const payload = {
    start: chartsStore.period.start,
    end: chartsStore.period.end,
  };
  chartsStore.resetSeries();
  notesStore.resetNotes();
  switch (typeOfData.value) {
    case "charts":
      chartsStore.setSeries(payload);
      break;
    case "notes":
      notesStore.getNotes(payload);
      break;
  }
};
</script>

<style scoped>
.data-filters-wrapper {
  margin-bottom: 20px;
  max-width: 350px;
}
</style>
