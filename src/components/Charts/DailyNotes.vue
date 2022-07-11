<template>
  <div class="notes">
    <q-card
      class="note bg-grey-9 my-card"
      v-for="note in notesStore.notes"
      :key="note.id"
      dark
      bordered
    >
      <q-card-section>
        <div class="text-h6">{{ note.date }}</div>
      </q-card-section>
      <q-separator inset dark />
      <q-card-section>
        <pre>{{ note.note }}</pre>
      </q-card-section>
    </q-card>
    <div class="row fit items-start justify-center">
      <q-btn
        color="secondary"
        size="md"
        padding="xs lg"
        round
        label="Load more"
        v-if="notesStore.nextPage"
        @click="getNextPage"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useNotesStore } from "src/stores/notes";
import { useChartStore } from "src/stores/charts";

const notes = ref([]);

const notesStore = useNotesStore();
const chartStore = useChartStore();

const getNextPage = () => {
  const payload = {
    start: chartStore.period.start,
    end: chartStore.period.end,
  };
  notesStore.getNotes(payload);
};
</script>

<style  scoped>
.notes {
  min-width: 250px;
  max-width: 600px;
}

.note {
  margin-bottom: 15px;
}
</style>
