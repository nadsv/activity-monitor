import { defineStore } from "pinia";
import { uid, Loading, QSpinnerHourglass } from "quasar";
import { api } from "boot/axios";
import { showError } from "../utils";
import { useCalendarStore } from "./calendar";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    activities: [],
  }),
  getters: {},
  actions: {
    async setActivities(userId) {
      Loading.show(loaderConfig);
      try {
        const response = await api.get("/api/settings", {
          params: {
            userId,
          },
        });
        this.activities = response.data.map((item) => ({
          ...item,
          active: item.active === 1 ? true : false,
        }));
        Loading.hide();
      } catch (error) {
        showError("Error of receiving data", error);
        Loading.hide();
      }
    },

    async updateActivityItem(payload) {
      Loading.show(loaderConfig);
      try {
        const response = await api.put(
          "/api/settings/" + payload.id,
          JSON.stringify(payload)
        );
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        const index = this.activities.findIndex((x) => x.id === payload.id);
        this.activities[index] = payload;
        const calendarStore = useCalendarStore();
        calendarStore.setReportActivities(calendarStore.date);
        Loading.hide();
      } catch (error) {
        showError("Error of updating data", error);
        Loading.hide();
      }
    },

    async deleteActivityItem(id) {
      Loading.show(loaderConfig);
      try {
        const response = await api.delete("/api/settings/" + id);
        this.activities = this.activities.filter((item) => item.id !== id);
        Loading.hide();
      } catch (error) {
        showError("Error of deleting data", error);
        Loading.hide();
      }
    },

    async addActivityItem(payload) {
      Loading.show(loaderConfig);
      const itemId = uid();
      const item = { ...payload, id: itemId };
      try {
        const response = await api.post("/api/settings", JSON.stringify(item));
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        this.activities.unshift(item);
        const calendarStore = useCalendarStore();
        calendarStore.setReportActivities(calendarStore.date);
        Loading.hide();
      } catch (error) {
        showError("Error of saving data", error);
        Loading.hide();
      }
    },
  },
});
