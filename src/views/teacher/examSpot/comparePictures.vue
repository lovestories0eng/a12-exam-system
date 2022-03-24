<template>
  <div class="compare">
    <img  :src="systemPage.picUrl" alt="">
  </div>
</template>

<script>
export default {
  name: "comparePictures",
  props:{
    systemPage:{
      type:Object,
      default(){
        return null
      }
    },
    userId:{
      type:Number,
      default() {
        return 0;
      }
    }
  }
}
</script>

<style scoped>

</style>
