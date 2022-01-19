<template>
    <div class="underLayout">
        <div class="underLayout_box">
            <div class="underLayout_box_left">
                <el-col>
                    <h5 class="nav_title">地府管理系统</h5>
                    <el-menu
                        :default-active="navActive"
                        :router="true"
                        :unique-opened="true"
                        text-color="white"
                        active-text-color="rgb(0, 153, 255)"
                        background-color="rgb(0, 21, 41)"
                    >
                        <el-menu-item index="/">
                            <i class="el-icon-s-home"></i>
                            <span>首页</span>
                        </el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>生死簿</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/dashboard/deadBook">用户管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="/dashboard/ecstasyManagement">
                            <i class="el-icon-check"></i>
                            <span>勾魂管理</span>
                        </el-menu-item>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-scissors"></i>
                                <span>十八层地狱</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/dashboard/eqManagement">设备管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="/dashboard/reincarnation">
                            <i class="el-icon-s-help"></i>
                            <span>六道轮回</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
            <div class="underLayout_box_right">
                <div class="underLayout_box_right_title">
                    <div class="underLayout_box_right_icon">
                        <i class="el-icon-user-solid"></i>
                    </div>
                    <div class="underLayout_box_right_username">阎王爷</div>
                    <div @click="logout" class="underLayout_box_right_logout">退出</div>
                </div>
                <div class="underLayout_box_right_content">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "UnderLayout",
    data() {
        return {}
    },
    computed: {
        navActive() {
            return this.$route.path
        },
    },
    methods: {
        logout() {
            sessionStorage.removeItem("isLogin")
            this.$store.commit("user/setIsLogin", false)
            this.$router.replace("/login")
        },
    },
}
</script>

<style scoped>
.underLayout {
    position: absolute;
    width: 100%;
    height: 100%;
}
.underLayout_box {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
}
.underLayout_box_left {
    width: 180px;
    height: 100%;
    background-color: rgb(0, 21, 41);
    overflow-y: auto;
}
.underLayout_box_right {
    width: calc(100% - 180px);
    height: 100%;
}
.nav_title {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: rgb(255, 255, 255);
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
}
.underLayout >>> .el-menu-item-group__title {
    padding: 0;
}
.underLayout >>> .el-menu-item {
    min-width: 160px;
}
.underLayout >>> .el-menu {
    border: none;
}
.underLayout_box_right_title {
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;
    box-sizing: border-box;
}
.underLayout_box_right_logout {
    margin-left: 18px;
    cursor: pointer;
}
.underLayout_box_right_logout:hover {
    color: rgb(0, 153, 255);
}
.underLayout_box_right_icon {
    font-size: 16px;
    margin-right: 2px;
}
.underLayout_box_right_content {
    position: relative;
    width: 100%;
    height: calc(100% - 60px);
    background-color: rgb(240, 242, 245);
    padding: 20px;
    box-sizing: border-box;
}
</style>
