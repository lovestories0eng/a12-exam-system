import {Message} from "element-ui";

export default function judgmentOfQuestionMakingSpeed(){
    let gap,
        lastTime
    return {
        doing(container){
            console.log(container)
            if(container.length !== 0 ) lastTime = container.at(-1);
            (container.at(-1) && container.at(-2)) && (gap = container.at(-1)-container.at(-2));
            if(gap < 3000){
                Message.error("psh提醒你:'李在淦神魔'")
            }
        },
        submitting(container){
            if(container.at(-1) - container.at(0) < 60000){
                return true
            }
        }
    }
}
