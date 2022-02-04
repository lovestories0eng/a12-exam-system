<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts/lib/echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeUnmount() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        title: {
          text: '学科实力分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '48%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 0.5,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '最高分'},
            { name: '最低分'},
            { name: '平均分'},
            { name: '优秀率'},
            { name: '及格率'},
            { name: '答题速度'}
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['高等数学', '大学物理', '大学英语精读', '概率论与数理统计', '线性代数']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            shadowBlur: 13,
            shadowColor: 'rgba(0,0,0,.2)',
            shadowOffsetX: 0,
            shadowOffsetY: 10,
            opacity: 1
          },
          data: [
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
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
