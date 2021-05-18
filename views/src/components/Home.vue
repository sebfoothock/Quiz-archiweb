<!--
Le composant Home permet de sélectionner un quiz à faire ou à modifier et d'ajouter un quiz
-->

<template>
  <div id="container">
    <h1 class="titreQuiz font-bold text-5xl text-center text-blue-700">Jouez et créez votre propre quiz</h1>
    <br>
    <input type="text" v-model="categorie" placeholder="chercher une catégorie">
    <br>
    <br>
    <label class="bg-green-300 p-3 m-5 rounded-lg hover:bg-green-500">
      <a @click="goAjouterQuiz()">Ajoutez un quiz</a>
    </label>
    <div v-bind:key="key" v-for="quiz,key in filtreCategorie">
      <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4 hover:bg-blue-300 cursor-pointer"
        @click="goQuiz(quiz.idQuiz)">
        <h2 class="font-bold text-xl text-center text-blue-700">{{quiz.nomQuiz}}</h2>
        <label class="text-xl text-center">Catégorie : {{quiz.categorie}}</label>
      </div>
      <div class="inline-block mt-4">
        <label name="modifier" class="bg-indigo-400 p-3 m-8 rounded-lg hover:bg-indigo-500"><a
            @click="modifierQuiz(quiz.idQuiz)">Modifiez</a>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
    mounted() {
      //Permet d'accéder aux informations des quiz
      this.$axios
        .get("http://localhost:4000/api/quiz")
        .then((response) => {
          this.quizs = response.data;
        })
        .catch((error) => {
          console.log(error);
        }),
      //Permet d'accéder à la liste des catégories
      this.$axios
        .get("http://localhost:4000/api/categories")
        .then((response) => {
          this.categories = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    data() {
      return {
        //Ce sont les informations des quiz
        quizs: [],
        //Ce sont la liste des catégories
        categories: [],
        //Recupère ce que l'utilisateur a tapé dans la barre de recherche des catégories
        categorie: ""
      }
    },
    methods: {
      //Permet d'aller au composant Quiz en fonction de l'identifiant du quiz
      goQuiz(quiz) {
        this.$router.push('/Quiz/' + quiz)
      },
      //Permet d'aller au composant Modifier en fonction de l'identifiant du quiz
      modifierQuiz(quiz) {
        this.$router.push('/Modifier/' + quiz)
      },
      //Permet d'aller au composant AjouterQuiz
      goAjouterQuiz() {
        this.$router.push('/AjouterQuiz/')
      }
    },
    computed: {
      //Permet de filtrer les quiz à afficher et prend en paramètre les informations du quiz
      filtreCategorie: function(){
        return this.quizs.filter((quiz) => {
          return quiz.categorie.toLowerCase().match(this.categorie.toLowerCase())
        });
      }
    }
  }
</script>

<style>
  @import "../assets/styles.css";

  #container {
    max-width: 50vw;
    padding: 50px;
  }

  @media all and (max-width: 900px) {
    #container {
      min-width: 90vw;
    }

    .boxQuiz {
      padding: 3rem 1rem;
    }
  }
</style>