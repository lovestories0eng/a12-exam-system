import {serviceTwo} from "utils/request";

export default function getSwitchTimes(id){
    let form = new window.FormData()
    form.append('examId',id)
    return serviceTwo({
        url:'/exam/cutScreenTime/get',
        method:'post',
        data:form
    })
}
