import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NewUser from "./pages/NewUser";
import Users from "./pages/Users";
import User from "./pages/User";

import store from "./store";

Vue.use(VueRouter);
Vue.use(VueMeta);

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
  {
    name: "register",
    title: "Register",
    path: "/register",
    component: NewUser,
    menu: false,
    meta: {
      public: true,
    },
  },
  {
    name: "Users",
    title: "Users",
    path: "/users",
    component: Users,
    menu: false,
    meta: {
      admin: true,
    },
  },
  {
    name: "user",
    title: "User",
    path: "/user/:id",
    component: User,
    menu: false,
    meta: {
      admin: true,
    },
  },
  {
    name: "user",
    title: "User",
    path: "/user",
    component: User,
    menu: false,
    meta: {
      admin: true,
    },
  },
  {
    path: "/*",
    component: HomePage,
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

  if (routeTo.meta.admin && store.state.backend.type != "admin") {
    return next({ name: "HomePage" });
  }
  next();
});

export default router;
