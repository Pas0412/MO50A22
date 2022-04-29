/**
* @description: unique websocket establishment file
* @author yuan.cao@utbm.fr
* @date 2022-04-29 19:49:42
* @version 1.0
*/
const {socketUrl} = require("@/utils/const/const");
let socket;
/**
 * @description: establish the websocket connection with the server
 * @param cantineID the id of the cantine
 * @author yuan.cao@utbm.fr
 * @date 2022-04-29 19:07:10
 */
function openSocket(cantineID) {

    const socketUrlComplet = socketUrl+cantineID;
    console.log(socketUrlComplet);
    if(socket!=null){
        socket.close();
        socket=null;
    }
    socket = new WebSocket(socketUrlComplet);
    //打开事件
    socket.onopen = function() {
        console.log("websocket is opened");
    };
    //获得消息事件
    socket.onmessage = function(msg) {
        console.log(msg.data);
        //发现消息进入,开始处理前端触发逻辑
    };
    //关闭事件
    socket.onclose = function() {
        console.log("websocket is closed");
    };
    //发生了错误事件
    socket.onerror = function() {
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
    socket.send('{"cantineID":"'+cantineID+'","contentText":"'+contentText+'"}');
    console.log('{"cantineID":"'+cantineID+'","contentText":"'+contentText+'"}');
}

export {openSocket,sendMessage}