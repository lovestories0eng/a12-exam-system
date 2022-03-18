import {serviceTwo} from "utils/request";

export default function modifyStatus(id,condition){
    let form = new window.FormData()
    form.append('condition',condition)
    form.append('examId',id)
    return serviceTwo({
        url:'/exam/student/condition',
        method:'post',
        data:form
    })
}
