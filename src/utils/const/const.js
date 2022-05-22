/**
* @description: all the constants in the project
* @author yuan.cao@utbm.fr
* @date 2022-04-27 16:05:15
* @version 1.0
*/
//internal const
const httpOrHttps = 'http://'
const serverUrl = 'server.cklovery.life'

//general const
const cantineID = '1'
const refreshMenuInterval = 100 //the interval to refresh the menu
const adminRoleId = 0
const universityWebsite = 'https://www.utbm.fr'
const intervalUpdateDataAdminIndexProd = 1000*60*3
const intervalUpdateDataAdminIndexDev = 1000*2
const maxNumForChart = 7

//api const
const baseURL = httpOrHttps+serverUrl
const socketUrl = 'ws://'+serverUrl+'/ws/connection/'
const sessionExpiredTime = 1000*60*30//30 min

//qiniuyun cloud upload file
const uploadAddress = baseURL+'/admin/uploadFile'
const maxUploadFileSize = 100

//mitt constant
/**
 * to resolve the bug:
 * after login succeeds, before the data returned from the backend is set into vuex,
 * the method showPersonPage from (AdminSidebar.vue?b98b:84:1) needs the data from vuex,
 * so it gets null, causes error for json parsing
 * @type {string}
 */
const ADMIN_SHOW_AFTER_LOGIN_DATA_RETURN = "login_show";
export {httpOrHttps,cantineID,refreshMenuInterval,adminRoleId,universityWebsite,maxNumForChart,intervalUpdateDataAdminIndexDev,intervalUpdateDataAdminIndexProd,baseURL,socketUrl,uploadAddress,maxUploadFileSize,sessionExpiredTime,ADMIN_SHOW_AFTER_LOGIN_DATA_RETURN}