import { defineStore } from "pinia";

export const useCalendarStore = defineStore("calendar", {
  state: () => ({
    date: "2021-04-29",
    report: {
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
          title: "Программирование и конструирование",
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
          active: false,
          type: "quantity",
          color: "black",
          value: 1,
        },
      ],
      note: "It was a wonderful day. I want to remember about it till the end of my life.",
    },
  }),
  getters: {
    dayActivities(state) {
      return state.report.activities;
    },
  },
  actions: {
    updateActivityItem(payload) {
      /*/ const index = this.activities.findIndex((x) => x.id === payload.id);
      this.activities[index] = payload;*/
    },
    deleteActivityItem(id) {
      //this.activities = this.activities.filter((item) => item.id !== id);
    },
    addActivityItem(payload) {
      /*const itemId = uid();
      const item = { ...payload, id: itemId };
      this.activities.unshift(item);*/
    },
  },
});
