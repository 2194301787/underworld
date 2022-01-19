<template>
    <div class="performanceStatistics">
        <div class="performanceStatistics_title">统计</div>
        <div class="performanceStatistics_noColor">
            <div class="performanceStatistics_noColor_left bigText">6542</div>
            <div class="performanceStatistics_noColor_right">+13%</div>
        </div>
        <div class="performanceStatistics_color">
            <div class="performanceStatistics_color_left">总计</div>
            <div class="performanceStatistics_color_right">今年</div>
        </div>
        <div class="performanceStatistics_noColor">
            <div class="performanceStatistics_noColor_left">126</div>
            <div class="performanceStatistics_noColor_right warning">-6%</div>
        </div>
        <div class="performanceStatistics_color">
            <div class="performanceStatistics_color_left">分类</div>
            <div class="performanceStatistics_color_right">去年</div>
        </div>
        <div class="performanceStatistics_noColor">
            <div class="performanceStatistics_noColor_left">667</div>
            <div class="performanceStatistics_noColor_right">+23%</div>
        </div>
        <div class="performanceStatistics_color">
            <div class="performanceStatistics_color_left">总计</div>
            <div class="performanceStatistics_color_right">今年</div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.performanceStatistics {
    padding: 16px 20px 0px 20px;
}
.performanceStatistics_title {
    font-family: "Arial Normal", "Arial";
    font-weight: 400;
    font-style: normal;
    font-size: 10px;
    margin-bottom: 16px;
    color: #ffffff;
}
.performanceStatistics_noColor,
.performanceStatistics_color {
    display: flex;
    justify-content: space-between;
}
.performanceStatistics_color {
    background-color: rgba(51, 51, 51, 1);
    padding: 5px;
    margin-top: 14px;
    margin-bottom: 14px;
}
.performanceStatistics_noColor_left {
    font-family: "微軟正黑體 Bold", "微軟正黑體 Regular", 微軟正黑體;
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    color: rgb(0, 255, 204);
}
.bigText {
    font-size: 20px;
}
.performanceStatistics_noColor_right {
    font-family: "微軟正黑體 Bold", "微軟正黑體 Regular", 微軟正黑體;
    font-weight: 700;
    font-style: normal;
    font-size: 13px;
    color: rgb(0, 204, 153);
}
.warning {
    color: rgb(255, 0, 51);
}
.performanceStatistics_color_left,
.performanceStatistics_color_right {
    font-family: "微軟正黑體 Bold", "微軟正黑體 Regular", 微軟正黑體;
    font-weight: 700;
    font-style: normal;
    font-size: 10px;
    color: rgb(255, 255, 255);
}
</style>
