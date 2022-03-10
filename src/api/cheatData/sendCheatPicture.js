
import {serviceTwo} from "utils/request";
export default function sendCheatPicture(imgBase64,examId){
    let form = new window.FormData()
    form.append('picture',imgBase64)
    form.append('examId',examId)
    console.log(form)
    return serviceTwo({
        url:'/exam/cheatData',
        method:'post',
        data:form
    })
}
