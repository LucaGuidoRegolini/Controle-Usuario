<template>
  <b-card class="GroupCard" @click="selectUser">
    <div class="group">
      <h6>Nome:</h6>
      <p>{{ user.name }}</p>
    </div>
    <div class="group">
      <h6>Apelido:</h6>
      <p>{{ user.nickname }}</p>
    </div>
    <div class="group" @click.stop="">
      <h6>Senha:</h6>
      <div class="d-flex">
        <div class="content" :class="type_password">
          <p :type="type_password">{{ user.password }}</p>
        </div>

        <div class="ms-2" @click.stop="viewPassword">
          <b-icon icon="eye-fill" v-if="type_password == 'password'"></b-icon>
          <b-icon icon="eye-slash-fill" v-if="type_password == 'text'"></b-icon>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      type_password: "password",
    };
  },

  methods: {
    selectUser() {
      this.$router.push(`user/${this.user.id}`);
    },

    viewPassword() {
      if (this.type_password == "password") this.type_password = "text";
      else if (this.type_password == "text") this.type_password = "password";
    },
  },
};
</script>

<style scoped>
p {
  font-size: 13px;
  margin-bottom: 0px;
  text-align: center;
}
h6 {
  font-size: 12px;
  text-align: center;
}

.GroupCard {
  cursor: pointer;
  margin-bottom: 10px;
}

.card-body {
  display: flex;
  justify-content: space-between;
}

.password {
  background-color: rgb(82, 82, 82);
  color: rgb(82, 82, 82);
}
</style>
