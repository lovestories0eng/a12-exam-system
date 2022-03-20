<template>
  <div class="oneImgItem">
    <img v-lazy="imgItem.picUrl" alt="" @click="sendWarning">
    <p class="userId">{{ "学号:"+imgItem.userId }}</p>
  </div>
</template>

<script>
import sendWarning from "@/api/cheatData/sendWarning";
import {Message} from "element-ui";

export default {
  name: "oneImgItem",
  props:{
    imgItem:{
      type :Object,
      default()
      {
        return{
          picUrl:'',
          userId:''
        }
      }
    },
    selectId:{
      type:String,
      default() {
        return undefined;
      }
    }
  },
  methods:{
    async sendWarning(){
      try {
        await sendWarning(this.$props.selectId,this.$props.imgItem.userId,'老师提醒请认真考试')
        Message.success('提醒成功')
      }catch (e){
        console.log(e.message)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.oneImgItem{
  min-height: 200px;
  max-width: 200px;
  margin-left: 20px;
  img{
    width: 125px;
    height: 125px;
  }
  p{
    text-align: center;
    padding: 0;
  }
}

</style>
