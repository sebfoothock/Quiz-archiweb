import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "./components/Home"
import Quiz from "./components/Quiz.vue"
import Modifier from "./components/Modifier.vue"
import AjouterQuestion from "./components/AjouterQuestion.vue"
import AjouterQuiz from "./components/AjouterQuiz.vue"

Vue.use(VueRouter)

const Router = new VueRouter({
    routes :[
        {path: "/", component: Home},
        {path: "/Home", component: Home},
        {path: "/Quiz/:idQuiz", component: Quiz},
        {path: "/Modifier/:idQuiz", component: Modifier},
        {path: "/AjouterQuestion/:idQuiz", component: AjouterQuestion},
        {path: "/AjouterQuiz", component: AjouterQuiz},
    ]
})

Router.beforeEach((to, from, next) => {
    document.title = "Quiz"
    next()
});

export default Router;