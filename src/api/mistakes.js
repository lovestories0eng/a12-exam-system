import request from "utils/request";

export default {
  pageList(query)  {
    return request({
    url: '/web/student/question/answer/page',
    method: 'post',
    query: query
  })},
  select: id => request({
    url: '/web/student/question/answer/list',
    method: 'post',
    params: { id }
  })
                                                                                                                                            }
