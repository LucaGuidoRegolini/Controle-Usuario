<template>
  <div id="app">
    <router-view id="body" />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  title: "Controle de usuario",
  titleTemplate: "%s | Controle de usuario",
};
</script>

<style>
#app {
}

.divider {
  flex-grow: 1;
}
</style>
