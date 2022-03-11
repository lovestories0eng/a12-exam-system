<template>
  <div class="oneImgItem">
    <img :src="imgItem.picUrl" alt="">
    <p class="userId">{{ "学号:"+imgItem.userId }}</p>
  </div>
</template>

<script>
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
