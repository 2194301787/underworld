<template>
    <div class="userManager layout_content">
        <underTabelLabel underTitle="生死簿" />
        <div class="userManager_tabs">
            <el-tabs v-model="activeNav">
                <el-tab-pane label="阳寿未尽" name="longevity"></el-tab-pane>
                <el-tab-pane label="孤魂野鬼" name="lonelyGhost"></el-tab-pane>
                <el-tab-pane label="转世投胎" name="reincarnation"></el-tab-pane>
                <el-tab-pane label="已删除" name="deleted"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="userManager_search">
            <el-input placeholder="请输入姓名" v-model="searchValue" class="input-with-select">
                <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-table style="width: 100%" :data="tableList" border>
            <el-table-column align="center" prop="id" label="ID" width="180"></el-table-column>
            <el-table-column align="center" prop="username" label="姓名" width="180"></el-table-column>
            <el-table-column align="center" prop="age" label="寿命" width="180"></el-table-column>
            <el-table-column align="center" prop="category" label="类别" width="180"></el-table-column>
            <el-table-column align="center" prop="wayDeath" label="死亡方式" width="180"></el-table-column>
            <el-table-column align="center" width="200" label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="del(scope.row)" v-if="!scope.row.isDel" type="text" size="small">删除</el-button>
                    <el-button @click="restore(scope.row)" v-else type="text" size="small">恢复</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="editForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input placeholder="请输入姓名" v-model="editForm.username" />
                </el-form-item>
                <el-form-item label="寿命" :label-width="formLabelWidth">
                    <el-input placeholder="请输入寿命" v-model="editForm.age" />
                </el-form-item>
                <el-form-item label="类别" :label-width="formLabelWidth">
                    <el-input placeholder="请输入类别" v-model="editForm.category" />
                </el-form-item>
                <el-form-item label="死亡方式" :label-width="formLabelWidth">
                    <el-input placeholder="请输入死亡方式" v-model="editForm.wayDeath" />
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="editForm.type" placeholder="请选择类型">
                        <el-option label="阳寿未尽" value="longevity"></el-option>
                        <el-option label="孤魂野鬼" value="lonelyGhost"></el-option>
                        <el-option label="转世投胎" value="reincarnation"></el-option>
                        <el-option label="已删除" value="deleted"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import underTabelLabel from "@/components/underTabelLabel.vue"

export default {
    name: "UserManager",
    components: {
        underTabelLabel,
    },
    data() {
        return {
            activeNav: "longevity",
            searchValue: "",
            dialogFormVisible: false,
            editForm: {
                id: "",
                username: "",
                age: "",
                category: "",
                wayDeath: "",
                type: "",
            },
            formLabelWidth: "120px",
        }
    },
    computed: {
        tableList() {
            return this.$store.state.user.deathBook
                .filter((item) => {
                    if (this.activeNav === "deleted") {
                        return item.isDel
                    } else {
                        return item.type == this.activeNav && !item.isDel
                    }
                })
                .filter((item) => {
                    return item.username.indexOf(this.searchValue) !== -1 || item.id.indexOf(this.searchValue) !== -1
                })
        },
    },
    mounted() {},
    methods: {
        del(obj) {
            this.$store.commit("user/setDeathBookType", {
                obj,
                flag: true,
            })
        },
        restore(obj) {
            this.$store.commit("user/setDeathBookType", {
                obj,
                flag: false,
            })
        },
        handleClick(val) {
            this.editForm = JSON.parse(JSON.stringify(val))
            this.dialogFormVisible = true
        },
        submit() {
            this.$store.commit("user/setDeathBook", JSON.parse(JSON.stringify(this.editForm)))
            this.dialogFormVisible = false
        },
    },
}
</script>

<style scoped>
.userManager {
    padding: 20px 12px;
}
.userManager_tabs {
    margin-top: 10px;
}
.userManager >>> .el-tabs {
    padding: 0 20px;
}
.userManager_search {
    width: 300px;
    margin-top: 16px;
    margin-bottom: 16px;
}
</style>
