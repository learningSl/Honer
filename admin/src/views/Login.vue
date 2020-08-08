<template>
    <div class="login-content">
        <el-card style="text-align:center" header="请先登录">
            <el-form label-width="4rem" @submit.native.prevent="login">
                <el-form-item style="margin-top:1rem" label="用户名:">
                    <el-input v-model="model.username" type="text"></el-input>
                </el-form-item>
                <el-form-item style="margin-top:2rem" label="密码:">
                    <el-input v-model="model.password" type="password"></el-input>
                </el-form-item>
                <el-form-item style="margin-top:2rem;margin-left:-3rem">
                    <el-button type="primary" native-type="submit">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
export default {
    data(){
        return{
            model:{}
        }
    },
    methods:{
        async login(){
            const res = await this.$http.post('/login', this.model)
            localStorage.setItem('token', res.data.token)
            this.$router.push('/')
            this.$message({
                type: 'success',
                message: '登陆成功'
            })
        }
    }
}
</script>
<style scoped>
.login-content{
    width: 30rem;
    margin: 5rem auto;
}
</style>