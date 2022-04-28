<template>
  <q-item tag="label">
    <q-item-section avatar>
      <span
        class="color-marker"
        :style="{ 'background-color': `${color}` }"
      ></span>
    </q-item-section>
    <q-item-section>
      <q-item-label :lines="3">
        {{ title }}
      </q-item-label>
      <q-item-label caption class="q-ml-lg">
        {{ type }}
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="text-grey-8">
        <q-btn
          size="16px"
          color="negative"
          flat
          dense
          round
          icon="delete"
          @click="promtToDelete"
        />
        <q-btn
          size="16px"
          color="info"
          flat
          dense
          round
          icon="edit"
          @click="editButtonClick"
        />
      </div>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { useSettingsStore } from "../../stores/settings";
import { ref } from "vue";
import { useQuasar } from "quasar";

const props = defineProps({
  title: { type: String, required: true },
  active: { type: Boolean, required: true },
  type: { type: String, required: true },
  color: { type: String, required: true },
  id: { type: String, required: true },
});

const emit = defineEmits(["edit"]);

const $q = useQuasar();
const storeSettings = useSettingsStore();

const isActive = ref(props.active);

const editButtonClick = () => {
  emit("edit");
};

const promtToDelete = () => {
  $q.dialog({
    title: "Confirm",
    message:
      "Do you really want to delete this item? All records about your daily activities will be deleted from the calendar",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    storeSettings.deleteActivityItem(props.id);
  });
};
</script>

<style scoped>
.color-marker {
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.q-item__label--caption {
  margin-left: 0 !important;
}

.q-item__section--avatar {
  min-width: auto;
}
</style>
