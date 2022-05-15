import {request} from "@/network/request";
import {cantineID} from "@/utils/const/const";

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