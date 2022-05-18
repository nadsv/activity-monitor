import { defineStore } from "pinia";
import { uid } from "quasar";
import { api } from "boot/axios";
import { showError } from "../utils";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    activities: [],
  }),
  getters: {},
  actions: {
    async setActivities() {
      try {
        const response = await api.get("/api/settings");
        this.activities = response.data.map((item) => ({
          ...item,
          active: item.active === 1 ? true : false,
        }));
      } catch (error) {
        showError("Error of receiving data", error);
      }
    },

    async updateActivityItem(payload) {
      try {
        const response = await api.put(
          "/api/settings/" + payload.id,
          JSON.stringify(payload)
        );
        const index = this.activities.findIndex((x) => x.id === payload.id);
        this.activities[index] = payload;
      } catch (error) {
        showError("Error of updating data", error);
      }
    },

    async deleteActivityItem(id) {
      try {
        const response = await api.delete("/api/settings/" + id);
        this.activities = this.activities.filter((item) => item.id !== id);
      } catch (error) {
        showError("Error of deleting data", error);
      }
    },

    async addActivityItem(payload) {
      const itemId = uid();
      const item = { ...payload, id: itemId };
      try {
        const response = await api.post("/api/settings", JSON.stringify(item));
        this.activities.unshift(item);
      } catch (error) {
        showError("Error of saving data", error);
      }
    },
  },
});
