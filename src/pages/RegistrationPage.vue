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
                v-model="email"
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
                :rules="[(val) => isValidPassword(val)]"
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
                :rules="[(val) => isValidConfirmation(val)]"
                lazy-rules
              />
            </div>
            <div class="row password-info text-info">
              Password must contain at least one lowcase letter, one uppercase
              letter, one number and be longer than 8 charachers and less than
              32 characters
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
import { useAuthStore } from "stores/auth";

const authStore = useAuthStore();
const name = ref("");
const email = ref("");
const confirm = ref("");
const password = ref("");

const isValidConfirmation = (value) => {
  return value === password.value || "Passwords don't match";
};

const submitForm = () => {
  authStore.logout();
  const form = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
  authStore.register(form);
};
</script>

<style scoped>
.form-wrapper {
  min-width: 350px;
}

.form__field {
  width: 100%;
}

.password-info {
  font-size: 10px;
  max-width: 280px;
  border-left: 4px solid #09abb8;
  padding-left: 15px;
  margin-bottom: 10px;
}
</style>
