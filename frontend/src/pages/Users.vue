<template>
  <div>
    <Default>
      <b-container>
        <Search @search="searchTeste" />
        <UserCard v-for="user in users" :key="user.id" :user="user" />
        <addUser />
      </b-container>
    </Default>
  </div>
</template>

<script>
import Default from "../layouts/Default.vue";
import Search from "../components/SearchField.vue";
import UserCard from "../components/UserCard.vue";
import addUser from "../components/addUser.vue";
import backend from "../api/backend";
export default {
  components: {
    Default,
    Search,
    addUser,
    UserCard,
  },

  data() {
    return {
      users: [],
    };
  },

  mounted() {
    this.fildUsers();
  },

  methods: {
    fildUsers() {
      backend.get("/users/").then((users) => {
        this.users = users.data[0];
      });
    },

    searchTeste(search) {
      backend.get(`/users/?name=${search}`).then((users) => {
        this.users = users.data[0];
      });
    },
  },
};
</script>

<style scoped></style>
