<template>
  <div>
    <q-list padding separator>
      <q-item-label header class="text-uppercase">Activities</q-item-label>

      <q-item v-for="item in filteredList" :key="item.id">
        <q-item-section avatar>
          <ActivityMark :color="item.color" />
        </q-item-section>
        <q-item-section>
          <q-item-label :lines="3">
            {{ item.title }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="item.show" color="positive" left-label />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ActivityMark from "../ActivityMark.vue";

const list = ref([]);

const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
  onlyActive: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["changeShownGraphs"]);

let filteredList = computed(() => {
  if (!props.onlyActive) return props.list;
  return props.list.filter((item) => item.active);
});

onMounted(() => {
  list.value = props.list;
});
</script>

<style  scoped>
.q-toggle__inner--truthy {
  color: inherit !important;
}

.q-field--with-bottom {
  padding-bottom: 0;
}
</style>
