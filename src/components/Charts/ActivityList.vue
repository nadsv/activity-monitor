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
          <q-toggle
            v-model="item.show"
            color="positive"
            left-label
            @update:model-value="onChange()"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import ActivityMark from "../ActivityMark.vue";
import { useChartStore } from "src/stores/charts";

const list = ref([]);

const chartStore = useChartStore();

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

let filteredList = computed(() => {
  if (!props.onlyActive)
    return list.value.map((item) => {
      item.show = item.active ? item.show : false;
      return item;
    });
  return list.value.filter((item) => item.active);
});

onMounted(() => {
  list.value = props.list;
});

const onChange = () => {
  const ids = list.value.filter((item) => item.show).map((item) => item.id);
  chartStore.initVisibleActivities(ids);
};
</script>

<style  scoped>
.q-toggle__inner--truthy {
  color: inherit !important;
}

.q-field--with-bottom {
  padding-bottom: 0;
}
</style>
