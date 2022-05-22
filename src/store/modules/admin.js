import {
    addNews,
    addPlat, addUser, deleteNews,
    deletePlat, deleteUser,
    getAllDeletedPlats, getAllUsers, getCanteenInfo, getLeastPlats, getNumHistory,
    realDeletePlat,
    restorePlat, updateNews,
    updatePlat, updatePwd, updateUser,
    uploadFile
} from "@/network/admin/admin";
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
        lastIp:'',
        lastTime:'',
        collapseForAdmin:false,
        tagsList:[]
    },
    getters:{
        collapseForAdmin:state=>state.collapseForAdmin,
        role:state=>state.role,
        username:state=>state.username,
        tagsList:state=>state.tagsList,
        lastIp:state=>state.lastIp,
        lastTime:state=>state.lastTime
    },
    mutations:{
        set_userInfo(state,infoObj){
            state.username=infoObj.username;
            state.role=infoObj.role;
            state.lastIp=infoObj.lastIp;
            state.lastTime=infoObj.lastTime;
        },
        del_userInfo(state){
            state.role='';
            state.username='';
            state.tagsList=[];
            state.lastIp='';
            state.lastTime='';
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
        },
        /**
        * @description: core code, upload file using qiniuyun cloud service
        * @author yuan.cao@utbm.fr
        * @date 2022-05-16 10:32:58
        */
        UploadFile(context,params){
            return new Promise((resolve,reject)=>{
                uploadFile(params).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        AddPlat(context,param){
            return new Promise((resolve,reject)=>{
                addPlat(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        GetLeastPlats(){
            return new Promise((resolve,reject)=>{
                getLeastPlats().then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        /*news domain start*/
        DeleteNews(context,param){
            return new Promise((resolve,reject)=>{
                deleteNews(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        UpdateNews(context,param){
            return new Promise((resolve,reject)=>{
                updateNews(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        AddNews(context,param){
            return new Promise((resolve,reject)=>{
                addNews(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        /*person domain start*/
        GetAllUsers(){
            return new Promise((resolve,reject)=>{
                getAllUsers().then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        UpdatePwd(context,param){
            return new Promise((resolve,reject)=>{
                updatePwd(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        UpdateUser(context,param){
            return new Promise((resolve,reject)=>{
                updateUser(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        AddUser(context,param){
            return new Promise((resolve,reject)=>{
                addUser(param).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        DeleteUser(context,param){
            return new Promise((resolve,reject)=>{
                deleteUser(param.id).then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        GetCanteenInfo(){
            return new Promise((resolve,reject)=>{
                getCanteenInfo().then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        GetNumHistory(){
            return new Promise((resolve,reject)=>{
                getNumHistory().then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
    }
}
export default admin