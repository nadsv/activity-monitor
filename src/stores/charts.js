import { defineStore } from "pinia";
import { date, Loading, QSpinnerHourglass } from "quasar";
import { api } from "boot/axios";
import { showError, formatedToday, deepCopyFunction } from "../utils";
import { useSettingsStore } from "./settings";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

const settingsStore = useSettingsStore();

export const useChartStore = defineStore("charts", {
  state: () => ({
    allSeries: [],
    series: [],
    show: [],
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
      },
      colors: ["#F2C037", "#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
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
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -15,
        offsetX: -5,
      },
    },
  }),
  getters: {
    charts(state) {
      return deepCopyFunction(state.activities);
    },
  },
  actions: {
    initVisibleActivities(ids) {
      this.series = this.allSeries.filter((item) => ids.includes(item.id));
      this.chartOptions.colors = this.series.map((item) => item.color);
    },

    async setSeries(payload) {
      this.allSeries = [];
      this.series = [];
      Loading.show(loaderConfig);
      try {
        const response = await api.get("/api/chart/", {
          params: {
            start: payload.start,
            end: payload.end,
          },
        });
        let allSeries = [];
        for (let chart of response.data) {
          let item = {};
          item["id"] = chart.id;
          item["name"] = chart.title;
          item["color"] = chart.color;
          let data = [];
          for (let value in chart.values) {
            data.push({ x: value, y: chart.values[value] });
          }
          item["data"] = data;
          allSeries.push(item);
        }
        this.allSeries = allSeries;
        const ids = settingsStore.activities
          .filter((item) => item.active)
          .map((item) => item.id);
        this.initVisibleActivities(ids);
        Loading.hide();
      } catch (error) {
        showError("Error of receiving data", error);
        Loading.hide();
      }
    },
  },
});
