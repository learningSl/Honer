<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}广告位</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            
            <el-form-item label="名称:">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="广告">
                <el-button @click="model.items.push({})"><i class="el-icon-plus"></i>添加广告</el-button>
                    <el-row type="flex" style="flex-wrap: wrap"><!--使用flex布局-->
                        <el-col :md="24" v-for="(item, index) in model.items" :key="index">
                            <el-form-item style="margin-top: 2rem" label="跳转链接:">
                                <el-input v-model="item.url"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top: 2rem" label="图片:">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'image', res.url)"
                                    :headers="myHeaders"
                                    :on-error="handleError"
                                    >
                                    <img v-if="item.image" :src="item.image" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>                           
                            <el-form-item style="margin-top: 2rem; text-align:center">
                                <el-button @click="model.items.splice(index, 1)" type="danger">删除广告</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
               items:[]
            },
            myHeaders: {Authorization :localStorage.getItem('token') ? 'Bearer ' + (localStorage.getItem('token') || '') : ''}
        }
    },
    methods:{
        async save(){
            let res;
            if(this.id){
                res = await this.$http.put(`/rest/ads/${this.id}`, this.model)
                if(res){
                    this.$router.push('/ads/list')
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                }
            }else{
                res = await this.$http.post('/rest/ads', this.model)
                if(res){
                    this.$router.push('/ads/list')
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                }
            }
            
            
        },
        async fetch(){
            const res = await this.$http.get(`/rest/ads/${this.id}`)
            if(res){
                //this.model = res.data
                this.model = Object.assign({}, this.model, res.data)
            }
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
    min-width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
  }
</style>