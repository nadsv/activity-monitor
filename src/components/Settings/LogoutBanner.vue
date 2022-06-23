<template>
  <q-banner inline-actions rounded class="bg-info text-white">
    <template v-slot:avatar>
      <q-icon name="logout" />
    </template>
    Logout from your session

    <template v-slot:action>
      <q-btn flat label="ОК" @click="logout" />
    </template>
  </q-banner>
</template>

<script setup>
import { useAuthStore } from "src/stores/auth";

const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
};
</script>

<style scoped>
</style>
