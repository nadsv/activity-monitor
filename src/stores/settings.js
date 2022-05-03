import { defineStore } from "pinia";
import { uid } from "quasar";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    activities: [
      {
        id: "1",
        userId: "0",
        title: "Чтение",
        active: true,
        type: "time",
        color: "#5da356",
      },
      {
        id: "2",
        userId: "0",
        title: "Программирование и конструирование",
        active: true,
        type: "time",
        color: "#cf0e0e",
      },
      {
        id: "3",
        userId: "0",
        title: "Фитнес",
        active: true,
        type: "time",
        color: "#00ab3c",
      },
      {
        id: "4",
        userId: "0",
        title: "Английский",
        active: true,
        type: "time",
        color: "orange",
      },
      {
        id: "5",
        userId: "0",
        title: "Испанский",
        active: false,
        type: "time",
        color: "yellow",
      },
      {
        id: "6",
        userId: "0",
        title: "Тщательная чистка чайного гриба",
        active: false,
        type: "quantity",
        color: "black",
      },
    ],
  }),
  getters: {
    pattern(state) {
      let dailyPattern = [];
      for (const activity of state.activities) {
        if (activity.active) {
          dailyPattern.push({ ...activity, value: 0 });
        }
      }
      return dailyPattern;
    },
  },
  actions: {
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
