<template>
  <div class="allpages" style="width: 80%;height: 500px;display: flex;flex-wrap: wrap;margin:0 auto;margin-top: 50px;">
    <div v-for="(item,index) of allPages" :key="item.userId + index + ''">
      <img v-lazy="item.picUrl" alt="" style="width: 150px;height: 150px;margin-right: 20px">
      <p>{{ processTimeTamp(item.getTime) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AllPages",
  props:{
    allPages:{
      type:Array,
      default(){
        return []
      }
    }},
  methods:{
    processTimeTamp(time){
      let date = new Date(time).toJSON();
      return new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  }
}
</script>

<style scoped>
.allpages{
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
