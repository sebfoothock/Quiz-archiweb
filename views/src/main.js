import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSimpleAlert from "vue-simple-alert"

Vue.use(VueSimpleAlert);

Vue.prototype.$axios = axios

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})



