<template>
  <div class="cart mx-auto">
    <h1 class="label">Usuarios</h1>
    <UsersChart v-if="loaded" class="chart mx-auto" :datas="usersTotal" />
  </div>
</template>

<script>
import UsersChart from "../chats/UsersChart";
import backend from "../api/backend";
export default {
  components: {
    UsersChart,
  },

  data() {
    return {
      usersTotal: "",
      loaded: false,
    };
  },

  created() {
    this.equipments();
  },

  methods: {
    equipments() {
      backend.get("users/").then((resp) => {
        this.usersTotal = resp.data[1];
        this.loaded = true;
      });
    },
  },
};
</script>

<style scoped>
.cart {
  max-width: 500px;
  margin-top: 100px;
  border-radius: 20px;
  box-shadow: 1px 2px 16px 1px black;
}

.label {
  text-align: center;
  margin: 5px 0px;
}

.chart {
  max-width: 300px;
}
</style>
