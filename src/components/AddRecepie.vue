<template>
  <div class="add-recepie container">
    <h2 class="center-align indigo-text">Add new recepie</h2>
    <form @submit.prevent="addRecepie">
      <div class="field title">
        <label for="title">Recepie Title:</label>
        <input type="text" name="title" v-model="title">
      </div>
      <div class="field" v-for="(ing, index) in ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="ingredients[index]">
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>

      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{feedback}}</p>
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
      title: null,
      another: null,
      ingredients: [],
      feedback: null
    };
  },
  methods: {
    addRecepie() {
      console.log(this.title);
    },
    addIng() {
      if (this.another) {
        this.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
        console.log(this.ingredients);
      } else {
        this.feedback = "You should add an ingredient!";
      }
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


