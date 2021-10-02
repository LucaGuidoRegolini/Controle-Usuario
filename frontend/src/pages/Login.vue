<template>
  <div class="body">
    <b-card title="Login" style="max-width: 25rem;" class="mx-auto center">
      <b-form>
        <b-form-group id="input-group-1" label="Email ou Nome:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            placeholder="Email ou nome"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Senha:" label-for="input-2" class="mb-10">
          <b-form-input
            id="input-2"
            v-model="user.password"
            placeholder="senha"
            required
          ></b-form-input>
        </b-form-group>
        <b-button class="login button" variant="success" @click="loginAdmin()"
          >Login</b-button
        >
      </b-form>
    </b-card>

    <b-alert
      :show="dismissCountDown"
      variant="danger"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      class="alert"
    >
      Usuario não existe
    </b-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  methods: {
    async loginAdmin() {
      this.$store
        .dispatch("appLogin", this.user)
        .then(() => {
          this.user = {};
          this.$router.push({ name: "HomePage" });
        })
        .catch(() => {
          this.showAlert();
        });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style>
.body {
  min-height: 100vh;
}

.center {
  margin-top: 60px;
}

.button {
  margin-top: 10px;
}

.alert {
  max-width: 200px;
  margin: 8px auto;
}
</style>
