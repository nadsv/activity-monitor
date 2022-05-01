<template>
  <span class="color-marker" :style="{ 'background-color': `${color}` }"></span>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.color-marker {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
}
</style>
