<template>
  <div class="notes">
    <q-card
      class="note bg-grey-9 my-card"
      v-for="note in notesStore.formatedNotes"
      :key="note.id"
      dark
      bordered
    >
      <q-card-section>
        <div class="text-subtitle2">
          <q-icon :name="emoji(note.mood)" size="1.4em" color="secondary" />
          {{ note.date }}
        </div>
        <div class="text-body2" v-html="note.note"></div>
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
import { ref } from "vue";
import { useNotesStore } from "src/stores/notes";
import { useChartStore } from "src/stores/charts";
import { emojiMap } from "src/utils";

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

const emoji = (mood) => {
  return emojiMap.get(mood.toString());
};
</script>

<style scoped>
.notes {
  min-width: 250px;
  max-width: 600px;
}

.note {
  margin-bottom: 15px;
}
</style>
