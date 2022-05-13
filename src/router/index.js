import { createRouter, createWebHistory } from 'vue-router'
/**
* @description: unique router configuration file
* @author yuan.cao@utbm.fr
* @date 2022-04-29 18:45:36
* @version 1.0
*/
const HomeIndex = () => import('@/views/index/HomeIndex')
const AdminPage = () => import("@/views/index/AdminPage")

const routes = [
    {
        path: '',
        redirect: '/HomeIndex'
    },
    {
        path: '/HomeIndex',
        component: HomeIndex
    },
    {
        path: '/AdminPage',
        name: 'AdminPage',
        component: AdminPage
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router