const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      {
        path: "registration",
        component: () => import("pages/RegistrationPage.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "calendar", component: () => import("pages/CalendarPage.vue") },
      { path: "settings", component: () => import("pages/SettingsPage.vue") },
      { path: "charts", component: () => import("pages/ChartsPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
