<template>
  <div class="text-subtitle2">Mood</div>
  <div class="mood-list">
    <q-radio
      v-for="emoji in emojiMap"
      :key="emoji[0]"
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      :checked-icon="emoji[1]"
      :unchecked-icon="emoji[1]"
      :val="emoji[0]"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { emojiMap } from "src/utils";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const mood = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit("update:modelValue", val);
  },
});
</script>

<style scoped>
.mood-list {
  list-style: none;
  font-size: 40px;
  display: flex;
  justify-content: space-around;
  margin: 10px 0 0 0;
}

.mood-icon {
  color: #ccc;
}

.mood-icon:hover {
  color: #de6816;
}
</style>
