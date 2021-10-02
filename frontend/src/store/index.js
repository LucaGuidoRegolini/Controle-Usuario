import Vue from "vue";
import Vuex from "vuex";

import backend from "./modules/backend";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    backend,
  },
});

export default store;
