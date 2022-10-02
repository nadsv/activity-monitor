<template>
  <div>
    <div class="text-subtitle2">Note</div>
    <q-input
      :value="text"
      @blur="changeNote($event.target.value)"
      filled
      autogrow
      type="textarea"
      bottom-slots
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const text = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    text.value = val;
  },
});

const changeNote = (value) => {
  emit("update:modelValue", value);
};
</script>

<style scoped></style>
