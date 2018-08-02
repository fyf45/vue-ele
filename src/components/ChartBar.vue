<template>
  <!--https://github.com/ecomfe/vue-echarts/blob/master/README.zh_CN.md-->
  <!--https://ecomfe.github.io/echarts-doc/public/cn/api.html#echarts-->
  <chart :options="options" :style="{height:height,width:width}"></chart>
</template>

<script>
    import helper from '@/mixins/helper'

    export default {
        mixins: [helper],
        props: {
            title: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '350px'
            },
            chartData: {
                type: Object
            },
            dimensions: {
                type: Array
            },
            //横向
            horizontal:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                chart: null
            }
        },
        computed: {
            options() {
                var series = []
                for (var i = 1; i < this.dimensions.length; i++) {
                    series.push({type: 'bar'})
                }
                return {
                    series,
                    //使用dataset加载数据
                    dataset: {
                        dimensions: this.dimensions,
                        source: this.getSource(this.chartData)
                    },
                    title: {
                        text: this.title
                    },
                    xAxis: {
                        type: this.horizontal?'value':'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: this.horizontal?'category':'value',
                        inverse: this.horizontal,
                        axisTick: {
                            show: false
                        }
                    },
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    }
                }
            }
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    }
</script>