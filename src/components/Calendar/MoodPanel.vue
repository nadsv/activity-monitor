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
      @click="changeMood('1')"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-sad-cry"
      unchecked-icon="fas fa-face-sad-cry"
      val="2"
      @click="changeMood('2')"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-frown"
      unchecked-icon="fas fa-face-frown"
      val="3"
      @click="changeMood('3')"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-meh"
      unchecked-icon="fas fa-face-meh"
      val="4"
      @click="changeMood('4')"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-smile"
      unchecked-icon="fas fa-face-smile"
      val="5"
      @click="changeMood('5')"
    />
    <q-radio
      v-model="mood"
      size="xl"
      dense
      color="secondary"
      checked-icon="fas fa-face-grin-beam"
      unchecked-icon="fas fa-face-grin-beam"
      val="6"
      @click="changeMood('6')"
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

const mood = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

const changeMood = (value) => {
  emit("update:modelValue", value);
};
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
