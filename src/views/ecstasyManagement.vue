<template>
    <div class="ecstasyManagement layout_content">
        <underTabelLabel underTitle="勾魂管理" />
        <div class="ecstasyManagement_tabs">
            <el-tabs v-model="activeNav">
                <el-tab-pane label="未处理" name="one"></el-tab-pane>
                <el-tab-pane label="勾魂中" name="two"></el-tab-pane>
                <el-tab-pane label="孟婆验收" name="three"></el-tab-pane>
                <el-tab-pane label="退单" name="four"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="ecstasyManagement_search">
            <el-input placeholder="请输入姓名" v-model="searchValue" class="input-with-select">
                <el-button size="mini" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <el-table style="width: 100%" :data="tableList" border>
            <el-table-column align="center" prop="id" label="ID" width="180"></el-table-column>
            <el-table-column align="center" prop="username" label="姓名" width="180"></el-table-column>
            <el-table-column align="center" prop="ecstasy" label="勾魂使者" width="180"></el-table-column>
            <el-table-column align="center" prop="ecstasyTime" label="勾魂时间" width="180"></el-table-column>
            <el-table-column align="center" prop="chargeback" label="退单理由" width="180"></el-table-column>
            <el-table-column align="center" width="200" label="操作">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.type !== 'four'" @click="handleClick(scope.row)" type="text" size="small"
                        >编辑</el-button
                    >
                    <el-button @click="del(scope.row)" v-if="scope.row.type !== 'four'" type="text" size="small"
                        >退单</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogFormVisible">
            <el-form :model="editForm">
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input placeholder="请输入姓名" v-model="editForm.username" />
                </el-form-item>
                <el-form-item label="勾魂使者" :label-width="formLabelWidth">
                    <el-input placeholder="请输入勾魂使者" v-model="editForm.ecstasy" />
                </el-form-item>
                <el-form-item label="勾魂时间" :label-width="formLabelWidth">
                    <el-input placeholder="请输入勾魂时间" v-model="editForm.ecstasyTime" />
                </el-form-item>
                <el-form-item label="退单理由" :label-width="formLabelWidth">
                    <el-input placeholder="请输入退单理由" v-model="editForm.chargeback" />
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth">
                    <el-select v-model="editForm.type" placeholder="请选择类型">
                        <el-option label="未处理" value="one"></el-option>
                        <el-option label="勾魂中" value="two"></el-option>
                        <el-option label="孟婆验收" value="three"></el-option>
                        <el-option label="退单" value="four"></el-option>
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
    name: "EcstasyManagement",
    components: {
        underTabelLabel,
    },
    data() {
        return {
            activeNav: "one",
            searchValue: "",
            dialogFormVisible: false,
            editForm: {
                id: "",
                username: "",
                ecstasy: "",
                ecstasyTime: "",
                type: "",
                chargeback: "",
            },
            formLabelWidth: "120px",
        }
    },
    computed: {
        tableList() {
            return this.$store.state.user.ecstasyList
                .filter((item) => {
                    return item.type == this.activeNav
                })
                .filter((item) => {
                    return item.username.indexOf(this.searchValue) !== -1 || item.id.indexOf(this.searchValue) !== -1
                })
        },
    },
    methods: {
        del(obj) {
            this.$store.commit("user/setEcstasyLisType", {
                obj,
                type: "four",
            })
        },
        handleClick(val) {
            this.editForm = JSON.parse(JSON.stringify(val))
            this.dialogFormVisible = true
        },
        submit() {
            this.$store.commit("user/setEcstasyList", JSON.parse(JSON.stringify(this.editForm)))
            this.dialogFormVisible = false
        },
    },
}
</script>

<style scoped>
.ecstasyManagement {
    padding: 20px 12px;
}
.ecstasyManagement_tabs {
    margin-top: 10px;
}
.ecstasyManagement >>> .el-tabs {
    padding: 0 20px;
}
.ecstasyManagement_search {
    width: 300px;
    margin-top: 16px;
    margin-bottom: 16px;
}
</style>
