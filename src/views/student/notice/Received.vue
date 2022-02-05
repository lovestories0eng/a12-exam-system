<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-button class="editButton">批量编辑</el-button>
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

.editButton {
  margin: 5px;
}

</style>
