<template>
  <div class="edit-recepie container">
    <h2 v-if="recepie">Edit {{recepie.title}}</h2>
  </div>
</template>

<script>
import db from "@/firebase/init";

export default {
  name: "EditRecepie",
  data() {
    return {
      recepie: null
    };
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
</style>

