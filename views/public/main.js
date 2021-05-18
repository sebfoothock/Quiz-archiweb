import Vue, { createApp } from 'vue'
import Home from './Home.vue'
import router from '../src/router'

/* createApp(Home).mount('#home') */

new Vue({
    router,
    el: '#app',
    render: h => h(App)
})