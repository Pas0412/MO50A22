import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from "axios";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as icons from '@element-plus/icons'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

///vue3.0使用element-plus
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

    app.use(router)
    app.use(store)
    app.mount('#app')
    app.use(ElementPlus)

Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})

//allow taking info of cookies when crossing domain
axios.defaults.withCredentials = true