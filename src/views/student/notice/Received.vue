<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          考试通知
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          成绩推送
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Received"
}
</script>

<style scoped>
.bg-purple-dark {
  background: #99a9bf;
}

.grid-content {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: center;
  margin: 25px;
  border-radius: 4px;
  min-height: 36px;
}

</style>
