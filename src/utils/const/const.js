/**
* @description: all the constants in the project
* @author yuan.cao@utbm.fr
* @date 2022-04-27 16:05:15
* @version 1.0
*/
//internal const
const httpOrHttps = 'http://'
const serverUrl = '127.0.0.1:8084'

//general const
const cantineID = '1'
const refreshMenuInterval = 100 //the interval to refresh the menu
const adminRoleId = 0

//api const
const baseURL = httpOrHttps+serverUrl
const socketUrl = 'ws://'+serverUrl+'/ws/connection/'
const sessionExpiredTime = 1000*10//30 min

export {cantineID,refreshMenuInterval,adminRoleId,baseURL,socketUrl,sessionExpiredTime}