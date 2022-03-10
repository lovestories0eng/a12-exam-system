//一定时间内内声音过大将对考生进行提醒
export default function detectionLargeSound(standardDecibel) {
    let array = [];
    let times = 0;
    let canAverage = false,
        canShift = false;
    for (let i = 0; i < array.length; i++) {
        array[i] = 0;
    }
    let count = 0
    return function (decibel) {
        let average = 0;
        times = times % 1024;
        if(canShift) array.shift()
        array.push(decibel);
        times += 1;
        if(!canAverage && !canShift) canAverage = canShift = times === 1024;
        if (canAverage) average = array.reduce((pre, cur) => pre + cur, average);
        if(average / 1024 > standardDecibel){
            canAverage = canShift = false
            array = []
            count += 1
        }
        if(count === 10){
            count = 0
            return true
        }
        return false
    };
}
