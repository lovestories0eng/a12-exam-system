<template>
  <div>
    <el-table
      :data="dataOrigin"
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
        prop="outLookTime"
        label="切屏次数"
      >
      </el-table-column>
      <el-table-column
        prop="abnormalBehavior"
        label="异常描述"
      >
      </el-table-column>
      <el-table-column
        prop="studentCondition"
        label="状态"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "StatisticalTable",
  props:{
    dataOrigin:{type:Array,default(){return []}}
  },
}
</script>

<style scoped>

</style>
