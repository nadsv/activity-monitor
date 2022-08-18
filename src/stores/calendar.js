import { defineStore } from "pinia";
import { uid, Loading, QSpinnerHourglass } from "quasar";
import { api } from "boot/axios";
import { showError, formatedToday, deepCopyFunction } from "../utils";
import { useSettingsStore } from "./settings";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    reports: [],
    id: "0",
    date: formatedToday(),
    activities: [],
    mood: "3",
    note: "",
  }),
  getters: {
    reportActivities(state) {
      return deepCopyFunction(state.activities);
    },
    datesInMonth(state) {
      return state.reports.map((report) => report.date);
    },
  },
  actions: {
    setDate(date) {
      this.date = date;
    },

    setReportId(id) {
      this.id = id;
    },

    resetReports() {
      this.reports = [];
    },

    async setReportActivities(date) {
      const report = this.reports.find((item) => item.date === date);
      if (!!report) {
        Loading.show(loaderConfig);
        try {
          const response = await api.get("/api/report/" + report.id);
          this.activities = response.data;
          this.note = report.note;
          this.id = report.id;
          Loading.hide();
        } catch (error) {
          showError("Error of receiving data", error);
          Loading.hide();
        }
      } else {
        const settingsStore = useSettingsStore();
        this.activities = [];
        for (const activity of settingsStore.activities) {
          if (activity.active) {
            this.activities.push({ ...activity, value: 0 });
          }
        }
        this.note = "";
        this.id = 0;
        Loading.hide();
      }
    },

    async getReports(payload) {
      const loaded = this.reports.some((item) => {
        const itemDate = new Date(item.date);
        return (
          itemDate.getMonth() + 1 == payload.month &&
          itemDate.getFullYear() == payload.year
        );
      });

      if (loaded) return;

      Loading.show(loaderConfig);

      try {
        const response = await api.get("/api/report", {
          params: {
            year: payload.year,
            month: payload.month,
            userId: payload.userId,
          },
        });
        const newReports = response.data.map((report) => ({
          ...report,
          date: report.date.replace("-", "/"),
        }));
        this.reports = [...this.reports, ...newReports];
        Loading.hide();
      } catch (error) {
        showError("Error of receiving data", error);
        Loading.hide();
      }
    },

    async updateReport(report) {
      this.note = report.note;
      this.activities = deepCopyFunction(report.activities);
      Loading.show(loaderConfig);

      const payload = {
        id: this.id,
        note: this.note,
        date: this.date,
        userId: report.userId,
        activities: this.activities.map((item) => ({
          id: uid(),
          reportId: this.id,
          settingsId: item.id || item.settingsId,
          value: item.value,
        })),
      };

      Loading.show(loaderConfig);

      try {
        const response = await api.put(
          "/api/report/" + this.id,
          JSON.stringify(payload)
        );
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        this.reports = this.reports.map((item) =>
          item.id === this.id
            ? { id: this.id, date: this.date, note: this.note }
            : item
        );
        Loading.hide();
      } catch (error) {
        showError("Error of editing data", error);
        Loading.hide();
      }
    },

    async deleteReport() {
      Loading.show(loaderConfig);

      try {
        const response = await api.delete("/api/report/" + this.id);
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        this.note = "";
        this.activities = this.activities.map((item) => ({
          ...item,
          value: 0,
        }));
        this.reports = this.reports.filter((item) => item.id !== this.id);
        Loading.hide();
      } catch (error) {
        showError("Error of editing data", error);
        Loading.hide();
      }
    },

    async addReport(report) {
      this.id = uid();
      this.note = report.note;
      this.activities = deepCopyFunction(report.activities);
      Loading.show(loaderConfig);

      const payload = {
        id: this.id,
        note: this.note,
        date: this.date,
        userId: report.userId,
        activities: this.activities.map((item) => ({
          id: uid(),
          reportId: this.id,
          settingsId: item.id || item.settingsId,
          value: item.value,
        })),
      };

      try {
        const response = await api.post("/api/report", JSON.stringify(payload));
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        this.reports = [
          ...this.reports,
          { id: this.id, date: this.date, note: this.note },
        ];
        Loading.hide();
      } catch (error) {
        showError("Error of saving data", error);
        Loading.hide();
      }
    },
  },
});
