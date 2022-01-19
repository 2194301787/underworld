<template>
    <div class="home">
        <div class="home_nav">
            <div class="home_nav_left">
                <img src="../assets/u43.png" />
                <p>地府大数据可视化平台</p>
            </div>
            <div class="home_nav_right">
                <div @click="gotoDetail"><i class="el-icon-s-tools"></i></div>
                <div>{{ nowTime }}</div>
            </div>
        </div>
        <div class="home_map">
            <div id="home_map_canvas"></div>
            <div class="homeStatistics_left">
                <div class="homeStatistics_left_top">
                    <div class="homeStatistics_left_top_title">地府人数</div>
                    <div class="homeStatistics_left_top_number">19,861,016</div>
                </div>
                <div class="homeStatistics_left_mid">
                    <div
                        :class="[{ unActive: index !== itemIndex }]"
                        @click="selectItem(index)"
                        :key="item.id"
                        v-for="(item, index) in userData"
                        class="homeStatistics_left_mid_card"
                    >
                        <div class="homeStatistics_left_mid_card_title">
                            {{ item.title }}
                        </div>
                        <el-collapse-transition>
                            <div v-show="index === itemIndex" class="homeStatistics_left_mid_card_content">
                                <div class="humanNumber">
                                    <div class="homeStatistics_left_mid_card_content_left">本层人数</div>
                                    <div class="homeStatistics_left_mid_card_content_right">
                                        {{ item.humanNumber }}
                                    </div>
                                </div>
                                <div class="painValue">
                                    <div class="homeStatistics_left_mid_card_content_left">痛苦值</div>
                                    <div class="homeStatistics_left_mid_card_content_right">
                                        {{ item.painValue }}
                                    </div>
                                </div>
                                <div class="Supplies">
                                    <div class="homeStatistics_left_mid_card_content_left">物资补给</div>
                                    <div class="homeStatistics_left_mid_card_content_right">
                                        {{ item.Supplies }}
                                    </div>
                                </div>
                            </div>
                        </el-collapse-transition>
                    </div>
                </div>
                <div class="homeStatistics_left_bottom">
                    <div class="homeStatistics_left_bottom_title">地狱受刑人员性别</div>
                    <div class="homeStatistics_left_bottom_content">
                        <div class="homeStatistics_left_bottom_content_left">
                            <h4>6542</h4>
                            <p>男人</p>
                        </div>
                        <el-divider direction="vertical"></el-divider>
                        <div class="homeStatistics_left_bottom_content_right">
                            <h4>6542</h4>
                            <p>女人</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="homeStatistics_right">
                <div class="homeStatistics_right_top">
                    <div class="homeStatistics_right_top_left">
                        <div class="homeStatistics_label"></div>
                        <div class="homeStatistics_right_top_left_type">地府工作人员业绩统计</div>
                    </div>
                    <div class="homeStatistics_right_top_right">
                        <performanceStatistics />
                    </div>
                </div>
                <div class="homeStatistics_right_mid">
                    <div class="homeStatistics_right_mid_left">
                        <div class="homeStatistics_label"></div>
                        <div class="homeStatistics_right_top_left_type">冥币汇率变化</div>
                    </div>
                    <div class="homeStatistics_right_mid_right">
                        <plutoExchange />
                    </div>
                </div>
                <div class="homeStatistics_right_bottom">
                    <div class="homeStatistics_right_bottom_left">
                        <div class="homeStatistics_label"></div>
                        <div class="homeStatistics_right_top_left_type">地府运营指标统计</div>
                    </div>
                    <div class="homeStatistics_right_bottom_right">
                        <prefecturalGovernment />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "../utils/china"
import performanceStatistics from "@/components/performanceStatistics.vue"
import plutoExchange from "@/components/plutoExchange.vue"
import prefecturalGovernment from "@/components/prefecturalGovernment.vue"

export default {
    name: "Home",
    components: {
        performanceStatistics,
        plutoExchange,
        prefecturalGovernment,
    },
    data() {
        return {
            nowTime: this.$utils.dateFormat("yyyy/MM/dd hh:mm:ss", new Date()),
            timer: null,
            myChartChina: null,
            itemIndex: 0,
        }
    },
    watch: {
        itemIndex(newVal) {
            this.myChartChina.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: newVal,
            })
        },
    },
    computed: {
        userData() {
            return this.$store.state.user.userData
        },
        geoCoordMap() {
            return this.$store.state.user.geoCoordMap
        },
        convertData() {
            return this.$store.getters["user/convertData"]
        },
        chartOptions() {
            return {
                // 进行相关配置
                backgroundColor: "#2A2A2A", //地图背景色
                geo: {
                    // 这个是重点配置区
                    map: "china", // 表示中国地图
                    label: {
                        normal: {
                            show: true, // 是否显示对应地名
                            textStyle: {
                                //字体颜色
                                color: "#797979",
                            },
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                color: "#fff",
                            },
                        },
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            borderWidth: 1, // 地图边框宽度
                            borderColor: "#404040", // 地图边框颜色
                            areaColor: "#2A2A2A", // 地图颜色
                        },
                        emphasis: {
                            //选中省份的颜色
                            areaColor: "#FF3300",
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 0,
                            borderWidth: 1,
                            shadowColor: "#fff",
                        },
                    },
                },
                //滑动显示数据
                tooltip: {
                    trigger: "item",
                    formatter: function (obj) {
                        return `地点：${obj.name}<br />本层人数：${obj.value[2]}`
                    },
                },
                series: [
                    {
                        name: "散点",
                        type: "scatter",
                        coordinateSystem: "geo",
                        color: "#00FFCC", //点的颜色
                        data: this.convertData(),
                        symbolSize: 40, //点的大小
                        symbol: "pin", //点的样式
                        cursor: "pointer", //鼠标放上去的效果
                        label: {
                            normal: {
                                //默认展示
                                show: false,
                            },
                            emphasis: {
                                //滑过展示
                                show: false,
                            },
                        },
                        itemStyle: {
                            emphasis: {
                                borderColor: "#5c8f6e",
                                borderWidth: 5,
                            },
                        },
                    },

                    {
                        type: "map",
                        map: "china",
                        geoIndex: 0,
                        aspectScale: 0.75,
                        tooltip: {
                            show: false,
                        },
                    },
                ],
            }
        },
    },
    created() {
        this.startTime()
    },
    beforeDestroy() {
        clearInterval(this.timer)
        window.removeEventListener("resize", this.myChartChina.resize)
        document.getElementById("live2d-widget").style.display = "block"
    },
    mounted() {
        this.$nextTick(() => {
            document.getElementById("live2d-widget").style.display = "none"
        })
        this.chinaMap()
    },
    methods: {
        gotoDetail() {
            this.$router.push("/dashboard/deadBook")
        },
        selectItem(index) {
            this.itemIndex = index
        },
        startTime() {
            this.timer = setInterval(() => {
                this.nowTime = this.$utils.dateFormat("yyyy/MM/dd hh:mm:ss", new Date())
            }, 60)
        },
        chinaMap() {
            this.myChartChina = this.$echarts.init(document.getElementById("home_map_canvas"))
            window.addEventListener("resize", this.myChartChina.resize)
            this.myChartChina.setOption(this.chartOptions)
            this.myChartChina.dispatchAction({
                type: "showTip",
                seriesIndex: 0,
                dataIndex: 0,
            })
        },
    },
}
</script>

<style scoped>
.home_nav {
    display: flex;
    min-width: 1367px;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: black;
}
.home_nav_left {
    display: flex;
    align-items: center;
}
.home_nav_left img {
    display: block;
    width: 26px;
    height: 26px;
    margin-right: 12px;
}
.home_nav_left p {
    font-family: "微軟正黑體 Bold", "微軟正黑體 Regular", "微軟正黑體";
    font-weight: 700;
    font-style: normal;
    font-size: 16px;
    color: #e4e4e4;
    margin: 0;
}
.home_nav_right {
    display: flex;
    align-items: center;
    color: white;
}
.home_nav_right div:first-child {
    font-size: 16px;
    margin-right: 12px;
    cursor: pointer;
}
.home_map {
    position: absolute;
    min-width: 1367px;
    min-height: 895px;
    width: 100%;
    height: 100%;
}
#home_map_canvas {
    position: absolute;
    width: 100%;
    height: 100%;
}
.homeStatistics_left {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 300px;
    height: 100%;
    left: 20px;
    padding: 16px 0;
}
.homeStatistics_left_top,
.homeStatistics_left_mid {
    width: 211px;
    height: 92px;
    background-color: rgba(0, 0, 0, 0.6);
}
.homeStatistics_left_mid {
    height: calc(100% - 92px - 190px - 20px);
    overflow-y: auto;
    padding: 16px 10px;
    box-sizing: border-box;
}
.homeStatistics_left_bottom {
    width: 100%;
    height: 190px;
    background-color: rgba(0, 0, 0, 0.6);
}
.homeStatistics_right {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 375px;
    height: 100%;
    right: 20px;
    padding: 16px 0;
}
.homeStatistics_right_top,
.homeStatistics_right_mid,
.homeStatistics_right_bottom {
    display: flex;
    height: calc(100% / 3 - 10px);
}
.homeStatistics_right_top_left,
.homeStatistics_right_mid_left,
.homeStatistics_right_bottom_left {
    width: 41px;
    height: 100%;
    margin-right: 10px;
    background-color: rgba(0, 0, 0, 0.6);
}
.homeStatistics_right_mid_right,
.homeStatistics_right_top_right,
.homeStatistics_right_bottom_right {
    width: 324px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
}
.homeStatistics_left_top_title {
    font-family: "微軟正黑體";
    font-weight: 400;
    font-style: normal;
    color: #00ffcc;
}
.homeStatistics_left_top_number {
    font-family: "微軟正黑體 Bold", "微軟正黑體 Regular", "微軟正黑體";
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: #00ffcc;
}
.homeStatistics_left_top {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 13px 0;
    padding-left: 10px;
    box-sizing: border-box;
}
.homeStatistics_left_mid_card {
    width: 100%;
}
.homeStatistics_left_mid_card_title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    background: url(../assets/u330.png) no-repeat;
    background-size: 100% 100%;
    font-family: "微軟正黑體";
    font-weight: 400;
    font-style: normal;
    color: rgba(0, 255, 204, 0.819607843137255);
}
.humanNumber,
.painValue,
.Supplies {
    display: flex;
    justify-content: space-between;
}
.homeStatistics_left_mid_card_content {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 120px;
    background: url(../assets/u330.png) no-repeat;
    background-size: 100% 100%;
    justify-content: space-around;
    padding: 14px 16px;
    padding-top: 20px;
    top: -4px;
    box-sizing: border-box;
}
.homeStatistics_left_mid_card_content_left {
    font-family: "Arial Normal", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #999999;
}
.humanNumber .homeStatistics_left_mid_card_content_right {
    color: rgb(22, 230, 188);
}
.painValue .homeStatistics_left_mid_card_content_right {
    color: rgb(230, 64, 64);
}
.Supplies .homeStatistics_left_mid_card_content_right {
    color: rgb(255, 153, 0);
}
.homeStatistics_left_mid_card {
    margin-bottom: 20px;
}
.homeStatistics_left_mid_card:last-child {
    margin-bottom: 0px;
}
.unActive {
    opacity: 0.6;
}
.homeStatistics_left_bottom_title {
    color: white;
    text-align: center;
}
.homeStatistics_left_bottom {
    padding: 30px 0px;
    box-sizing: border-box;
}
.homeStatistics_left_bottom_content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 20px;
}
.homeStatistics_left_bottom_content_left h4,
.homeStatistics_left_bottom_content_right h4 {
    font-family: "微軟正黑體 Bold", "微軟正黑體 Regular", 微軟正黑體;
    font-weight: 700;
    font-style: normal;
    font-size: 20px;
    color: rgb(0, 255, 204);
    text-align: center;
}
.homeStatistics_left_bottom_content_right h4 {
    color: rgb(255, 153, 0);
}
.homeStatistics_left_bottom_content_left p,
.homeStatistics_left_bottom_content_right p {
    text-align: center;
    font-family: "微軟正黑體 Bold", "微軟正黑體 Regular", 微軟正黑體;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    color: rgb(204, 204, 204);
}
.homeStatistics_left_bottom >>> .el-divider--vertical {
    height: 6em;
    margin-left: 46px;
    margin-right: 46px;
}
.homeStatistics_label {
    width: 16px;
    height: 9px;
    background-color: rgb(0, 204, 153);
}
.homeStatistics_right_top_left,
.homeStatistics_right_mid_left,
.homeStatistics_right_bottom_left {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 12px;
    margin-bottom: 10px;
    box-sizing: border-box;
}
.homeStatistics_right_top_left_type {
    position: relative;
    width: 134px;
    transform: rotate(90deg);
    top: 70px;
    transform-origin: center center;
    font-family: "Arial Normal", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #ffffff;
}
</style>
