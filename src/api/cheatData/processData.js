export default function processData(value){
    return value.map((item)=>{
        item.studentCondition = item.studentCondition?item.studentCondition:''
        if(item.outLookTime >= 5){
            item.outLookTime = 5
            item.abnormalBehavior = '切屏次数过多判定为作弊取消考试成绩'
        }else{
            item.abnormalBehavior = '无'
        }
        item.studentCondition = item['studentCondition']?item['studentCondition']:'未进入考试'
        return item
    })
}
