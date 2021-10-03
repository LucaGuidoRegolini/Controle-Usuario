<template>
  <div class="d-flex box">
    <b-form-input
      size="sm"
      v-model="searchField"
      class="mr-sm-2"
      placeholder="Search"
    ></b-form-input>
    <b-button size="sm" class="my-2 ms-3 my-sm-0" type="submit" @click="emitSearch"
      >Search</b-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchField: "",
    };
  },

  methods: {
    emitSearch() {
      this.$emit("search", this.searchField);
      this.searchField = "";
    },
  },
};
</script>

<style scoped>
.box {
  margin-top: 80px;
  margin-bottom: 20px;
}
</style>
