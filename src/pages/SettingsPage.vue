<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md list-wrapper">
      <q-list bordered padding separator>
        <div class="row">
          <q-item-label header class="text-primary text-uppercase text-h5"
            >Activities</q-item-label
          >
          <q-space />
          <q-item-label>
            <q-btn
              @click="toggleAddSettingItemModal"
              rounded
              dense
              color="primary"
              icon="add"
              size="18px"
              class="q-mr-md q-mt-xs"
            />
          </q-item-label>
        </div>

        <SettingsItem
          v-for="activity in storeSettings.activities"
          :key="activity.id"
          :title="activity.title"
          :active="activity.active"
          :type="activity.type"
          :color="activity.color"
          :id="activity.id"
        ></SettingsItem>
      </q-list>
    </div>
    <q-dialog v-model="showAddSettingsItem">
      <AddSettingsItemModal @formSubmited="closeAddSettingItemModal" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useSettingsStore } from "stores/settings";
import SettingsItem from "../components/Settings/SettingsItem.vue";
import AddSettingsItemModal from "../components/Modals/AddSettingsItem.vue";

const storeSettings = useSettingsStore();
const showAddSettingsItem = ref(false);

const toggleAddSettingItemModal = () => {
  showAddSettingsItem.value = !showAddSettingsItem.value;
};

const closeAddSettingItemModal = () => {
  showAddSettingsItem.value = false;
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
