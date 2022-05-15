import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store"
import {adminRoleId} from "@/utils/const/const";
/**
* @description: unique router configuration file
* @author yuan.cao@utbm.fr
* @date 2022-04-29 18:45:36
* @version 1.0
*/
const HomeIndex = () => import('@/views/index/HomeIndex')
const AdminPage = () => import("@/views/index/AdminPage")
const PersonInfo = () => import("@/views/admin/PersonInfo")
const AdminHome = () => import("@/views/admin/AdminHome")
const ErrorPage403 = () => import("@/views/common/ErrorPage403")
const ErrorPage404 = () => import("@/views/common/ErrorPage404")

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
        redirect: '/AdminPage/adminHome'
    },
    {
        path: '/AdminPage',
        component: AdminPage,
        children: [
            {
              path: "adminHome",
              meta: {
                  title: 'Home',
              },
              component: AdminHome
            },
            {
                path: "personInfo",
                meta: {
                    title: 'Person Info',
                    permission: true,
                },
                component: PersonInfo
            }

        ]
    },
    {
        path: '/403',
        meta: {
          title: '403'
        },
        component: ErrorPage403
    },
    //!! should be put the last
    {
        //Implemented own parsing system that allows route ranking and enables dynamic routing
        path: '/:pathMatch(.*)',
        redirect: '/404',
    },
    {
        path: '/404',
        meta: {
            title: '404'
        },
        component:ErrorPage404
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.path==='/'||to.path==='/HomeIndex'){
        document.title = 'Cantine Universitée';
    }else{
        document.title = `${to.meta.title} | GCUF`;
    }
    //it is a proxy now
    let role = store.getters.role
    if(role){
        //now it is a json object
        role = JSON.parse(JSON.stringify(role)).role;
    }
    if (role==='' && to.path !== '/HomeIndex' && to.path !== '/') {
        next('/HomeIndex');
    } else if (to.meta.permission) {
        // If you have administrator rights, you can enter.
        // This is just a simple simulation of administrator rights.
        role === adminRoleId//admin authorization
            ? next()
            : next('/403');
    } else {
        next();
    }
});

export default router