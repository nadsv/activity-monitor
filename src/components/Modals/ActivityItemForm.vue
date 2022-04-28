<template>
  <q-card class="card-wrapper">
    <q-form @submit="submitForm" autofocus greedy>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ formTitle }}</div>
        <q-space />
        <q-btn label="Save" color="secondary" type="submit" />
      </q-card-section>
      <q-card-section>
        <div class="row q-mb-sm">
          <q-input
            outlined
            v-model="activityItem.title"
            label="Activity Name"
            class="col"
            :rules="[
              (val) =>
                val.length >= 3 || 'Name must be longer than 3 characters',
            ]"
            lazy-rules
            dense
          />
        </div>
        <div class="row q-mb-lg">
          <q-select
            outlined
            v-model="activityItem.type"
            :options="typeOptions"
            label="Type"
            class="col"
            dense
          />
        </div>
        <div class="row q-mb-sm">
          <div class="color-title">Color</div>
          <q-color
            v-model="activityItem.color"
            no-header-tabs
            no-footer
            class="color-picker"
          />
        </div>

        <div class="row q-mb-sm">
          <q-toggle
            v-model="activityItem.active"
            color="positive"
            label="Active"
            left-label
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useSettingsStore } from "stores/settings";

const typeOptions = ref(["time", "quantity"]);

const defaultItem = {
  userId: "0",
  title: "",
  active: true,
  type: "time",
  color: "#0044aa",
  id: "0",
};

const storeSettings = useSettingsStore();
const props = defineProps({
  formTitle: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
});

let activityItem = reactive({ ...defaultItem });

onMounted(() => {
  if (props.id !== "0") {
    const item = storeSettings.activities.find((item) => item.id === props.id);
    Object.assign(activityItem, item);
  }
});

const emit = defineEmits(["formSubmited"]);

const submitForm = () => {
  if (props.id === "0") {
    storeSettings.addActivityItem(activityItem);
  } else {
    storeSettings.updateActivityItem(activityItem);
  }
  emit("formSubmited");
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
  font-size: 14px;
  margin-right: 20px;
}
</style>
