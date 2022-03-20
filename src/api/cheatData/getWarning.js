import {serviceTwo} from "utils/request";
export default function getWarning(examId){
    let form  = new window.FormData()
    form.append('examId',examId)
    return serviceTwo({
        url:'/exam/studentMessage/get',
        method:'post',
        data:form
    })
}
