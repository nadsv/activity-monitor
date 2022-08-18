<template>
  <div>
    <div class="text-subtitle2">Note</div>
    <q-input
      v-model="text"
      @blur="changeNote($event.target.value)"
      filled
      autogrow
      type="textarea"
      bottom-slots
      lazy-rules
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const text = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const changeNote = (value) => {
  console.log(value);
  emit("update:modelValue", value);
};
</script>

<style scoped></style>
