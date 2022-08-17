<template>
  <q-card class="mood-card">
    <div class="mood-list">
      <q-radio
        v-model="shape"
        size="lg"
        color="secondary"
        checked-icon="fas fa-face-angry"
        unchecked-icon="fas fa-face-angry"
        val="1"
      />
      <q-radio
        v-model="shape"
        size="lg"
        color="secondary"
        checked-icon="fas fa-face-sad-cry"
        unchecked-icon="fas fa-face-sad-cry"
        val="2"
      />
      <q-radio
        v-model="shape"
        size="lg"
        color="secondary"
        checked-icon="fas fa-face-frown"
        unchecked-icon="fas fa-face-frown"
        val="3"
      />
      <q-radio
        v-model="shape"
        size="lg"
        color="secondary"
        checked-icon="fas fa-face-meh"
        unchecked-icon="fas fa-face-meh"
        val="4"
      />
      <q-radio
        v-model="shape"
        size="lg"
        color="secondary"
        checked-icon="fas fa-face-smile"
        unchecked-icon="fas fa-face-smile"
        val="5"
      />
      <q-radio
        v-model="shape"
        size="lg"
        color="secondary"
        checked-icon="fas fa-face-grin-beam"
        unchecked-icon="fas fa-face-grin-beam"
        val="6"
      />
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
let shape = ref("line");
</script>

<style scoped>
.mood-list {
  width: 350px;
  list-style: none;
  font-size: 40px;
  display: flex;
  justify-content: center;
  padding: 5px 20px 5px 20px;
  margin: 0;
}

.mood-icon {
  color: #ccc;
}

.mood-icon:hover {
  color: #de6816;
}
</style>
