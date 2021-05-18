import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert"

//utilisation de simpleAlert pour afficher les alertes
Vue.use(VueSimpleAlert);

//utilisation d'Axios pour faire des requêtes vers l'API
Vue.prototype.$axios = axios

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')



