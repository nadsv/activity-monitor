import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
  state: () => ({
    activities: [
      {
        id: 1,
        userId: 1,
        title: "Чтение",
        active: true,
        type: "time",
        color: "red",
      },
      {
        id: 2,
        userId: 1,
        title: "Программирование и конструирование",
        active: true,
        type: "time",
        color: "blue",
      },
      {
        id: 3,
        userId: 1,
        title: "Фитнес",
        active: true,
        type: "time",
        color: "#00ab3c",
      },
      {
        id: 4,
        userId: 1,
        title: "Английский",
        active: true,
        type: "time",
        color: "orange",
      },
      {
        id: 5,
        userId: 1,
        title: "Испанский",
        active: false,
        type: "time",
        color: "yellow",
      },
      {
        id: 6,
        userId: 1,
        title: "Тщательная чистка чайного гриба",
        active: false,
        type: "quantity",
        color: "black",
      },
    ],
  }),
  getters: {},
  actions: {
    updateSettingsItem(payload) {
      const index = this.activities.findIndex((x) => x.id === payload.id);
      this.activities[index] = payload;
    },
    deleteSettingsItem(id) {
      this.activities = this.activities.filter((item) => item.id !== id);
    },
    addSettingsItem(payload) {
      this.activities.unshift(payload);
    },
  },
});
