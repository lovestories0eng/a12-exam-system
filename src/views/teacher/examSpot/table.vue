<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%"
  >
    <el-table-column
      prop="name"
      label="姓名"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="userId"
      label="学号"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="switchTimes"
      label="切屏次数"
    >
    </el-table-column>
    <el-table-column
      prop="description"
      label="异常描述"
    >
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
    >
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "StatisticalTable",
  data(){
    return {
      tableData:[{
        name:'psh',
        userId:'GGG',
        switchTimes:'2',
        description:'切屏超过五次',
        status:'离开考场'
      }]
    }
  }
}
</script>

<style scoped>

</style>
