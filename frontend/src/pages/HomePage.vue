<template>
  <div>
    <Default>
      <UsersChat v-if="userType == 'admin'" />
      <EquipChart />
    </Default>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Default from "../layouts/Default.vue";
import EquipChart from "../components/EquipCardChart.vue";
import UsersChat from "../components/UsersCardChart.vue";
export default {
  components: {
    Default,
    EquipChart,
    UsersChat,
  },
  data() {
    return {};
  },

  computed: {
    ...mapGetters(["userType"]),
  },
};
</script>

<style></style>
