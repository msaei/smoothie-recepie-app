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
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
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
import db from "@/firebase/init";
import slugify from "slugify";

export default {
  name: "AddRecepie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    };
  },
  methods: {
    addRecepie() {
      if (this.title) {
        this.feedback = null;
        this.slug = slugify(this.title, {
          replacement: "-",
          remove: /[~!@#$%^&*()_+'"]/g,
          lower: true
        });

        db.collection("smoothies")
          .add({
            title: this.title,
            ingredients: this.ingredients,
            slug: this.slug
          })
          .then(() => {
            this.$router.push({ name: "Index" });
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.feedback = "You should add a title";
      }
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
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter(elm => {
        return elm != ing;
      });
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
  position: relative;
}
.add-recepie .delete {
  position: absolute;
  right: 0px;
  bottom: 16px;
  font-size: 1.4em;
  color: #aaa;
  cursor: pointer;
}
</style>


