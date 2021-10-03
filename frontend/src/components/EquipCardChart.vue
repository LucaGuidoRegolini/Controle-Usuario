<template>
  <div class="cart mx-auto">
    <h1 class="label">Equipamentos</h1>
    <EquipChart v-if="loaded" class="chart mx-auto" :datas="datas" />
  </div>
</template>

<script>
import EquipChart from "../chats/EquipChart";
import api from "../api/api";
export default {
  components: {
    EquipChart,
  },

  data() {
    return {
      datas: "",
      loaded: false,
    };
  },

  created() {
    this.equipments();
  },

  methods: {
    equipments() {
      api.get("").then((resp) => {
        this.datas = resp.data[0];
        this.loaded = true;
      });
    },
  },
};
</script>

<style scoped>
.cart {
  max-width: 500px;
  margin: 100px 0px;
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
