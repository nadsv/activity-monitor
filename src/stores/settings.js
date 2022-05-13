import { defineStore } from "pinia";
import { uid } from "quasar";
import { api } from "boot/axios";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    activities: [],
  }),
  getters: {},
  actions: {
    async setActivities() {
      this.activities = api.get("/api/settings");
      try {
        const response = await api.get("/api/settings");
        this.activities = response.data;
      } catch (error) {
        throw new Error(`Error`);
      }
    },
    updateActivityItem(payload) {
      const index = this.activities.findIndex((x) => x.id === payload.id);
      this.activities[index] = payload;
    },
    deleteActivityItem(id) {
      this.activities = this.activities.filter((item) => item.id !== id);
    },
    addActivityItem(payload) {
      const itemId = uid();
      const item = { ...payload, id: itemId };
      this.activities.unshift(item);
    },
  },
});
