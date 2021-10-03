<template>
  <div>
    <header>
      <b-navbar toggleable="sm" type="dark" id="navbar">
        <router-link to="/" class="nav-link link">
          Home Page
        </router-link>

        <router-link v-if="userType == 'admin'" to="/users" class="nav-link link">
          Usuarios
        </router-link>

        <div class="divider" />

        <b-button size="sm" class="me-2 my-2 my-sm-0" @click="logout">
          <b-icon icon="box-arrow-left" color="white"></b-icon>
        </b-button>
      </b-navbar>
    </header>

    <div class="body">
      <slot></slot>
    </div>

    <footer class="d-flex justify-content-between">
      <div class="left ms-2 my-auto">
        <h6>Criado por</h6>
        <div class="d-flex justify-content-between align-items-center">
          <b-link
            href="https://github.com/LucaGuidoRegolini"
            target="_blank"
            class="link"
          >
            <label class="m-0 me-2">Luca Guido Regolini</label>
            <b-icon icon="github" color="white" />
          </b-link>
        </div>
      </div>

      <div class="right me-2 my-auto">
        <h6>Outros projetos</h6>
        <div class="d-flex justify-content-between align-items-center flex-column">
          <b-link href="https://instamon.netlify.app/" target="_blank" class="link">
            <label class="m-0 me-2">Instamon</label>
          </b-link>

          <b-link
            href="https://simuladoreleicao.netlify.app/"
            target="_blank"
            class="link"
          >
            <label class="m-0 me-2">Urna eletronica</label>
          </b-link>

          <b-link
            href="https://cadastrobluelab.netlify.app/"
            target="_blank"
            class="link"
          >
            <label class="m-0 me-2">Cadastro clientes</label>
          </b-link>

          <b-link href="https://credito-todos.netlify.app/" target="_blank" class="link">
            <label class="m-0 me-2">Emulador credito</label>
          </b-link>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userType"]),
  },
  methods: {
    logout() {
      this.$store.commit("REMOVE_USER");
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style>
#navbar {
  background-color: black !important;
}

@media (min-width: 576px) {
  #nav-search {
    justify-content: flex-end;
  }
}

header {
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
}

footer {
  padding-top: 15px;
  background-color: black;
}

.link {
  color: white;
}

.link:hover {
  color: rgb(129, 129, 129);
}

.body {
  min-height: 100vh;
  margin-top: 60px;
}
</style>
