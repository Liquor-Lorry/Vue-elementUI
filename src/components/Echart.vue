<template>
  <div style="height: 100%" ref="echart">
    echart
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  //通过props在父组件传数据过来
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    //有无坐标轴
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      echart: null,
      //有坐标轴(折线图 柱状图)
      axisOption: {
        legend: {
          textStyle: {
            color: '#555'
          }
        },
        //偏移
        grid: {
          left: '15%'
        },
        //悬浮提示
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              color: '#4169e1'
            }
          },
          axisLabel: {
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#4169e1'
              }
            }
          }
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b522',
          '#95706d',
          '#dc69aa',
          '#07a8a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
        series: []
      },
      //无坐标轴(饼图)
      normalOption: {
        tooltip: {
          trigger: 'item'
        },
        color: ['#0f78f4', '#dd536b', '#9462e5', '#f0e68c', '#e1bb22', '#39c362', '#3ed1cf'],
        series: []
      }
    }
  },
  //监听
  watch: {
    //监听当chartData发生变化初始化图表
    chartData: {
      handler: function() {
        this.initChart()
      },
      //深度监听
      deep: true
    },
    //监听折叠属性
    isFold() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    }
  },
  computed: {
    //判断有没有坐标轴
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    //获取是否折叠变量 来判断折叠情况
    isFold() {
      return this.$store.state.tab.isFold
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart)
  },
  destoryed() {
    window.removeEventListener('resize', this.resizeChart)
  },
  methods: {
    initChart() {
      //初始化图表时先渲染数据
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        //传进来的x轴数据
        this.axisOption.xAxis.data = this.chartData.xData
        //series
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    },
    resizeChart() {
      this.echart ? this.echart.resize() : ''
    }
  }
}
</script>
<style></style>
