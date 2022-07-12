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
        @formSubmited="saveActivity"
        :formTitle="title"
        :id="id"
      />
    </q-dialog>
    <div class="q-pa-md q-gutter-sm">
      <LogoutBanner />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useSettingsStore } from "stores/settings";
import ActivityItem from "../components/Settings/ActivityItem.vue";
import ActivityItemForm from "../components/Settings/ActivityItemForm.vue";
import LogoutBanner from "../components/Settings/LogoutBanner.vue";
import { useAuthStore } from "../stores/auth";

const storeSettings = useSettingsStore();
const authStore = useAuthStore();

const showActivityItem = ref(false);

let id = ref(0);
let title = ref("Add Activity");

const showAddActivityForm = () => {
  id.value = "0";
  title.value = "Add Activity";
  showActivityItem.value = true;
};

const showEditActivityForm = (value) => {
  id.value = value;
  title.value = "Edit Activity";
  showActivityItem.value = true;
};

const saveActivity = (item) => {
  if (item.id === "0") {
    storeSettings.addActivityItem(item);
  } else {
    storeSettings.updateActivityItem(item);
  }
  showActivityItem.value = false;
};
</script>

<style scoped>
.list-wrapper {
  min-width: 350px;
  width: 100%;
}

@media (min-width: 1200px) {
  .list-wrapper {
    width: 1000px;
  }
}
</style>
