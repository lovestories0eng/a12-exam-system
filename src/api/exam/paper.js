import {serviceTwo} from "utils/request";
import {getToken, getUserId} from "utils/auth"

export function getOnGoingPaper(examId) {
  return serviceTwo({
    url: '/exam/paper',
    method: 'post',
    data: {
      token: getToken(),
      userId: getUserId(),
      examId: examId
    }
  })
}

export function getHistoryPaper(examId) {
  return serviceTwo({
    url: '/exam/paper/history',
    method: 'post',
    data: {
      token: getToken(),
      userId: getUserId(),
      examId: examId
    }
  })
}

export function submitAnswer(examId, answers) {
  return serviceTwo({
    url: '/exam/submit',
    method: 'post',
    data: {
      examId: examId,
      token: getToken(),
      userId: getUserId(),
      answers: answers
    }
  })
}
