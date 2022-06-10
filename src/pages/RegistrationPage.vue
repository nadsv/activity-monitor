<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md form-wrapper">
      <q-form @submit="submitForm" autofocus greedy>
        <q-card>
          <q-card-section>
            <div class="row q-mb-sm">
              <q-input
                outlined
                v-model="name"
                label="Name"
                class="form__field"
                :rules="[
                  (val) =>
                    val.length > 3 || 'Name must be longer than 3 charachters',
                ]"
                lazy-rules
              />
            </div>
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
            <div class="row q-mb-sm">
              <q-input
                outlined
                v-model="password"
                label="Password"
                class="form__field"
                type="password"
                :rules="[(val) => isValidConfirmation(val)]"
                lazy-rules
              />
            </div>
            <div class="row">
              <q-input
                outlined
                v-model="confirm"
                label="Confirm Password"
                class="form__field"
                type="password"
                :rules="[(val) => isValidPassword(val)]"
                lazy-rules
              />
            </div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn color="secondary" label="Register" type="submit" />
          </q-card-actions>
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
const name = ref("");
const login = ref("");
const confirm = ref("");
const password = ref("");

const isValidConfirmation = (value) => {
  return value === login.value || "Passwords don't match";
};

const submitForm = () => {
  const form = {
    name: name.value,
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
