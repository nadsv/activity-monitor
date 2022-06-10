<template>
  <q-layout>
    <AppHeader />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import AppHeader from "../components/AppHeader.vue";
</script>

<style scoped>
</style>
