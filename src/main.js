import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router.js'
import { createRouter, createMemoryHistory } from 'vue-router'


createApp(App)
    .use(router)
    .mount('#app')
