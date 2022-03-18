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

import { getGeneralExaminationData, getSubjectGrades } from '@/api/examData/student'
import {formatDate} from "utils/timeFormat";

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
      subjectData: [],
      subjectShow: {},
      majorIdMapMajorName: {},
      raddarData: [
        {
          value: [50, 70, 120, 110, 150, 140],
          name: '高等数学'
        },
        {
          value: [40, 90, 150, 150, 130, 110],
          name: '大学物理'
        },
        {
          value: [55, 110, 120, 150, 120, 120],
          name: '大学英语精读'
        },
        {
          value: [80, 70, 110, 180, 100, 60],
          name: '概率论与数理统计'
        },
        {
          value: [45, 90, 50, 50, 70, 100],
          name: '线性代数'
        }
      ],
      raddarIndicator: [
        { name: '最高分'},
        { name: '最低分'},
        { name: '平均分'},
        { name: '优秀率'},
        { name: '及格率'},
        { name: '答题速度'}
      ],
      pieData: [
        { value: 95, name: '高等数学' },
        { value: 80, name: '大学物理' },
        { value: 78, name: '大学英语精读' },
        { value: 60, name: '概率论与数理统计' },
        { value: 40, name: '线性代数' }
      ]
    }
  },
  created() {
    let majors = {
      majors: [1, 2, 3, 4, 5, 6]
    }
    getSubjectGrades(majors)
    .then(res => {
      res = res.data
      console.log(res)
      for (let i=0;i<res.length;i++) {
        this.subjects.push(res[i].majorName)
        this.subjectData.push({ name: res[i].majorName, xAxisData: res[i].chapterId, yAxisData: res[i].grades })
      }
      console.log(this.subjectData)
    })

    getGeneralExaminationData()
    .then(res => {
      let timeList = res.timeList
      for (let i=0;i<timeList.length;i++) {
        let tmp = new Date(timeList[i])
        timeList[i] = formatDate(tmp, 'yyyy-MM-dd')
      }
      this.lineChartData = {
        xAxisData: timeList,
        yAxisData: res.gradeList
      }

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
