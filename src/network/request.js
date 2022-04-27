/**
* @description: file for configuration of ajax request
* @author yuan.cao@utbm.fr
* @date 2022-04-27 16:09:05
* @version 1.0
*/
import axios from "axios";
import {baseURL} from "@/utils/const/const";

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
            return config;
        },
        error => {
            console.log(error);
            return Promise.reject(error)
        })

    //response handler
    instance1.interceptors.response.use(
        response=>{
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
    //do...
    console.log(error);
}