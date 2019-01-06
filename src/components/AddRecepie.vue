<template>
  <div class="add-recepie container">
    <h2 class="center-align indigo-text">Add new recepie</h2>
    <form @submit.prevent="addRecepie">
      <div class="field title">
        <label for="title">Recepie Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient:</label>
        <input type="text" name="add-ingredient">
      </div>
      <div class="field center-align">
        <button class="btn pink">Add Recepie</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddRecepie",
  data() {
    return {
      title: null
    };
  },
  methods: {
    addRecepie() {
      console.log(this.title);
    }
  }
};
</script>

<style>
.add-recepie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.add-recepie h2 {
  margin: 20px auto;
  font-size: 2em;
}
.add-recepie .field {
  margin: 20px auto;
}
</style>


