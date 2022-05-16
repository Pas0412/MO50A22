/**
* @description:  module for manipulating data of index
* @author yuan.cao@utbm.fr
* @date 2022-04-27 15:43:07
* @version 1.0
*/
import {getAllPlats, postNewNote} from "@/network/index";

const indexShow = {
    actions:{
        GetAllPlats(){
            return new Promise((resolve,reject)=>{
                getAllPlats().then(res=>resolve(res)).catch(err=>reject(err))
            })
        },
        PostNote(context, obj){
            return new Promise((resolve,reject)=>{
                    postNewNote(obj).then(res=>resolve(res)).catch(err=>reject(err))
                })
        }
    }
}

export default indexShow