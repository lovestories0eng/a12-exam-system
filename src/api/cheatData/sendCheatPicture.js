
import {serviceTwo} from "utils/request";
export default function sendCheatPicture(imgBase64,examId,studentCondition='normal'){
    let form = new window.FormData()
    form.append('picture',imgBase64)
    form.append('examId',examId)
    form.append('studentCondition',studentCondition)
    console.log(form)
    return serviceTwo({
        url:'/exam/cheatData',
        method:'post',
        data:form
    })
}
