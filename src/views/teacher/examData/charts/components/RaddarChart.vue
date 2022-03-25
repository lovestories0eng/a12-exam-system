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
    },
    raddarData: {
      type: Array,
      default() {
        return undefined
      }
    },
    raddarIndicator: {
      type: Array,
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      chart: null,
      subjects: []
    }
  },
  // 用于数据的异步传输
  watch: {
    raddarData(value) {
      this.subjects = []
      value.forEach(item => {
        this.subjects.push(item.name)
      })
      this.reinitializeChart()
    }
  },
  created() {
    if (this.raddarData !== undefined) {
      this.subjects = []
      this.raddarData.forEach(item => {
        this.subjects.push(item.name)
      })
      this.reinitializeChart()
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
          text: '学生学科实力分析',
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
          indicator: this.raddarIndicator
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.subjects
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
          data: this.raddarData,
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
