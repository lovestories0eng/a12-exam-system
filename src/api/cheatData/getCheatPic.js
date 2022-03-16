import {serviceTwo} from "utils/request";

export default function getCheatPic(id){
    let form = new window.FormData()
    form.append('examId',id)
    return serviceTwo({
        url:'/exam/cheatData',
        method:'get',
        data:form
    })
}
