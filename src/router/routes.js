const routes = [
  {
    path: "/login",
    component: () => import("layouts/LoginLayout.vue"),
    meta: {
      middleware: "guest",
    },
    children: [
      { path: "", component: () => import("pages/LoginPage.vue") },
      {
        path: "registration",
        component: () => import("pages/RegistrationPage.vue"),
        meta: {
          middleware: "guest",
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    meta: {
      middleware: "auth",
    },
    children: [
      { path: "", redirect: "/calendar" },
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
