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

export function formatDate(date, fmt) {
  // 获取年份

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  // M+ -> 正则表达式中的一个规则 '+'表示一个或者多个

  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}
