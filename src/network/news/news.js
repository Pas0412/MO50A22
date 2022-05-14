import {request} from "@/network/request";
import {cantineID} from "@/utils/const/const";

/**
 * @description: getting all the data of plats
 * @date 2022-05-14 14:40:58
 */
export function getNews(){
    return new Promise((resolve,reject)=>{
        request({
            url:'/queryAllNews',
            method:'get',
            params:{
                cid: cantineID
            }
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}