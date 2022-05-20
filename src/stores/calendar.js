import { defineStore } from "pinia";
import { uid, Loading, QSpinnerHourglass } from "quasar";
import { api } from "boot/axios";
import { showError, formatedToday, deepCopyFunction } from "../utils";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    dates: ["2022/05/01", "2022/05/02", "2022/05/04"],
    reports: [],
    id: "uniqueId",
    date: formatedToday(),
    activities: [
      {
        id: "1",
        userId: "0",
        title: "Чтение",
        type: "time",
        color: "#5da356",
        value: 50,
      },
      {
        id: "2",
        userId: "0",
        title: "Программирование и конструирование моделей будущего",
        type: "time",
        color: "#cf0e0e",
        value: 40,
      },
      {
        id: "3",
        userId: "0",
        title: "Фитнес",
        type: "time",
        color: "#00ab3c",
        value: 120,
      },
      {
        id: "4",
        userId: "0",
        title: "Английский",
        type: "time",
        color: "orange",
        value: 0,
      },
      {
        id: "5",
        userId: "0",
        title: "Испанский",
        type: "time",
        color: "yellow",
        value: 0,
      },
      {
        id: "6",
        userId: "0",
        title: "Тщательная чистка чайного гриба",
        type: "quantity",
        color: "black",
        value: 1,
      },
    ],
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
    async getReports(payload) {
      Loading.show(loaderConfig);
      try {
        const response = await api.get("/api/report", {
          params: {
            year: payload.year,
            month: payload.month,
          },
        });
        this.reports = response.data.map((report) => ({
          ...report,
          date: report.date.replace("-", "/"),
        }));
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
