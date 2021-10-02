import backend from "../../api/backend";

const state = {
  token: null || localStorage.getItem("token"),
};

const mutations = {
  DEFINE_TOKEN(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
  },
  REMOVE_TOKEN(state) {
    state.token = null;
    localStorage.removeItem("token");
  },
};

const actions = {
  appLogin({ commit }, user) {
    return new Promise((resolve, reject) => {
      backend
        .post("/admin/login", user)
        .then((res) => {
          commit("DEFINE_TOKEN", res.data.token);
          resolve(res);
        })
        .catch(() => {
          backend
            .post("/user/login", user)
            .then((res) => {
              commit("DEFINE_TOKEN", res.data.token);
              resolve(res);
            })
            .catch(() => reject());
        });
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
