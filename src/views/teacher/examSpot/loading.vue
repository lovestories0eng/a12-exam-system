<template>
  <div class="wrap color-A">
    <p>加载数据中,请稍等</p>
    <div class="k-line k-lineA-1"></div>
    <div class="k-line k-lineA-2"></div>
    <div class="k-line k-lineA-3"></div>
    <div class="k-line k-lineA-4"></div>
    <div class="k-line k-lineA-5"></div>
  </div>
</template>

<script>
export default {
  name: "loading"
}
</script>

<style scoped lang="scss">
.wrap{
  z-index: 9999999999;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  p{
    text-align: center;
  }
}
.k-line{
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 30px;
  margin-right: 20px;
  background-color: #0aaeb3;
  //border-radius: 12px;
}
@keyframes k-loadingA {
  50%{
    height:40px;
  }
  100%{
    height: 15px;
  }
}
.k-lineA-1{
  animation:k-loadingA 1.5s 0s linear;
}
.k-lineA-2{
  animation:k-loadingA 1.5s 0.3s linear;
}
.k-lineA-3{
  animation:k-loadingA 1.5s 0.6s linear;
}
.k-lineA-4{
  animation:k-loadingA 1.5s 0.9s linear;
}
.k-lineA-5{
  animation:k-loadingA 1.5s 1.2s infinite;
}
</style>
