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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  // 只要进来的图表数据有变化，就重新渲染
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  // mounted 钩子中创建图表
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  // 实例即将销毁时清空/注销实例
  beforeUnmount() {
    if (!this.chart) {
      return
    }
    // dispose 销毁方法 echarts
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    // 初始化实例，并且渲染
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
    // 渲染方法 接受主要数据
    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [{
          name: 'expected', itemStyle: {
            color: '#FF005A',
            lineStyle: {
              color: '#FF005A',
              width: 2
            }
          },
          smooth: true,
          type: 'line',
          data: expectedData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: 'actual',
          smooth: true,
          type: 'line',
          itemStyle: {
            color: '#3888fa',
            lineStyle: {
              color: '#3888fa',
              width: 2
            },
            areaStyle: {
              color: '#f3f8ff'
            }
          },
          data: actualData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    }
  }
}
</script>
