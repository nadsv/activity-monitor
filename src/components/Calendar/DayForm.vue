<template>
  <q-card class="card">
    <div v-if="calendarStore.reportActivities.length">
      <table>
        <thead>
          <tr class="text-primary">
            <th scope="col">Mark</th>
            <th scope="col">Activity</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id">
            <td data-label="Mark" class="td--zero-padding">
              <ActivityMark :color="activity.color" class="mark" />
            </td>
            <td data-label="Activity" class="text-left td--zero-padding">
              <div>{{ activity.title }}</div>
            </td>
            <td
              data-label="Value"
              class="row td--zero-padding justify-center justify-field"
            >
              <div class="flex flex-center value-field">
                <q-input
                  v-model.number="activity.value"
                  type="number"
                  min="0"
                  max="1440"
                  dense
                  filled
                  bottom-slots
                  @blur="onValueBlur(activity)"
                  @click="onValueClick(activity)"
                />
              </div>
              <div class="unit-field">{{ unit(activity.type) }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <q-banner
      class="bg-info text-white"
      v-if="settingsStore.activities.length === 0"
    >
      Add daily activities in Settings.
      <template v-slot:action>
        <q-btn flat color="white" label="Settings" :to="'/settings'" />
      </template>
    </q-banner>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useCalendarStore } from "stores/calendar";
import { useSettingsStore } from "src/stores/settings";

import ActivityMark from "../ActivityMark.vue";

const props = defineProps({
  activities: {
    type: Array,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const calendarStore = useCalendarStore();
const settingsStore = useSettingsStore();

const unit = (type) => (type === "time" ? "min" : "times");

const onValueBlur = (activity) => {
  calendarStore.isNewForm = false;
  if (activity.value === "") {
    activity.value = 0;
  }
};

const onValueClick = (activity) => {
  if (activity.value === 0) {
    activity.value = "";
  }
};

watch(
  () => props.date,
  () => {
    calendarStore.isNewForm = true;
  }
);

onMounted(() => {
  console.log("activities", props.activities);
});
</script>

<style scoped>
.card {
  min-width: 350px;
}

.value-field {
  margin-top: 18px;
}

.unit-field {
  margin-top: 28px;
  margin-left: 5px;
  width: 40px;
}

.mark {
  margin: auto;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  min-width: 100%;
}

table tr {
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
}

table th,
table td {
  padding: 0.625em;
}

.td--zero-padding {
  padding-top: 0;
  padding-bottom: 0;
}

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
</style>
