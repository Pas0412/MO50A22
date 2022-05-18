import {request} from "@/network/request";
import {cantineID, uploadAddress} from "@/utils/const/const";
import axios from "axios";

/**
* @description: admin ajax
* @author yuan.cao@utbm.fr
* @date 2022-05-15 22:08:29
* @version 1.0
*/
export function updatePlat(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/updatePlat',
            method:'post',
            data:{
                id:param.id,
                name:param.name,
                content:param.content,
                type:param.type,
                day:param.day,
                imgurl:param.imgurl
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function deletePlat(id){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/deletePlat',
            method:'post',
            params:{
                id
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function realDeletePlat(id){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/realDeletePlat',
            method:'post',
            params:{
                id
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function restorePlat(id){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/restorePlat',
            method:'post',
            params:{
                id
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}

/**
 * @description: get all deleted file (dr=1)
 * @author yuan.cao@utbm.fr
 * @date 2022-05-16 00:43:55
 */
export function getAllDeletedPlats(){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/queryAllDeletePlats',
            method:'get',
            params:{
                cid: cantineID
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}

/**
* @description: upload file using qiniuyun cloud
* @author yuan.cao@utbm.fr
* @date 2022-05-16 10:30:59
*/
export function uploadFile(params){
    //use raw axios
    return axios.post(uploadAddress,params,{
        headers:{"content-type":"multipart/form-data"}
    })
}
/**
* @description: add a new plat
* @author yuan.cao@utbm.fr
* @date 2022-05-16 11:58:29
*/
export function addPlat(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/addPlat',
            method:'post',
            data:{
                name:param.name,
                content:param.content,
                type:param.type,
                day:param.day,
                imgurl:param.imgurl,
                cid:param.cid
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
/*news domain start*/
/**
* @description: delete all selected news
* @author yuan.cao@utbm.fr
* @date 2022-05-16 22:08:33
*/
export function deleteNews(selectedArr){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/deleteNews',
            method:'post',
            data:{
                selectedArr
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function updateNews(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/updateNews',
            method:'post',
            data:{
                id:param.id,
                content:param.content,
                time:param.time
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function addNews(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/addNews',
            method:'post',
            data:{
                time:param.time,
                content:param.content,
                cid:param.cid
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}

export function getAllUsers(){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/getAllUsers',
            method:'get',
            params:{
                cid: cantineID
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}

export function updatePwd(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/updatePwd',
            method:'post',
            params:{
                id:param.id,
                name:param.name,
                oldPassword: param.oldPassword,
                newPassword: param.newPassword
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
export function updateUser(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/updateUser',
            method:'post',
            data:{
                id:param.id,
                name:param.name,
                role:param.role
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}

export function addUser(param){
    return new Promise((resolve,reject)=>{
        request({
            url:'/admin/addUser',
            method:'post',
            data:{
                name:param.name,
                password:param.password,
                role:param.role,
                cid:cantineID
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}