import { defineStore } from "pinia";
import { uid, Loading, QSpinnerHourglass, date } from "quasar";
import { api } from "boot/axios";
import { showError } from "../utils";

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
          "/api/registration/",
          JSON.stringify(user)
        );
        if (response.data.errors) {
          throw new Error(response.data.errors);
        }
        Loading.hide();
        this.router.push("/login");
      } catch (error) {
        showError("Error of registration", error);
        Loading.hide();
      }
    },

    async login(user) {
      Loading.show(loaderConfig);

      try {
        const response = await api.post("/api/login/", JSON.stringify(user));
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
        this.router.push("/calendar");
      } catch (error) {
        showError("Error of authorization", error);
        Loading.hide();
      }
    },

    logout() {
      this.user = {};
      this.authanticated = false;
      api.defaults.headers.common["Authorization"] = "";
      localStorage.clear();
    },
  },
});
