<template>
  <div class="body">
    <b-card title="Criar administrador" style="max-width: 25rem;" class="mx-auto center">
      <b-form>
        <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.name"
            type="email"
            placeholder="Nome"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="user.email"
            type="email"
            placeholder="Email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Senha:" label-for="input-2" class="mb-10">
          <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              id="input-2"
              :type="type_password"
              v-model="user.password"
              placeholder="senha"
              required
            ></b-form-input>

            <template #append>
              <b-button text="Dropdown" @click="viewPassword()">
                <b-icon icon="eye-fill" v-if="type_password == 'password'"></b-icon>
                <b-icon icon="eye-slash-fill" v-if="type_password == 'text'"></b-icon>
              </b-button>
            </template>
          </b-input-group>
        </b-form-group>
        <b-button class="login button" variant="success" @click="createAdmin()"
          >Criar</b-button
        >
        <b-button class="login button ms-3" @click="returnLogin()">Retornar</b-button>
      </b-form>
    </b-card>

    <b-alert
      :show="dismissCountDown"
      variant="danger"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      class="alert"
    >
      Erro ao criar usuario
    </b-alert>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      type_password: "password",
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },
  methods: {
    createAdmin() {
      this.$store
        .dispatch("appCreateAdmin", this.user)
        .then(() => {
          this.user = {};
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          this.showAlert();
        });
    },
    returnLogin() {
      (this.user = {}), this.$router.push({ name: "login" });
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    viewPassword() {
      if (this.type_password == "password") this.type_password = "text";
      else if (this.type_password == "text") this.type_password = "password";
    },
  },
};
</script>

<style scoped>
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
