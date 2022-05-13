import { createRouter, createWebHistory } from 'vue-router'
/**
* @description: unique router configuration file
* @author yuan.cao@utbm.fr
* @date 2022-04-29 18:45:36
* @version 1.0
*/
const HomeIndex = () => import('@/views/index/HomeIndex')

const routes = [
    {
        path: '',
        redirect: '/homeIndex'
    },
    {
        path: '/homeIndex',
        component: HomeIndex
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router