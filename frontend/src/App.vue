<template>
  <div id="app">
    <router-view id="body" />
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    title: "Controle de usuario",
    htmlAttrs: {
      lang: "pt-br",
    },
    meta: [
      { charset: "utf-8" },
      { "http-equiv": "Content-Security-Policy", content: "upgrade-insecure-requests" },
    ],
  },
};
</script>

<style>
#app {
}

.divider {
  flex-grow: 1;
}
</style>
