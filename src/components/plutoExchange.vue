<template>
    <div class="plutoExchange">
        <div id="plutoExchange_chart"></div>
    </div>
</template>

<script>
import { plutoDateList, plutoValueList, chartOptions } from "@/utils/chartsData"

export default {
    data() {
        return {
            myChartChina: null
        }
    },
    computed: {
        chartOptions() {
            let options = JSON.parse(JSON.stringify(chartOptions))
            options.xAxis.data = plutoDateList
            options.series = {
                type: "line",
                showSymbol: false,
                data: plutoValueList,
                lineStyle: {
                    color: "rgb(0,255,204)"
                },
                itemStyle: {
                    color: "rgb(0,255,204)"
                }
            }
            return options
        }
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.myChartChina.resize)
    },
    mounted() {
        this.initCharts()
    },
    methods: {
        initCharts() {
            this.myChartChina = this.$echarts.init(document.getElementById("plutoExchange_chart"))
            window.addEventListener("resize", this.myChartChina.resize)
            this.myChartChina.setOption(this.chartOptions)
        }
    }
}
</script>

<style scoped>
.plutoExchange {
    position: relative;
    width: 100%;
    height: 100%;
}
#plutoExchange_chart {
    width: 100%;
    height: 100%;
}
</style>
