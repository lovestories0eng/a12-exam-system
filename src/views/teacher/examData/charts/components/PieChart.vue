<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import * as echarts from 'echarts/lib/echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
    pieData: {
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
    pieData(value) {
      this.subjects = []
      value.forEach(item => {
        this.subjects.push(item.name)
      })
      this.reinitializeChart()
    }
  },
  created() {
    if (this.pieData !== undefined) {
      this.subjects = []
      this.pieData.forEach(item => {
        this.subjects.push(item.name)
      })
    }
    this.reinitializeChart()
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
          text: '学生薄弱与强势学科分析',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.subjects
        },
        series: [
          {
            name: '排名得分',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '46%'],
            data: this.pieData,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
