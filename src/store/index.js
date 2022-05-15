/**
* @description: store of vuex
* @author yuan.cao@utbm.fr
* @date 2022-04-27 15:53:15
* @version 1.0
*/
import { createStore } from 'vuex'
import indexShow from "@/store/modules/indexShow";
import user from "@/store/modules/user";
import token from "@/store/modules/token";
import news from "@/store/modules/news";
import admin from "@/store/modules/admin";

export default createStore({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        indexShow,
        user,
        token,
        news
        admin
    }
})
