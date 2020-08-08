<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}物品</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            
            <el-form-item label="名称:">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="图标:">
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    :headers="myHeaders"
                    :on-error="handleError"
                    >
                    <img v-if="model.icon" :src="model.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit"> 保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        id:{}
    },
    data(){
        return {
            model:{
               
            },
            myHeaders: {Authorization :localStorage.getItem('token') ? 'Bearer ' + (localStorage.getItem('token') || '') : ''}
        }
    },
    methods:{
        async save(){
            let res;
            if(this.id){
                res = await this.$http.put(`/rest/items/${this.id}`, this.model)
                if(res){
                    this.$router.push('/items/list')
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                }
            }else{
                
                res = await this.$http.post('/rest/items', this.model)
                if(res){
                    this.$router.push('/items/list')
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                }
            }                
        },
        async fetch(){
            const res = await this.$http.get(`/rest/items/${this.id}`)
            if(res){
                this.model = res.data
            }
        },
        afterUpload(res){//服务器返回的响应
            this.$set(this.model, 'icon', res.url)//显式给对象赋属性和值
            //this.model.icon = res.url//这种方式可能赋不上
        },
        handleError(err){

            if(err.status === 401){
                this.$router.push('/login')
            }
            this.$message({
                        type: 'error',
                        message: JSON.parse(err.message).msg
                    })
        }
    },
    created(){
        this.id && this.fetch()
    },
}
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px solid #d9d9d9;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>