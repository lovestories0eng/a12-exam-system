import {serviceTwo} from "utils/request";
export default function sendWarning(examId,userId,studentMessage){
    let form = new window.FormData()
    form.append('examId',examId)
    form.append('userId',userId)
    form.append('studentMessage',studentMessage)
    return serviceTwo({
        url:'/exam/studentMessage',
        method:'post',
        data:{
        examId,
            userId,
            studentMessage
    }
})
}
