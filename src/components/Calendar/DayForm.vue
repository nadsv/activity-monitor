<template>
  <q-card class="card">
    <q-form @submit="saveForm" greedy>
      <q-card-section>
        <div
          class="
            text-secondary text-center text-uppercase text-h5 text-underline
          "
        >
          Report
        </div>
      </q-card-section>
      <table v-if="activities.length > 0">
        <thead>
          <tr class="text-primary">
            <th scope="col">Mark</th>
            <th scope="col">Activity</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="activity in activities" :key="activity.id">
            <td data-label="Mark">
              <ActivityMark :color="activity.color" class="mark" />
            </td>
            <td data-label="Activity" class="text-left">
              <div>{{ activity.title }}</div>
            </td>
            <td data-label="Value">
              <div class="flex flex-center">
                <q-input
                  v-model.number="activity.value"
                  type="number"
                  min="0"
                  max="1440"
                  dense
                  style="max-width: 70px"
                />
                <div style="width: 40px">{{ unit(activity.type) }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <q-banner v-else class="bg-info text-white">
        Add daily activities in Settings.
        <template v-slot:action>
          <q-btn flat color="white" label="Settings" :to="'/settings'" />
        </template>
      </q-banner>
      <q-card-section>
        <div class="text-subtitle2">Note</div>
        <q-input v-model="note" filled autogrow type="textarea" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="negative" type="button" @click="clearForm">Clear</q-btn>
        <q-btn color="secondary" type="submit">Save</q-btn>
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useCalendarStore } from "stores/calendar";
import ActivityMark from "../ActivityMark.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
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

let activities = ref([]);
let note = ref("");

const unit = (type) => (type === "time" ? "min" : "times");

watch(
  () => props.date,
  () => {
    activities.value = props.activities;
    note.value = props.note;
  }
);

onMounted(() => {
  activities.value = props.activities;
  note.value = props.note;
});

const saveForm = () => {
  const currentReport = {
    id: props.id,
    note: note.value,
    activities: activities.value,
  };
  if (props.id === "0") {
    calendarStore.addReport(currentReport);
  } else {
    calendarStore.updateReport(currentReport);
  }
};

const clearForm = () => {
  console.log("clearForm");
};
</script>

<style scoped>
.card {
  min-width: 290px;
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
    display: flex;
    text-align: left;
    align-items: center;
  }

  table td::before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    width: 50px;
    display: block;
    margin-right: 20px;
    font-weight: bold;
    text-transform: capitalize;
  }

  table td:last-child {
    border-bottom: 0;
  }

  .mark {
    margin: 0;
  }
}
</style>
