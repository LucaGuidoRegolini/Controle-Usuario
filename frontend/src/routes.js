import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

import store from "./store";

Vue.use(VueRouter);

const routes = [
  {
    name: "HomePage",
    title: "HomePage",
    path: "/",
    component: HomePage,
    menu: false,
  },
  {
    name: "login",
    title: "Login",
    path: "/login",
    component: Login,
    menu: false,
    meta: {
      public: true,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

router.beforeEach((routeTo, routeFrom, next) => {
  if (!routeTo.meta.public && !store.state.backend.token) {
    return next({ name: "login" });
  }
  next();
});

export default router;
