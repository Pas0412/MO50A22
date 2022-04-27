import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import axios from "axios";

createApp(App)
    .use(store)
    .mount('#app')

//allow taking info of cookies when crossing domain
axios.defaults.withCredentials