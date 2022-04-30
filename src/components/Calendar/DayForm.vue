<template>
  <q-card class="card">
    <q-card-section>
      <div class="text-secondary text-uppercase text-h5 text-underline">
        Report
      </div>
    </q-card-section>
    <table>
      <thead>
        <tr>
          <th scope="col">Mark</th>
          <th scope="col">Activity</th>
          <th scope="col">Value</th>
          <th scope="col">Unit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="activity in storeCalendar.dayActivities" :key="activity.id">
          <td data-label="Mark" class="text-center">
            <ActivityMark :color="activity.color" />
          </td>
          <td data-label="Activity" class="text-left">{{ activity.title }}</td>
          <td data-label="Value" class="center">
            <q-input
              v-model.number="activity.value"
              type="number"
              min="0"
              max="1440"
              dense
              style="max-width: 70px"
            />
          </td>
          <td data-label="Unit" class="text-center">
            {{ unit(activity.type) }}
          </td>
        </tr>
      </tbody>
    </table>
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

const unit = (type) => {
  if (type === "time") {
    return "min";
  }
  return "times";
};
</script>

<style scoped>
.card {
  min-width: 290px;
}

table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
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

table th {
  font-size: 0.85em;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

@media screen and (max-width: 600px) {
  table {
    border: 0;
  }

  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }

  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: 0.625em;
  }

  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    text-align: right;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    width: 70px;
    float: left;
    text-align: left;
    margin-right: 20px;
    font-weight: bold;
    text-transform: uppercase;
  }

  table td:last-child {
    border-bottom: 0;
  }
}
</style>
