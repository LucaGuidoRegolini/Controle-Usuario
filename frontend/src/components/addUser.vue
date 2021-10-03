<template>
  <b-card class="GroupCard" @click="selectUser">
    <div class="group mx-auto">
      <b-icon icon="plus" />
    </div>
  </b-card>
</template>

<script>
export default {
  data() {
    return {};
  },

  methods: {
    selectUser() {
      this.$router.push("/user/");
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
