<template>
  <div id="app">
    <router-view v-if="isReload"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return{
      isReload:true
    }
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  methods: {
    reload() {
      this.isReload = false
      this.$nextTick(() => {
        this.isReload = true
      })
    }
  }
}
</script>

<style>
html { overflow: scroll; }
</style>
