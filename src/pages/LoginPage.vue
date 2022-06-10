<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md form-wrapper">
      <q-form @submit="submitForm" greedy>
        <q-card>
          <q-card-section>
            <div class="row q-mb-sm">
              <q-input
                outlined
                v-model="login"
                label="Login (e-mail)"
                class="form__field"
                :rules="[
                  (val) => !!val || 'Email is missing',
                  (val) => isValidEmail(val),
                ]"
                lazy-rules
              />
            </div>
            <div class="row">
              <q-input
                outlined
                v-model="password"
                label="Password"
                class="form__field"
                type="password"
                :rules="[(val) => isValidPassword(val)]"
                lazy-rules
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="secondary" label="Login" type="submit" />
          </q-card-actions>
          <q-card-section>
            <router-link
              class="text-subtitle1 text-accent text-weight-bold"
              to="/login/registration"
              >Register</router-link
            >
          </q-card-section>
        </q-card>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { isValidEmail, isValidPassword } from "../utils/index";
import { useSettingsStore } from "stores/settings";

const storeSettings = useSettingsStore();
const login = ref("");
const password = ref("");

const submitForm = () => {
  const form = {
    login: login.value,
    password: password.value,
  };
  console.log(form);
};
</script>

<style scoped>
.form-wrapper {
  min-width: 350px;
}

.form__field {
  width: 100%;
}
</style>
