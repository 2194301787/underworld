<template>
    <div class="eqManagement layout_content">
        <underTabelLabel underTitle="设备管理" />
        <div class="eqManagement_content">
            <el-row :gutter="20">
                <el-col :key="index" v-for="(item, index) in equipmentList" :xs="24" :sm="12" :md="6">
                    <div class="eqManagement_item">
                        <div class="eqManagement_item_online">
                            <div class="eqManagement_item_online_l">{{ item.equipmentName }}</div>
                            <div :class="[{ redColor: !item.equipmentState }]" class="eqManagement_item_online_r">
                                {{ item.equipmentState ? "设备正常" : "停止运行" }}
                            </div>
                        </div>
                        <div class="eqManagement_item_operator">
                            <div class="eqManagement_item_operator_l">操作员：{{ item.operator }}</div>
                            <div class="eqManagement_item_operator_r">已工作{{ item.workTime }}年</div>
                        </div>
                        <div class="eqManagement_item_bg">
                            <img
                                v-if="!item.equipmentState"
                                class="eqManagement_item_bg_blood"
                                src="../assets/u1087.png"
                            />
                            <img class="eqManagement_item_bg_type" :src="require('../assets/' + item.imgSrc)" />
                        </div>
                        <div class="eqManagement_item_btn">
                            <div
                                v-loading.fullscreen.lock="fullscreenLoading"
                                @click="changeState(index)"
                                class="eqManagement_item_btn_l"
                            >
                                {{ item.equipmentState ? "设备暂停" : "设备重启" }}
                            </div>
                            <div @click="select(item)" class="eqManagement_item_btn_r">查看记录</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <el-dialog title="工作记录" :visible.sync="dialogTableVisible">
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in workRecord" :key="index" :timestamp="activity.timestamp">
                    {{ activity.content }}
                </el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
import underTabelLabel from "@/components/underTabelLabel.vue"

export default {
    name: "EqManagement",
    components: {
        underTabelLabel,
    },
    data() {
        return {
            fullscreenLoading: false,
            dialogTableVisible: false,
            workRecord: [],
        }
    },
    computed: {
        equipmentList() {
            return this.$store.state.equipment.equipmentList
        },
    },
    methods: {
        select(item) {
            this.workRecord = item.workRecord
            this.dialogTableVisible = true
        },
        changeState(index) {
            this.fullscreenLoading = true
            setTimeout(() => {
                this.$store.commit("equipment/setEquipmentList", {
                    index,
                    value: this.equipmentList[index].equipmentState ? 0 : 1,
                })
                this.fullscreenLoading = false
            }, 1000)
        },
    },
}
</script>

<style scoped>
.eqManagement {
    padding: 20px 12px;
}
.eqManagement_content {
    position: relative;
    width: 100%;
}
.eqManagement_item {
    border: 1px solid rgba(204, 204, 204, 1);
    padding-top: 14px;
    padding-bottom: 16px;
    margin-top: 20px;
}
.eqManagement_item_online,
.eqManagement_item_operator {
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
}
.eqManagement_item_online {
    margin-bottom: 10px;
}
.eqManagement_item_operator {
    margin-bottom: 10px;
}
.eqManagement_item_online_l {
    font-size: 13px;
    color: #333333;
}
.eqManagement_item_online_r {
    font-size: 13px;
    color: #00cc99;
}
.eqManagement_item_operator_l,
.eqManagement_item_operator_r {
    font-size: 13px;
    color: #999999;
}
.eqManagement_item_bg {
    position: relative;
    height: 152px;
    background-color: rgb(242, 242, 242);
    border-top: 1px solid rgba(204, 204, 204, 1);
    border-bottom: 1px solid rgba(204, 204, 204, 1);
}
.eqManagement_item_bg_type {
    position: absolute;
    width: 58px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
}
.eqManagement_item_bg_blood {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
}
.eqManagement_item_btn {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}
.eqManagement_item_btn_l,
.eqManagement_item_btn_r {
    color: #0099ff;
    font-size: 13px;
    cursor: pointer;
}
.eqManagement_item_btn_l {
    margin-right: 14px;
}
.redColor {
    color: rgb(255, 0, 0);
}
</style>
