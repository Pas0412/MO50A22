import {getNews} from "@/network/news/news";

const news = {
    actions:{
        GetNews(){
            return new Promise((resolve,reject)=>{
                getNews().then(res=>resolve(res)).catch(err=>reject(err))
            })
        }
    }
}

export default news