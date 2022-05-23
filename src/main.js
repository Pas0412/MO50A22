import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from "axios";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

///vue3.0 use element-plus
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(store)
app.mount('#app')
app.use(ElementPlus)
//no console out
app.config.warnHandler = () => null

//allow taking info of cookies when crossing domain
axios.defaults.withCredentials = true