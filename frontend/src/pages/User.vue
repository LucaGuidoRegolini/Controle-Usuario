<template>
  <Default>
    <div class="body">
      <b-alert v-if="errorMessage" :show="true" variant="danger" class="alert">
        <h3>{{ errorMessage }}</h3>
        <b-button class="login button ms-3" @click="returnLogin()">Retornar</b-button>
      </b-alert>
      <b-card v-else :title="Title" style="max-width: 25rem;" class="mx-auto center">
        <b-form>
          <b-form-group id="input-group-1" label="Nome:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="user.name"
              type="text"
              placeholder="Nome"
              :disabled="user_id != undefined"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-1" label="Apelido:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="user.nickname"
              type="text"
              placeholder="Apelido"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Senha:"
            label-for="input-2"
            class="mb-10"
          >
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
          <b-button
            class="login button"
            variant="success"
            v-if="!user_id"
            @click="createUser()"
          >
            Criar
          </b-button>
          <b-button class="login button" variant="success" v-else @click="updateUser()">
            Atualizar
          </b-button>
          <b-button
            class="login button ms-3"
            variant="danger"
            :disabled="user_id == undefined"
            @click="deletUser()"
            >Deletar</b-button
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
        {{ errorMessage }}
      </b-alert>
    </div>
  </Default>
</template>

<script>
import Default from "../layouts/Default.vue";
import backend from "../api/backend";
export default {
  components: {
    Default,
  },

  data() {
    return {
      errorMessage: "",
      user_id: this.$route.params.id,
      user: {},
      type_password: "password",
      dismissSecs: 5,
      dismissCountDown: 0,
    };
  },

  computed: {
    Title() {
      if (this.user_id) return "Atualizar Usuario";
      else return "Criar Usuario";
    },
  },

  mounted() {
    this.seachUser();
  },

  methods: {
    seachUser() {
      if (this.user_id)
        backend
          .get(`/users/${this.user_id}`)
          .then((resp) => {
            this.user = resp.data;
            delete this.user.admin;
            delete this.user.id;
          })
          .catch(() => {
            this.errorMessage = "Usuario não encontrado";
          });
    },
    createUser() {
      backend
        .post("/users/", this.user)
        .then(() => {
          this.$router.push({ name: "Users" });
        })
        .catch(() => {
          this.errorMessage = "Erro ao criar usuario";
          this.showAlert();
        });
    },

    updateUser() {
      backend
        .put(`/users/${this.user_id}`, {
          nickname: this.user.nickname,
          password: this.user.password,
        })
        .then(() => {
          this.$router.push({ name: "Users" });
        })
        .catch(() => {
          this.errorMessage = "Erro ao modificar usuario";
          this.showAlert();
        });
    },

    deletUser() {
      backend
        .delete(`/users/${this.user_id}`)
        .then(() => {
          this.$router.push({ name: "Users" });
        })
        .catch(() => {
          this.errorMessage = "Erro ao deletar usuario";
          this.showAlert();
        });
    },

    returnLogin() {
      (this.user = {}), this.$router.push({ name: "Users" });
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
  margin-top: 100px;
}

.button {
  margin-top: 10px;
}

.alert {
  max-width: 200px;
  margin: 40px auto;
}
</style>
