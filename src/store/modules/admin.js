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
    }
}
export default admin