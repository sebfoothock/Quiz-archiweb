<template>
    <div id="container">
        <h1 class="font-bold text-5xl text-center text-blue-700">Ajoutez un Quiz</h1>
        <div class="boxQuiz bg-blue-200 p-12 rounded-lg shadow-lg mt-4">
            <div class="m-3">
                <label class="text-blue-800">nom du Quiz</label>
                <input class="border-red-300" type="text" name="nom quiz" v-model="newQuiz.nomQuiz">
                <label class="text-blue-800">catégorie du Quiz</label>
                <input class="border-red-300" type="text" name="categorie" v-model="newQuiz.categorie">
            </div>
            <label class="bg-green-300 p-3 m-5 rounded-lg hover:bg-green-500">
                <a @click="ajouterQuiz()">Ajoutez</a>
            </label>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newQuiz: {
                    nomQuiz: null,
                    categorie: null
                }
            }
        },
        methods: {
            ajouterQuiz() {
                var data = new FormData();
                    data.append("nomQuiz", this.newQuiz.nomQuiz);
                    data.append("categorie", this.newQuiz.categorie);
                this.$axios
                    .post("http://localhost:4000/api/newquiz", data
                    , {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then((response) => {
                        this.questions = response.data;
                        this.$alert("quiz ajouté");
                        console.log(this.questions);
                    })
                    .catch((error) => {
                        this.$alert("quiz ajouté");
                        console.log(error);
                    });
            }
        }
    }
</script>

<style>
    @import "../assets/styles.css";

    input[type=text] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        display: inline-block;
        border: 1px solid lightgray;
        border-radius: 4px;
        box-sizing: border-box;
    }

    #container {
        min-width: 40vw;
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