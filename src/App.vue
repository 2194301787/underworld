<template>
    <div id="app" v-cloak>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    created() {
        try {
            setTimeout(() => {
                window.L2Dwidget.init({
                    pluginRootPath: "./live2dw/",
                    pluginJsPath: "lib/",
                    pluginModelPath: "live2d-widget-model-hibiki/assets/",
                    tagMode: false,
                    debug: false,
                    model: { jsonPath: "./live2dw/live2d-widget-model-hibiki/assets/hibiki.model.json" },
                    display: { position: "left", width: 150, height: 400 },
                    mobile: { show: true },
                    log: false,
                    react: {
                        opacity: 1
                    }
                })
            }, 1000)
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<style>
[v-cloak] {
    display: none;
}
.layout_content {
    width: 100%;
    height: 100%;
    background-color: white;
    border: 1px solid rgba(228, 228, 228, 1);
    box-sizing: border-box;
    overflow: auto;
}
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 10px;
}
::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background-color: skyblue;
    background-image: -webkit-linear-gradient(
        45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent
    );
}
::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #ededed;
    border-radius: 10px;
}
</style>
