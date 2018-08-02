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
            }
        },
        data() {
            return {
                chart: null
            }
        },
        computed: {
            options() {
                var data=this.chartData.data,legend = []
                data.forEach((v,i)=>{
                    legend.push(v.name)
                })
                return {
                    series:{
                        type: 'pie',
                        radius: '60%',
                        center: ['40%', '50%'],
                        data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    title: {
                        text: this.title
                    },
                    legend: {
                        type: 'scroll',
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                        bottom: 20,
                        data:legend
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {c} ({d}%)"
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
