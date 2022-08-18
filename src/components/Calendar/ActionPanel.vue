<template>
  <q-card class="actions">
    <q-card-actions align="right">
      <q-btn color="negative" type="button" @click="clearForm">Clear</q-btn>
      <q-btn color="secondary" type="submit" :disabled="!isValid">Save</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const isValid = ref(true);

const clearForm = () => {
  console.log("Clear Form");
};
</script>

<style scoped>
.actions {
  width: 290px;
}
</style>
