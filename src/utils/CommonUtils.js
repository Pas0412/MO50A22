/**
* @description: common utils
* @author yuan.cao@utbm.fr
* @date 2022-05-21 17:42:25
* @version 1.0
*/
//format date：yyyy/MM/dd
export function formatDate(date) {
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "/" + mymonth + "/" + myweekday);
}
/**
 * Generate random integers, including the lower value, but not the upper value
 * @param {Number} lower
 * @param {Number} upper
 * @return {Number} Returns a random integer between the lower and upper bounds
 */
export function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

