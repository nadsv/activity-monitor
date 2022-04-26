<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          <q-avatar>
            <img src="~assets/logo.svg" />
          </q-avatar>
          Activity Monitor
        </q-toolbar-title>

        <div>Log in</div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above :width="200" class="bg-secondary text-dark">
      <q-list>
        <EssentialLink v-for="link in links" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
      <q-tabs
        narrow-indicator
        dense
        align="center"
        class="bg-secondary text-white"
      >
        <q-route-tab
          v-for="link in links"
          :key="link.title"
          :ripple="false"
          :icon="link.icon"
          :label="link.title"
          :to="link.to"
        />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Calender",
    icon: "event_available",
    to: "calendar",
  },
  {
    title: "Charts",
    icon: "insights",
    to: "charts",
  },
  {
    title: "Settings",
    icon: "settings",
    to: "settings",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    return {
      links: linksList,
    };
  },
});
</script>

<style>
@media screen and (min-width: 1007px) {
  .q-footer {
    display: none;
  }

  .q-drawer .q-router-link--active {
    font-weight: 500;
    color: white;
  }
}
</style>
