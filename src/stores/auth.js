import { defineStore } from "pinia";
import { uid, Loading, QSpinnerHourglass, date } from "quasar";
import { api } from "boot/axios";
import { showError, showMessage } from "../utils";
import { useSettingsStore } from "./settings";
import { useCalendarStore } from "./calendar";
import { useNotesStore } from "./notes";
import { useChartStore } from "./charts";

const loaderConfig = {
  spinner: QSpinnerHourglass,
};

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authanticated: false,
    user: {},
    token: "",
  }),
  getters: {},
  actions: {
    async register(payload) {
      const user = {
        ...payload,
        id: uid(),
      };

      Loading.show(loaderConfig);

      try {
        const response = await api.post(
          "/api/registration",
          JSON.stringify(user)
        );
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        Loading.hide();
        showMessage("Successful registration. Please login");
        this.router.push("/login");
      } catch (error) {
        showError("Error of registration", error);
        Loading.hide();
      }
    },

    async login(user) {
      Loading.show(loaderConfig);

      try {
        const response = await api.post("/api/login", JSON.stringify(user));
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        this.user = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        };
        this.token =
          response.data.token_type + " " + response.data.access_token;
        api.defaults.headers.common["Authorization"] = this.token;
        this.authanticated = true;
        localStorage.setItem("token", this.token);
        localStorage.setItem("userId", this.user.id);
        localStorage.setItem(
          "expiredTime",
          new Date().getTime() + 30 * 60 * 1000
        );
        Loading.hide();
        const settingsStore = useSettingsStore();
        await settingsStore.setActivities(this.user.id);

        const calendarStore = useCalendarStore();
        calendarStore.resetReports();

        await calendarStore.getReports({
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          userId: this.user.id,
        });

        //await calendarStore.setReportActivities(calendarStore.date);

        const notesStore = useNotesStore();
        notesStore.resetNotes();

        const chartsStore = useChartStore();
        chartsStore.resetSeries();

        this.router.push("/calendar");
      } catch (error) {
        showError("Error of authorization", error);
        Loading.hide();
      }
    },

    async logout() {
      Loading.show(loaderConfig);
      try {
        const response = await api.delete("/api/logout/" + this.user.id);
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        this.resetUser();
        Loading.hide();
      } catch (error) {
        showError("Error of logging out", error);
        Loading.hide();
      }
    },

    async setUser() {
      if (
        !!localStorage.getItem("userId") &&
        !!localStorage.getItem("token") &&
        !!localStorage.getItem("expiredTime")
      ) {
        const notExpired =
          +localStorage.getItem("expiredTime") - new Date().getTime() > 0;
        if (notExpired) {
          Loading.show(loaderConfig);

          try {
            api.defaults.headers.common["Authorization"] =
              localStorage.getItem("token");
            const response = await api.get("/api/user/");
            if (response.data.errors) {
              throw new Error(response.data.errors);
            }
            this.authanticated = true;
            this.user = {
              id: response.data.id,
              name: response.data.name,
              email: response.data.email,
            };
            this.token = localStorage.getItem("token");
            const settingsStore = useSettingsStore();
            await settingsStore.setActivities(this.user.id);

            const calendarStore = useCalendarStore();
            await calendarStore.getReports({
              month: new Date().getMonth() + 1,
              year: new Date().getFullYear(),
              userId: this.user.id,
            });

            await calendarStore.setReportActivities(calendarStore.date);
            Loading.hide();
          } catch (error) {
            this.resetUser();
            showError("Error of registration", error);
            Loading.hide();
          }
          return;
        }
        this.resetUser();
      }
    },

    resetUser() {
      this.user = {};
      this.authanticated = false;
      api.defaults.headers.common["Authorization"] = "";
      localStorage.clear();
      this.router.push("/login");
    },
  },
});
