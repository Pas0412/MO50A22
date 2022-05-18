/**
* @description:
 * thanks to window.addEventListener('unload',this.saveStateToken)
             window.addEventListener('load',this.clearStateToken)
             in UploadFile.vue
   we can prevent loss of data after refreshing

 * In the vue project, vuex is used for global state management. It is found that when the webpage is refreshed, the data saved in the vuex instance store will be lost.
   Reason: Because the data in the store is stored in the running memory, when the page is refreshed, the page will reload the vue instance, and the data in the store will be reassigned and initialized

   Because the above method to prevent data loss is added, this token.js is not limited to storing parameters such as tokens
* @author yuan.cao@utbm.fr
* @date 2022-05-12 17:59:56
* @version 1.0
*/

const token={
    //to prevent the lost of data after refreshing
    state: sessionStorage.getItem('stateToken')?JSON.parse(sessionStorage.getItem('stateToken'))
        :{
            token:'',
            userId:'',
            name:'',
            nowTime:'',
        },
    getters:{
        userId:state=>state.userId,
        name:state=>state.name,
    },
    mutations:{
        set_token(state,object){
            state.token = object.token
            state.userId = object.userId
            state.name = object.name
            sessionStorage.token = object.token
        },
        del_token(state){
            state.token = ''
            state.userId = ''
            sessionStorage.removeItem('token')
        },
        //the time of saving
        set_time(state,nowTime){
            state.nowTime=nowTime;
            sessionStorage.nowTime=nowTime
        },
        del_time(state){
            state.nowTime='';
            sessionStorage.removeItem('nowTime')
        }
    }

}

export default token;