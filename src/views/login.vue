<template>
    <div class="login">
        <div class="login_bg">
            <div class="login_form">
                <div class="login_form_title">
                    <img src="../assets/u43.png" />
                    <span>地府管理系统</span>
                </div>
                <div class="form-group form_user">
                    <input
                        @keyup.enter="login"
                        v-model="username"
                        class="form-control"
                        type="text"
                        placeholder="用户名"
                    />
                </div>
                <div class="form-group form_pass">
                    <input
                        @keyup.enter="login"
                        v-model="password"
                        class="form-control"
                        type="password"
                        placeholder="密码"
                    />
                </div>
                <div class="login_submit">
                    <button @click="login" class="btn btn-info">登录</button>
                </div>
                <div @click="forgot" class="login_form_forget">忘记密码</div>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: "Login",
    data() {
        return {
            username: "",
            password: "",
            isLoading: false
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.user.userInfo
        }
    },
    mounted() {},
    methods: {
        login() {
            if (this.username === this.userInfo.username && this.password.toString() === this.userInfo.password) {
                sessionStorage.setItem("isLogin", "true")
                this.$store.commit("user/setIsLogin", true)
                this.$router.push("/")
            } else {
                this.$store.commit("user/setIsLogin", false)
                this.$message({
                    message: "用户名密码错误",
                    type: "error"
                })
            }
        },
        forgot() {
            this.$alert(`用户名: ${this.userInfo.username} 密码: ${this.userInfo.password}`, "提示", {
                confirmButtonText: "确定"
            })
        }
    }
}
</script>

<style scoped>
.login_bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url(../assets/bg.jpeg) no-repeat;
    background-size: cover;
}
.login_form {
    position: absolute;
    width: 100%;
    max-width: 527px;
    height: 629px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: url(../assets/u1.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 88px;
    box-sizing: border-box;
}
.login_form_title {
    display: flex;
    align-items: center;
    justify-content: center;
}
.login_form_title img {
    display: block;
    width: 30px;
    height: 30px;
}
.login_form_title span {
    font-family: "华文隶书 Bold", "华文隶书";
    font-weight: 700;
    font-style: normal;
    font-size: 28px;
    color: rgba(0, 0, 0, 0.627450980392157);
}
.login_form .form-group {
    width: 60%;
    margin: auto;
}
.login_form .form_user {
    margin-top: 60px;
}
.login_form .form_pass {
    margin-top: 40px;
}
.login_submit {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}
.login_submit button {
    width: 60%;
}
.login_form_forget {
    color: #0099ff;
    cursor: pointer;
    font-size: 14px;
    text-align: center;
    margin-top: 45px;
}
</style>
