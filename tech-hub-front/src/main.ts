import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret, faBars } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import VueAxios from 'vue-axios'
 



library.add(faUserSecret, faBars)

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(VueAxios, axios)
app.use(router)

app.mount('#app')
