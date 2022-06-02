/**
* @description: file for configuration of ajax request
* @author yuan.cao@utbm.fr
* @date 2022-04-27 16:09:05
* @version 1.0
*/
import axios from "axios";
import {baseURL, sessionExpiredTime} from "@/utils/const/const";
import {ElMessageBox} from "element-plus";
import store from "@/store"

/**
* @description:  create the instance for ajax request
* @author yuan.cao@utbm.fr
* @date 2022-04-27 16:08:00
*/
export function request(config){
    const instance1 = axios.create({
        baseURL:baseURL,
        timeout:60000//change this variable to avoid frequent bad response
    })

    //request handler
    instance1.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
    instance1.interceptors.request.use(config=>{
            if(config.method==='post'){
                config.data = JSON.stringify(config.data)//这样发送请求，虽然是可以发送，但是携带的参数，是一个json字符串，会出现问题。所以我们在用post发送请求的时候，需要这样
                // config.headers= { 'content-type': 'application/x-www-form-urlencoded' };
            }
            //add by ycao 20220512
            //verify if token is existed, if yes, add token to each http header
            if(sessionStorage.getItem("token")){
                config.headers.Authorization = `{token: ${sessionStorage.getItem('token')}}"`
            }
            return config;
        },
        error => {
            console.log(error);
            return Promise.reject(error)
        })

    //response handler
    instance1.interceptors.response.use(
        response=>{
            /**
             * ONLY FOR ADMIN PAGE
             * The following is a comparison of time; if the front desk does not operate for ? minutes,
             * a re-login state will be performed; when re-login,
             * the background will regenerate a new token;
             * So don't worry about a refresh of the back-end token,
             * the front-end token is not the same problem.
             * @type {number}
             * @author yuan.cao@utbm.fr
             * @date 2022-05-12 22:11:41
             */
            if(response.request.responseURL.indexOf(baseURL+'/admin/',0)!==-1){
                let today = new Date().getTime();
                if(sessionStorage.getItem("nowTime")!=null){
                    if(today-sessionStorage.getItem("nowTime")>sessionExpiredTime){
                        ElMessageBox.alert("Your session is about to expire. Do you want to extend the duration of the current session?","No activity recently",{
                            confirmButtonText:'Extend session duration',
                            showCancelButton: true,
                            callback:(action)=>{
                                if(action!='confirm') {//Do not extend the session
                                    sessionStorage.removeItem('token');
                                    sessionStorage.removeItem('nowTime');
                                    window.location.replace("/")
                                }else{
                                    sessionStorage.removeItem('nowTime');
                                    store.commit('set_time',today);//Extend the session
                                }
                            }
                        }).catch(r => console.log(r))
                        // location.reload()
                        return;
                    }else{
                        sessionStorage.removeItem('nowTime');
                        store.commit('set_time',today);//Each request adds a new time to save it.
                    }
                }else{
                    /**
                     * If it's the first request today, add the time
                     * After logging out and logging in again, the login time will be added.
                     */
                    store.commit('set_time',today)
                }
            }
            return response.data;
        },error => {
            interceptorHandler(error)
        }
    )
    return instance1(config)
}
/**
* @description:  used for handling the response for backend-api
* @author yuan.cao@utbm.fr
* @param axios error response
* @date 2022-04-27 16:06:49
*/
function interceptorHandler(error){
    let alertMes = "error!"
    if(error.response){//Prevent long-term unresponsive status from becoming undefined
        switch (error.response.status) {
            case 410:
                alertMes = "No token yet";
                break;
            case 412:
                alertMes = "Invalid token";
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('nowTime');
                break;
            default:
                alertMes = "Unknown error";
                console.log(error);
                break;
        }
        if(error.code==="ERR_NETWORK"){//cross-domain error, happen one in ten, especially first open browser, not-resolved bug
            window.location.reload();
        }else {
            ElMessageBox.alert(alertMes + ", please re-login", "Attention!", {
                confirmButtonText: 'OK',
                callback: () => {
                    window.location.replace("/")
                }
            }).catch(r => console.log(r))
        }
    }else{
        ElMessageBox.alert("Please refreshed", "Attention!", {
            confirmButtonText: 'OK',
            callback: () => {
                window.location.reload();
            }
        }).catch(r => console.log(r))
    }
}