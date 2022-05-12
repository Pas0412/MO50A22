import { createRouter, createWebHistory } from 'vue-router'
import adminPage from "@/views/index/adminPage";
/**
* @description: unique router configuration file
* @author yuan.cao@utbm.fr
* @date 2022-04-29 18:45:36
* @version 1.0
*/
const homeIndex = () => import('@/views/index/homeIndex')

const routes = [
    {
        path: '',
        redirect: '/homeIndex'
    },
    {
        path: '/homeIndex',
        component: homeIndex
    },
    {
        path: '/adminPage',
        name: 'adminPage',
        component: adminPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router