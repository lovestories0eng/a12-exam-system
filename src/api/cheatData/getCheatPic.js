import {serviceTwo} from "utils/request";

export default function getCheatPic(id){
    console.log(id)
    let form = new window.FormData()
    form.append('examId',id)
    return serviceTwo({
        url:'/exam/cheatData/get',
        method:'post',
        data:form
    })
}
