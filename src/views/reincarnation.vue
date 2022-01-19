<template>
    <div class="reincarnation layout_content">
        <underTabelLabel underTitle="六道轮回" />
        <div class="reincarnation_tip">随机从生死簿选出一名转生</div>
        <div class="reincarnation_cricle">
            <LuckyWheel
                ref="LuckyWheel"
                style="width: 440px; height: 440px"
                :defaultConfig="defaultConfig"
                :buttons="buttons"
                :prizes="prizes"
                :blocks="blocks"
                @start="startCallBack"
                @end="endCallBack"
            />
        </div>
    </div>
</template>

<script>
import underTabelLabel from "@/components/underTabelLabel.vue"

export default {
    name: "Reincarnation",
    components: {
        underTabelLabel,
    },
    data() {
        return {
            blocks: [{ padding: "16px", background: "#333333" }],
            prizes: [
                {
                    fonts: [{ text: "畜生", fontColor: "#ffffff", fontSize: "24px", top: "28%" }],
                    background: "#0099FF",
                },
                {
                    fonts: [{ text: "饿鬼", fontColor: "#ffffff", fontSize: "24px", top: "28%" }],
                    background: "#FF6666",
                },
                {
                    fonts: [{ text: "地狱", fontColor: "#ffffff", fontSize: "24px", top: "28%" }],
                    background: "#00CC66",
                },
                {
                    fonts: [{ text: "天道", fontColor: "#ffffff", fontSize: "24px", top: "28%" }],
                    background: "#0099FF",
                },
                {
                    fonts: [{ text: "人道", fontColor: "#ffffff", fontSize: "24px", top: "28%" }],
                    background: "#FF6666",
                },
                {
                    fonts: [{ text: "阿修罗", fontColor: "#ffffff", fontSize: "24px", top: "28%" }],
                    background: "#00CC66",
                },
            ],
            buttons: [
                { radius: "40px", background: "#d64737" },
                { radius: "35px", background: "#f6c66f", pointer: true },
                {
                    radius: "30px",
                    background: "#fff",
                    fonts: [{ text: "开始", top: "-13px" }],
                },
            ],
            defaultConfig: { gutter: "5px" },
        }
    },
    computed: {
        deathBook() {
            return this.$store.state.user.deathBook
        },
    },
    methods: {
        ramdomNum(n, m) {
            return Math.floor(Math.random() * (m - n)) + n
        },
        startCallBack() {
            this.$refs.LuckyWheel.play()
            setTimeout(() => {
                this.$refs.LuckyWheel.stop((Math.random() * 8) >> 0)
            }, 3000)
        },
        endCallBack(val) {
            this.$message({
                message: `成功给${this.deathBook[this.ramdomNum(0, this.ramdomNum.length)].username}转生为${
                    val.fonts[0].text
                }`,
                type: "success",
            })
        },
    },
}
</script>

<style scoped>
.reincarnation {
    padding: 20px 12px;
}
.reincarnation_cricle {
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 40px;
}
.reincarnation_tip {
    color: #ff6666;
    padding: 15px;
    padding-bottom: 0;
}
</style>
