import backend from "../../api/backend";

const state = {
  token: null || localStorage.getItem("token"),
  type: null || localStorage.getItem("type"),
  user: null || JSON.parse(localStorage.getItem("user")),
};

const mutations = {
  DEFINE_TOKEN(state, { token, type }) {
    state.token = token;
    state.type = type;
    localStorage.setItem("token", token);
    localStorage.setItem("type", type);
  },
  REMOVE_USER(state) {
    state.token = null;
    state.type = null;
    state.user = null;
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("user");
  },

  DEFINE_USER(state, user) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
  },
};

const actions = {
  appLogin({ commit }, user) {
    return new Promise((resolve, reject) => {
      backend
        .post("/admin/login", user)
        .then((res) => {
          commit("DEFINE_TOKEN", { token: res.data.token, type: "admin" });
          resolve(res);
        })
        .catch(() =>
          backend
            .post("/user/login", { name: user.email, password: user.password })
            .then((res) => {
              commit("DEFINE_TOKEN", { token: res.data.token, type: "user" });
              resolve(res);
            })
            .catch(() => reject())
        );
    }).then(() =>
      backend
        .get(`/${state.type}/me`)
        .then((res) => {
          commit("DEFINE_USER", res.data);
          return res.data;
        })
        .catch((err) => console.log(err))
    );
  },

  appCreateAdmin(action, user) {
    return new Promise((resolve, reject) => {
      backend
        .post("/admin", user)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  },
};

const getters = {
  userType: (state) => state.type,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
