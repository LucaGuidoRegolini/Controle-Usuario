<template>
  <div>
    <header>
      <b-navbar toggleable="sm" type="dark" id="navbar">
        <b-navbar-brand class="ms-2">Equipamnetos</b-navbar-brand>

        <b-navbar-nav>
          <b-nav-item href="#" :disabled="true">Usuarios</b-nav-item>
        </b-navbar-nav>

        <div class="divider" />

        <b-navbar-toggle target="nav-search"> </b-navbar-toggle>

        <b-collapse id="nav-search" class="me-2 ms-2" is-nav>
          <b-navbar-nav class="ml-20 ">
            <b-form-input
              size="sm"
              class="me-2 mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">
              <b-icon icon="search" color="white" />
            </b-button>
          </b-navbar-nav>
        </b-collapse>
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
export default {};
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
}
</style>
