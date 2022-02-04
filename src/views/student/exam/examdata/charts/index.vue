<template>
  <div class="dashboard-editor-container">
    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :height="'380px'" :chart-data="lineChartData" />
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
          <raddar-chart :height="'450px'" />
        </div>
      </el-col>
      <el-col :xs="36" :sm="36" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :height="'450px'" />
        </div>
      </el-col>
      <!--<el-col :xs="24" :sm="24" :lg="8">-->
      <!--  <div class="chart-wrapper">-->
      <!--    <bar-chart :height="'450px'" />-->
      <!--  </div>-->
      <!--</el-col>-->
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
  },
  data() {
    return {
      lineChartData: {
        actualData: [80, 82, 91, 54, 62, 70, 85, 76, 98, 87, 68, 98, 67, 87, 88],
        xAxisData: [
          '2021-08-24',
          '2021-08-27',
          '2021-09-02',
          '2021-09-06',
          '2021-09-09',
          '2021-09-16',
          '2021-09-19',
          '2021-09-23',
          '2021-09-26',
          '2021-09-29',
          '2021-10-04',
          '2021-10-09',
          '2021-10-19',
          '2021-10-24',
          '2021-10-29'
        ]
      }
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
