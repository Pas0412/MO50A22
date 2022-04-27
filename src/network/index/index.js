/**
* @description: ajax for getting the data in the index
* @author yuan.cao@utbm.fr
* @date 2022-04-27 15:33:27
* @version 1.0
*/

import {request} from "@/network/request";

/**
* @description: getting all the data of plats
* @date 2022-04-27 15:34:58
*/
export function getAllPlats(){
    return new Promise((resolve,reject)=>{
        request({
            url:'/queryAllPlats',
            method:'get',
        }).then(data=>resolve(data)).catch(err=>reject(err))
    })
}
