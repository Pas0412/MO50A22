/**
* @description: serve for the login
* @author yuan.cao@utbm.fr
* @date 2022-05-12 17:44:17
* @version 1.0
*/
import {login, logout} from "@/network/login/login";

const user={
    actions:{
        //login
        Login(context,userInfo){
            const username = userInfo.name.trim();
            return new Promise((resolve,reject)=>{
                login(username,userInfo.password).then(response=>{
                    // context.commit('')
                    resolve(response)
                }).catch(err=>{
                    reject(err)
                })
            })
        },
        LogOut(){
            return new Promise((resolve,reject) => {
                logout().then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
}

export default user;