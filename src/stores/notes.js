import { defineStore } from "pinia";
import { uid, Loading, QSpinnerHourglass } from "quasar";
import { api } from "boot/axios";
import { showError } from "../utils";
import { useAuthStore } from "./auth";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

export const useNotesStore = defineStore("notes", {
  state: () => ({
    notes: [],
    nextPage: 1,
    currentPage: 0,
  }),
  getters: {
    formatedNotes(state) {
      return state.notes.map((item) => ({
        ...item,
        note: item.note.replaceAll("\n", "<br/>"),
      }));
    },
  },
  actions: {
    resetNotes() {
      this.notes = [];
      this.nextPage = 1;
      this.currentPage = 0;
    },
    async getNotes(payload) {
      if (this.nextPage === null) return;
      const authStore = useAuthStore();
      this.allSeries = [];
      Loading.show(loaderConfig);
      try {
        const authStore = useAuthStore();
        const response = await api.get("/api/notes", {
          params: {
            start: payload.start,
            end: payload.end,
            userId: authStore.user.id,
            page: this.currentPage + 1,
          },
        });
        this.notes = [...this.notes, ...response.data.data];
        this.nextPage = response.data.next_page_url;
        this.currentPage = response.data.current_page;
        Loading.hide();
      } catch (error) {
        showError("Error of receiving data", error);
        Loading.hide();
      }
    },
  },
});
