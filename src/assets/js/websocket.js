/**
* @description: unique websocket establishment file, attached to App.vue
* @author yuan.cao@utbm.fr
* @date 2022-04-29 19:49:42
* @version 1.0
*/
const {socketUrl} = require("@/utils/const/const");

/*to get the vue instance (this) which uses this script */
export let vm = null;

const sendThis = ( _this )=> {
    vm = _this;
};
export function sendThisOut(_this){
    sendThis(_this) //expose
}

/**
 * @description: establish the websocket connection with the server
 * @param cantineID the id of the cantine
 * @author yuan.cao@utbm.fr
 * @date 2022-04-29 19:07:10
 */
function openSocket(cantineID) {

    const socketUrlComplet = socketUrl+cantineID;
    console.log(socketUrlComplet);
    if(vm.socketCon!=null){
        vm.socketCon.close();
        vm.socketCon=null;
    }
    vm.socketCon = new WebSocket(socketUrlComplet);
    //打开事件
    vm.socketCon.onopen = function() {
        console.log("websocket is opened");
    };
    //获得消息事件
    vm.socketCon.onmessage = function(msg) {
        vm.curWebSocketData = msg.data;
        vm.$forceUpdate();
        //发现消息进入,开始处理前端触发逻辑
    };
    //关闭事件
    vm.socketCon.onclose = function() {
        console.log("websocket is closed");
    };
    //发生了错误事件
    vm.socketCon.onerror = function() {
        console.log("websocket goes wrong");
    }
}
/**
* @description: send message from client to server
 *@param cantineID the id of the targeted canteen
 *@param contentText the text to be sent
* @author yuan.cao@utbm.fr
* @date 2022-04-29 19:47:41
*/
function sendMessage(cantineID,contentText) {
    vm.socketCon.send('{"toCanteenID":"'+cantineID+'","contentText":"'+contentText+'"}');
    console.log('{"toCanteenID":"'+cantineID+'","contentText":"'+contentText+'"}');
}

export {openSocket,sendMessage}