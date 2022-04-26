<template>
  <q-card class="card-wrapper">
    <q-card-section class="row items-center q-pb-none">
      <div class="text-h6">Add</div>
      <q-space />
      <q-btn label="Save" color="secondary" v-close-popup @click="save" />
    </q-card-section>

    <q-card-section>
      <div class="row q-mb-sx">
        <q-input
          outlined
          v-model="settingsItem.title"
          label="Settings Item Name"
          class="col"
          :rules="[(val) => !!val || 'Field is required']"
          dense
        />
      </div>
      <div class="row q-mb-md">
        <q-select
          outlined
          v-model="settingsItem.type"
          :options="typeOptions"
          label="Type"
          class="col"
          dense
        />
      </div>
      <div class="row q-mb-sm">
        <div class="color-title">Color</div>
        <q-color
          v-model="settingsItem.color"
          no-header-tabs
          no-footer
          class="color-picker"
        />
      </div>

      <div class="row q-mb-sm">
        <q-toggle
          v-model="settingsItem.active"
          color="positive"
          label="Active"
          left-label
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useSettingsStore } from "stores/settings";

const typeOptions = ref(["time", "quantity"]);

const storeSettings = useSettingsStore();

const settingsItem = reactive({
  id: 0,
  userId: 0,
  title: "",
  active: true,
  type: "time",
  color: "#0044aa",
});

const save = () => {
  storeSettings.addSettingsItem(settingsItem);
};
</script>

<style scoped>
.card-wrapper {
  width: 100%;
}

.color-picker {
  width: 100px;
}

.color-title {
  font-size: 13px;
  margin-right: 20px;
}
</style>
