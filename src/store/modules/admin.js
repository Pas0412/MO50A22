import {deletePlat, getAllDeletedPlats, realDeletePlat, restorePlat, updatePlat} from "@/network/admin/admin";

/**
* @description: used for admin page
* @author yuan.cao@utbm.fr
* @date 2022-05-14 17:19:56
* @version 1.0
*/
const admin = {
    state: sessionStorage.getItem('stateAdmin')?JSON.parse(sessionStorage.getItem('stateAdmin'))
        :{
        username:'',
        role:'',//the current authorization
        collapseForAdmin:false,
        tagsList:[]
    },
    getters:{
        collapseForAdmin:state=>state.collapseForAdmin,
        role:state=>state.role,
        username:state=>state.username,
        tagsList:state=>state.tagsList
    },
    mutations:{
        set_userInfo(state,infoObj){
            state.username=infoObj.username;
            state.role=infoObj.role;
        },
        del_userInfo(state){
            state.role='';
            state.username='';
            state.tagsList=[]
        },
        // sidebar collapse
        handleCollapse(state, data) {
            state.collapseForAdmin = data;
        },
        //tag handler methods
        delTagsItem(state, data) {
            state
                .tagsList
                .splice(data.index, 1);
        },
        setTagsItem(state, data) {
            state
                .tagsList
                .push(data)
        },
        clearTags(state) {
            state.tagsList = []
        },
        closeTagsOther(state, data) {
            state.tagsList = data;
        },
        closeCurrentTag(state, data) {
            for (let i = 0, len = state.tagsList.length; i < len; i++) {
                const item = state.tagsList[i];
                if (item.path === data.$route.fullPath) {
                    if (i < len - 1) {
                        data
                            .$router
                            .push(state.tagsList[i + 1].path);
                    } else if (i > 0) {
                        data
                            .$router
                            .push(state.tagsList[i - 1].path);
                    } else {
                        data
                            .$router
                            .push("/AdminPage");
                    }
                    state
                        .tagsList
                        .splice(i, 1);
                    break;
                }
            }
        },
    },
    actions:{
        UpdatePlat(context,param){
            return new Promise((resolve,reject)=>{
                updatePlat(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        DeletePlat(context,param){
            return new Promise((resolve,reject)=>{
                deletePlat(param.id).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        RealDeletePlat(context,param){
            return new Promise((resolve,reject)=>{
                realDeletePlat(param.id).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        RestorePlat(context,param){
            return new Promise((resolve,reject)=>{
                restorePlat(param.id).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        GetAllDeletedPlats(){
            return new Promise((resolve,reject)=>{
                getAllDeletedPlats().then(res=>resolve(res)).catch(err=>reject(err))
            })
        }
    }
}
export default admin