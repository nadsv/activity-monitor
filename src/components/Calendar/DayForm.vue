<template>
  <q-card class="card">
    <q-card-section>
      <div class="text-secondary text-uppercase text-h5 text-underline">
        Report
      </div>
    </q-card-section>

    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Mark</th>
          <th class="text-left">Activity</th>
          <th class="text-right">Time/Times</th>
          <th class="text-right">Unit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in storeCalendar.dayActivities" :key="activity.id">
          <td class="text-center">
            <ActivityMark :color="activity.color" />
          </td>
          <td class="text-left">{{ activity.title }}</td>
          <td class="text-right">{{ activity.value }}</td>
          <td class="text-right">min</td>
        </tr>
      </tbody>
    </q-markup-table>
    <q-card-section>
      <div class="text-subtitle2">Note</div>
      <q-input v-model="note" filled autogrow type="textarea" />
    </q-card-section>

    <q-card-actions vertical align="right">
      <q-btn color="secondary">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useCalendarStore } from "stores/calendar";
import ActivityMark from "../ActivityMark.vue";

const note = ref("");
const storeCalendar = useCalendarStore();
</script>

<style scoped>
.card {
  min-width: 290px;
}
</style>
