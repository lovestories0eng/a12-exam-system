<template>
  <div class="compare">
    <div class="loginPage">
      <p>登陆照片</p>
      <img :src="systemPage.picUrl" alt="">
    </div>
    <div class="newestPicture">
      <p>最新照片</p>
      <img v-if="newestPage" :src="newestPage.picUrl" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "comparePictures",
  props:{
    systemPage:{
      type:Object,
      default(){
        return {
          picUrl:'lazy-loading/loading.gif'
        }
      }
    },
    userId:{
      type:Number,
      default() {
        return 0;
      }
    },
    newestPage:{
      type:Object,
      default(){
        return {
          picUrl:'lazy-loading/loading.gif'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.compare{
  margin: 0 auto;
  display: flex;
  justify-content: space-evenly;
  p{
    text-align: center;
  }
  img{
    width: 200px;
    height: 200px;

  }
}
</style>
