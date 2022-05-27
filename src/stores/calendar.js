import { defineStore } from "pinia";
import { uid, Loading, QSpinnerHourglass } from "quasar";
import { api } from "boot/axios";
import { showError, formatedToday, deepCopyFunction } from "../utils";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    reports: [],
    id: "uniqueId",
    date: formatedToday(),
    activities: [],
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
    async setReportActivities(date) {
      this.activities = [];
      const report = this.reports.find((item) => item.date === date);
      if (report.id) {
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
    updateReport(report) {
      this.id = report.id;
      this.note = report.note;
      this.activities = deepCopyFunction(report.activities);
      console.log(report);
    },
    deleteReport(id) {
      this.id = "";
      this.note = "";
      this.activities = [];
      console.log(report);
    },
    addReport(report) {
      this.id = uid();
      this.note = report.note;
      this.activities = deepCopyFunction(report.activities);
      this.dates.push(this.date);
      console.log(report);
    },
  },
});
