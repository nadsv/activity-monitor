import { defineStore } from "pinia";
import { Loading, QSpinnerHourglass } from "quasar";
import { api } from "boot/axios";
import { showError, formatedToday, calcDate } from "../utils";
import { useAuthStore } from "./auth";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

export const useChartStore = defineStore("charts", {
  state: () => ({
    allSeries: [],
    period: {
      type: "week",
      start: calcDate({ days: -7 }),
      end: formatedToday(),
    },
    periods: ["week", "month", "year", "2 years", "period"],
    chartOptions: {
      chart: {
        height: 450,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        animations: {
          enabled: false,
        },
        dynamicAnimation: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: true,
      },
      title: {
        text: "Activity Chart",
        align: "left",
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Min",
        },
      },
      legend: {
        show: false,
      },
    },
  }),
  getters: {},
  actions: {
    setPeriod(period) {
      this.period = period;
    },
    setEndDates(typeOfPeriod) {
      let diff = {};
      switch (typeOfPeriod) {
        case "week":
          diff = { days: -7 };
          break;
        case "month":
          diff = { month: -1 };
          break;
        case "year":
          diff = { year: -1 };
          break;
        case "2 years":
          diff = { year: -2 };
          break;
        default:
          diff = { days: 0 };
          break;
      }
      this.period.start = calcDate(diff);
    },
    resetSeries() {
      this.allSeries = [];
    },
    async setSeries(payload) {
      this.allSeries = [];
      Loading.show(loaderConfig);
      try {
        const authStore = useAuthStore();
        const response = await api.get("/api/chart/", {
          params: {
            start: payload.start,
            end: payload.end,
            userId: authStore.user.id,
          },
        });
        let allSeries = [];
        for (let chart of response.data) {
          let item = {};
          item["id"] = chart.id;
          item["name"] = chart.title;
          item["color"] = chart.color;
          item["unit"] = chart.type;
          item["show"] = true;
          let data = [];
          for (let value in chart.values) {
            data.push({ x: value, y: chart.values[value] });
          }
          item["data"] = data;
          allSeries.push(item);
        }
        this.allSeries = allSeries;
        Loading.hide();
      } catch (error) {
        showError("Error of receiving data", error);
        Loading.hide();
      }
    },
  },
});
