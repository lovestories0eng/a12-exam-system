<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :title="'考试成绩'" :height="'380px'" :chart-data="lineChartData" />
    </el-row>
    <!--
      gutter是各col之间的间距
      每行总共24个栅格，在不同尺寸的页面上如何分配宽度比例
      名称	尺寸
      xs	<768px
      sm	≥768px
      md	≥992px
      lg	≥1200px
      xl	≥1920px
    -->
    <el-row :gutter="32">
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <raddar-chart :raddar-data="raddarData" :raddar-indicator="raddarIndicator" :height="'450px'" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :pie-data="pieData" :height="'450px'" />
        </div>
      </el-col>
    </el-row>
    <el-card>
      <Select :subjects="subjects" @changeOption="changeOption"></Select>
      <LineChart v-if="Object.keys(subjectShow).length !== 0" :chart-data="subjectShow"></LineChart>
      <el-empty v-else description="请选择科目"></el-empty>
    </el-card>
  </div>
</template>

<script>
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import Select from "./components/Select";

import {getSingleSubjectPerformanceCurve} from '@/api/examData/student'
import {getChartData} from "@/api/examData";

export default {
  name: 'DataBoard',
  components: {
    LineChart,
    RaddarChart,
    PieChart,
    Select
  },
  data() {
    return {
      subjects: [],
      lineChartData: {},
      raddarData: [],
      raddarIndicator: [],
      pieData: [],
      subjectData: [],
      subjectShow: {}
    }
  },
  created() {
    let singleSubjectCurve = new FormData()
    singleSubjectCurve.append('majorId', '1')
    getSingleSubjectPerformanceCurve(singleSubjectCurve)
    .then(res => {
      console.log(res)
    })

    getChartData(this.$store.getters.studentId)
    .then(res => {
      res = res.data
      this.raddarData = res.raddarData.raddarData
      this.raddarIndicator = res.raddarData.raddarIndicator
      this.lineChartData = res.lineData
      this.pieData = res.pieData
      this.subjectData = res.subjectData
      this.subjectData.forEach(item => {
        this.subjects.push(item.name)
      })
    })
  },
  methods: {
    changeOption(type) {
      this.subjectShow = this.subjectData.find(item => {
        return item.name === type
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
