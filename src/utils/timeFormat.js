export function formatSeconds (theTime) {
  let theTime1 = 0
  let theTime2 = 0
  if (theTime > 60) {
    theTime1 = parseInt((theTime / 60).toString())
    theTime = parseInt((theTime % 60).toString())
    if (theTime1 > 60) {
      theTime2 = parseInt((theTime1 / 60).toString())
      theTime1 = parseInt((theTime1 % 60).toString())
    }
  }
  let result = '' + parseInt(theTime) + '秒'
  if (theTime1 > 0) {
    result = '' + parseInt((theTime1).toString()) + '分' + result
  }
  if (theTime2 > 0) {
    result = '' + parseInt((theTime2).toString()) + '小时' + result
  }
  return result
}
