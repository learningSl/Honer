<template>
    <div>
        <h1>{{id ? '编辑' : '新建'}}英雄</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-tabs type="border-card" value="skills"><!--value默认显示-->
                <el-tab-pane label="基本信息" name="basic">
                    <el-form-item label="名称:">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item label="称号:">
                <el-input v-model="model.title"></el-input>
            </el-form-item>
            <el-form-item label="类型:">
                <!-- multiple多选 -->
                <el-select v-model="model.categories" multiple >
                    <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="头像:">
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    :headers="myHeaders"
                    :on-error="handleError"
                    >
                    <img v-if="model.avatar" :src="model.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form-item>
            <el-form-item label="难度:">
                <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
            </el-form-item>
            <el-form-item label="技能:">
                <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
            </el-form-item>
            <el-form-item label="攻击:">
                <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
            </el-form-item>
            <el-form-item label="生存:">
                <el-rate style="margin-top: 0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
            </el-form-item>
            
            <el-form-item label="顺风出装:">
                <!-- multiple多选 -->
                <el-select v-model="model.items1" multiple >
                    <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="逆风出装:">
                <!-- multiple多选 -->
                <el-select v-model="model.items2" multiple >
                    <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="使用技巧:">
                <el-input type="textarea" v-model="model.usageTips"></el-input>
            </el-form-item>
            <el-form-item label="对抗技巧:">
                <el-input type="textarea" v-model="model.battleTips"></el-input>
            </el-form-item>
            <el-form-item label="团战思路:">
                <el-input type="textarea" v-model="model.teamTips"></el-input>
            </el-form-item>
                </el-tab-pane>

                <!-- //技能 -->
                <el-tab-pane label="英雄技能" name="skills">
                    <el-button @click="model.skills.push({})"><i class="el-icon-plus"></i>添加技能</el-button>
                    <el-row type="flex" style="flex-wrap: wrap"><!--使用flex布局-->
                        <el-col :md="12" v-for="(item, index) in model.skills" :key="index">
                            <el-form-item style="margin-top: 2rem" label="名称:">
                                <el-input v-model="item.name"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top: 2rem" label="图标:">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/upload'"
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'icon', res.url)"
                                    :headers="myHeaders"
                                    :on-error="handleError"
                                    >
                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                            <el-form-item style="margin-top: 2rem" label="技能描述:">
                                <el-input type="textarea" v-model="item.description"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top: 2rem" label="小提示:">
                                <el-input type="textarea" v-model="item.tips"></el-input>
                            </el-form-item>
                            <el-form-item style="margin-top: 2rem">
                                <el-button @click="model.skills.splice(index, 1)" type="danger">删除技能</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            
            <el-form-item style="margin-top: 1rem">
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
            myHeaders: {Authorization :localStorage.getItem('token') ? 'Bearer ' + (localStorage.getItem('token') || '') : ''},
            model:{
               name: '',
               avatar: '',
               scores:{
                   difficult: 0,
                   skills: 0,
                   attack: 0,
                   survive: 0
               },
               skills:[]
            },
            categories:[],
            items:[],
        }
    },
    methods:{
        async save(){
            let res;
            if(this.id){
                res = await this.$http.put(`/rest/heroes/${this.id}`, this.model)
                if(res){
                    this.$router.push('/heroes/list')
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                }
            }else{
                
                res = await this.$http.post('/rest/heroes', this.model)
                if(res){
                    this.$router.push('/heroes/list')
                    this.$message({
                        type: 'success',
                        message: '保存成功'
                    })
                }
            }                
        },
        async fetch(){
            const res = await this.$http.get(`/rest/heroes/${this.id}`)
            if(res){
                // this.model = res.data
                this.model = Object.assign({}, this.model, res.data)
            }
        },
        afterUpload(res){//服务器返回的响应
            //this.$set(this.model, 'avatar', res.url)//显式给对象赋属性和值
            this.model.avatar = res.url//这种方式可能赋不上
        },
        async fetchCategories(){
            const res = await this.$http.get('/rest/categories')
            //console.log(res.data)
            if(res){
                this.categories = res.data
            }
        },
        async fetchItems(){
            const res = await this.$http.get('/rest/items')
            //console.log(res.data)
            if(res){
                this.items = res.data
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
        this.fetchItems()
        this.fetchCategories()
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
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>