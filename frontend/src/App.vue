<template>
  <div id="app">
    <router-view id="body" />
  </div>
</template>

<script>
document.title = "Controle de usuario";
export default {
  name: "App",
};
</script>

<style>
#app {
}

.divider {
  flex-grow: 1;
}
</style>
