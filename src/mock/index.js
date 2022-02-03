import Mock from 'mockjs'
const user = require('./user')
import {getPageOne, getList, getExamList, getExamPaper, getExamResult, getReadData} from "@/mock/examPaper";

function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      obj[name] = v.substring(index + 1, v.length)
    }
  })
  return obj
}

function XHR2ExpressReqWrap(respond) {
  return function(options) {
    let result = null
    if (respond instanceof Function) {
      const { body, type, url } = options
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url)
      })
    } else {
      result = respond
    }
    return Mock.mock(result)
  }
}

const mocks = [
  ...user
]
for (const i of mocks) {
  Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
}

Mock.mock('/web/student/question/answer/page', 'post', getPageOne)
Mock.mock('/web/student/question/answer/list?id=student', 'post', getList)
Mock.mock('/web/student/classification?studentId=20141331', 'post', getExamList)
Mock.mock('/web/student/exam/paper/select?id=4&studentId=20141331', 'post', getExamPaper)
Mock.mock('/web/student/exam/paper/answer/answerSubmit', 'post', getExamResult)
Mock.mock('/web/student/exampaper/answer/read?id=1&studentId=20141331', 'post', getReadData)
Mock.mock('/web/student/exampaper/answer/read?id=2&studentId=20141331', 'post', getReadData)
Mock.mock('/web/student/exampaper/answer/read?id=3&studentId=20141331', 'post', getReadData)
