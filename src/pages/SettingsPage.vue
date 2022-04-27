<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md list-wrapper">
      <q-list bordered padding separator>
        <div class="row">
          <q-item-label
            header
            class="text-primary text-uppercase text-h5 text-underline"
            >Activities</q-item-label
          >
          <q-space />
          <q-item-label>
            <q-btn
              @click="showAddActivityForm"
              rounded
              dense
              color="primary"
              icon="add"
              size="18px"
              class="q-mr-md q-mt-xs"
            />
          </q-item-label>
        </div>

        <ActivityItem
          v-for="activity in storeSettings.activities"
          :key="activity.id"
          :title="activity.title"
          :active="activity.active"
          :type="activity.type"
          :color="activity.color"
          :id="activity.id"
          @edit="showEditActivityForm(activity.id)"
        ></ActivityItem>
      </q-list>
    </div>
    <q-dialog v-model="showActivityItem">
      <ActivityItemForm
        @formSubmited="closeAddActivityItemModal"
        :item="activity"
        :formTitle="title"
      />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useSettingsStore } from "stores/settings";
import ActivityItem from "../components/Settings/ActivityItem.vue";
import ActivityItemForm from "../components/Modals/ActivityItemForm.vue";

const storeSettings = useSettingsStore();

const showActivityItem = ref(false);

const defaultItem = {
  userId: "0",
  title: "",
  active: true,
  type: "time",
  color: "#0044aa",
};

let activity = reactive({ ...defaultItem });
let title = ref("Add Activity");

const showAddActivityForm = () => {
  activity = { ...defaultItem };
  title.value = "Add Activity";
  showActivityItem.value = true;
};

const showEditActivityForm = (id) => {
  const item = storeSettings.activities.find((item) => item.id === id);
  activity = { ...item };
  console.log("activity", activity);
  title.value = "Edit Activity";
  showActivityItem.value = true;
};

const closeAddActivityItemModal = () => {
  showActivityItem.value = false;
};
</script>

<style scoped>
.list-wrapper {
  min-width: 350px;
  width: 100%;
}

.text-underline {
  text-decoration: underline;
}

@media (min-width: 1200px) {
  .list-wrapper {
    width: 1000px;
  }
}
</style>
