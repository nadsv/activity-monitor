import { defineStore } from "pinia";
import { formatedToday, deepCopyFunction } from "src/utils";
import { uid } from "quasar";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    dates: ["2022/05/01", "2022/05/02", "2022/05/04"],
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
    note: "It was a wonderful day. I want to remember about it till the end of my life.",
  }),
  getters: {
    reportActivities(state) {
      return deepCopyFunction(state.activities);
    },
  },
  actions: {
    setDate(date) {
      this.date = date;
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
