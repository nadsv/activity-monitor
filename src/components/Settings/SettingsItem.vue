<template>
  <q-item tag="label">
    <q-item-section>
      <q-item-label :lines="3">
        <span
          class="color-marker"
          :style="{ 'background-color': `${color}` }"
        ></span>
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
        <q-btn size="16px" color="info" flat dense round icon="edit" />
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
import { useSettingsStore } from "../../stores/settings";
import { ref } from "vue";
import { useQuasar } from "quasar";

export default {
  props: {
    title: { type: String, required: true },
    active: { type: Boolean, required: true },
    type: { type: String, required: true },
    color: { type: String, required: true },
    id: { type: Number, required: true },
  },

  setup(props) {
    const $q = useQuasar();
    const storeSettings = useSettingsStore();

    const isActive = ref(props.active);

    const changeActiveProperty = () => {
      const newItem = {
        id: props.id,
        title: props.title,
        type: props.type,
        active: !props.active,
        color: props.color,
      };
      storeSettings.updateSettingsItem(newItem);
    };

    const promtToDelete = () => {
      $q.dialog({
        title: "Confirm",
        message:
          "Do you really want to delete this item? All these daily activities will be deleted from the calendar",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        storeSettings.deleteSettingsItem(props.id);
      });
    };

    return {
      storeSettings,
      changeActiveProperty,
      isActive,
      promtToDelete,
    };
  },
};
</script>

<style scoped>
.color-marker {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-right: 5px;
  margin-top: 4px;
}
</style>
