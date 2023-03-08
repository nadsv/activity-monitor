<template>
  <div class="text-subtitle2">Mood</div>
  <div class="mood-list">
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-angry"
      unchecked-icon="fas fa-face-angry"
      val="1"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-sad-cry"
      unchecked-icon="fas fa-face-sad-cry"
      val="2"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-frown"
      unchecked-icon="fas fa-face-frown"
      val="3"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-meh"
      unchecked-icon="fas fa-face-meh"
      val="4"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-smile"
      unchecked-icon="fas fa-face-smile"
      val="5"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-grin-beam"
      unchecked-icon="fas fa-face-grin-beam"
      val="6"
    />
  </div>
</template>

<script setup>
import { computed } from "vue";
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
