/**
* @description: ajax for login
* @author yuan.cao@utbm.fr
* @date 2022-05-12 17:45:22
* @version 1.0
*/
import {request} from "@/network/request";

export function login(name, password){
    return request({
        url:'/login',
        method:'post',
        data:{
            name,
            password
        }
    })
}
export function logout(){
    return request({
        url:'/logout',
        method:'get'
    })
}