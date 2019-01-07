<template>
  <div v-if="recepie" class="edit-recepie container">
    <h2>Edit {{recepie.title}}</h2>
    <form @submit.prevent="editRecepie">
      <div class="field title">
        <label for="title">Recepie Title:</label>
        <input type="text" name="title" v-model="recepie.title">
      </div>
      <div class="field" v-for="(ing, index) in recepie.ingredients" :key="index">
        <label for="ingredient">Ingredient:</label>
        <input type="text" name="ingredient" v-model="recepie.ingredients[index]">
        <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
      </div>
      <div class="field add-ingredient">
        <label for="add-ingredient">Add Ingredient:</label>
        <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
      </div>

      <div class="field center-align">
        <p class="red-text" v-if="feedback">{{feedback}}</p>
        <button class="btn pink">Edit Recepie</button>
      </div>
    </form>
  </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
export default {
  name: "EditRecepie",
  data() {
    return {
      recepie: null,
      another: null,
      feedback: null
    };
  },
  methods: {
    editRecepie() {
      if (this.recepie.title) {
        this.feedback = null;
        this.recepie.slug = slugify(this.recepie.title, {
          replacement: "-",
          remove: /[~!@#$%^&*()_+'"]/g,
          lower: true
        });

        db.collection("smoothies")
          .doc(this.recepie.id)
          .update({
            title: this.recepie.title,
            ingredients: this.recepie.ingredients,
            slug: this.recepie.slug
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
        this.recepie.ingredients.push(this.another);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = "You should add an ingredient!";
      }
    },
    deleteIng(ing) {
      this.recepie.ingredients = this.recepie.ingredients.filter(elm => {
        return elm != ing;
      });
    }
  },
  created() {
    let ref = db
      .collection("smoothies")
      .where("slug", "==", this.$route.params.recepie_slug);
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.recepie = doc.data();
        this.recepie.id = doc.id;
      });
    });
  }
};
</script>

<style>
.edit-recepie {
  margin-top: 60px;
  padding: 20px;
  max-width: 500px;
}
.edit-recepie h2 {
  margin: 20px auto;
  font-size: 2em;
}
.edit-recepie .field {
  margin: 20px auto;
  position: relative;
}
.edit-recepie .delete {
  position: absolute;
  right: 0px;
  bottom: 16px;
  font-size: 1.4em;
  color: #aaa;
  cursor: pointer;
}
</style>

