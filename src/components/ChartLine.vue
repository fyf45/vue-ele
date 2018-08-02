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
                type: Array
            },
            dimensions: {
                type: Array
            },
            series: {
                type: Array
            },
            yAxis:{
                type: Array
            }
        },
        data() {
            return {
                chart: null
            }
        },
        computed: {
            options() {
                return {
                    series: this.series,
                    //使用dataset加载数据
                    dataset: {
                        dimensions: this.dimensions,
                        source: this.chartData
                    },
                    title: {
                        text: this.title
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {
                            alignWithLabel: true
                        }
                    },
                    yAxis: this.yAxis,
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        },
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
