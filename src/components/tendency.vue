<template>
  <div class="line1">
    <h1></h1>
    <div id="line" style="width:90%;height:500px;"></div>
  </div>
</template>
<script type="text/javascript">
  import echarts from 'echarts'
  export default {
    name: 'tendency',
    mounted () {
      this.myChart = echarts.init(document.getElementById('line'))
      this.initData()
    },
    props: ['sevenDate', 'sevenDay'],
    methods: {
      initData () {
        const colors = ['#d14a61', '#5793f3', '#675bba', '#13CE66']
        const option = {
          color: colors,
          title: {
            text: '走势图',
            subtext: 'API请求量'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['API请求量', '新注册用户', '新增订单', '新增管理员']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name: 'API请求量',
              type: 'line',
              data: [11, 11, 15, 13, 12, 13, 10],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name: '新注册用户',
              type: 'line',
              data: [1, -2, 2, 5, 3, 2, 0],
              markPoint: {
                data: [
                  {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'},
                  [{
                    symbol: 'none',
                    x: '90%',
                    yAxis: 'max'
                  }, {
                    symbol: 'circle',
                    label: {
                      normal: {
                        position: 'start',
                        formatter: '最大值'
                      }
                    },
                    type: 'max',
                    name: '最高点'
                  }]
                ]
              }
            },
            {
              name: '新增订单',
              type: 'line',
              data: [8, 10, 11, 0, 12, 11, 15],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            },
            {
              name: '新增管理员',
              type: 'line',
              data: [6, 7, 8, 9, 11, 10, 7],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        }
        this.myChart.setOption(option)
      }
    },
    watch: {
      sevenDate: function () {
        this.initData()
      },
      sevenDay: function () {
        this.initData()
      }
    }
  }
</script>
