<template>
    <div class="prefecturalGovernment">
        <div id="prefecturalGovernment_chart"></div>
    </div>
</template>

<script>
import { chartOptions } from "@/utils/chartsData"

export default {
    data() {
        return {
            myChartChina: null
        }
    },
    computed: {
        chartOptions() {
            let options = JSON.parse(JSON.stringify(chartOptions))
            options.xAxis.show = false
            options.yAxis.show = false
            options.series = [
                {
                    name: "地府运营指标统计",
                    type: "pie",
                    radius: ["50%", "70%"],
                    label: {
                        show: false,
                        position: "center"
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "20",
                            fontWeight: "bold"
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        { value: 335, name: "gdb指标" },
                        { value: 310, name: "市场指标" },
                        { value: 234, name: "广告指标" },
                        { value: 135, name: "推广指标" }
                    ]
                }
            ]
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
            this.myChartChina = this.$echarts.init(document.getElementById("prefecturalGovernment_chart"))
            window.addEventListener("resize", this.myChartChina.resize)
            this.myChartChina.setOption(this.chartOptions)
        }
    }
}
</script>

<style scoped>
.prefecturalGovernment {
    position: relative;
    width: 100%;
    height: 100%;
}
#prefecturalGovernment_chart {
    width: 100%;
    height: 100%;
}
</style>
