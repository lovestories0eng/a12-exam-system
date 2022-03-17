import {serviceTwo} from "utils/request";

export  default function getAllExamId(){
    return serviceTwo({
        url:'/exam/teacher/get',
        method:'get',
    })
}
