import {serviceTwo} from "utils/request";
export default function sendSwitchTimes(id,times){
    let form = new window.FormData()
    form.append('cutScreenTime',times)
    form.append('examId',id)
    return serviceTwo({
        url:'/exam/cutScreenTime',
        method:'post',
        data:form
    })
}
