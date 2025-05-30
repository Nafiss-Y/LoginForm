import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './Router.js'
import { createPinia } from 'pinia'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
