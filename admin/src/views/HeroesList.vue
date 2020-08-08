<template>
    <div>
        <h1>英雄列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="name" label="英雄名称">
        </el-table-column>
        <el-table-column prop="avatar" label="英雄头像">
            <template slot-scope="scope">
                <img :src="scope.row.avatar" style="height: 2rem;" />
            </template>
        </el-table-column>
        <el-table-column prop="title" label="英雄称号">
        
        </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
                <!-- row 表示当前行 -->
                <el-button type="text" size="small" @click="$router.push(`/heroes/edit/${scope.row._id}`)">编辑</el-button>
            </template>
            </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return{
            items:[]
        }
    },
    methods:{
        async fetch(){
            //console.log(this.$route)
            const res = await this.$http.get('/rest/heroes')
            //console.log(1)
            if(res){
                this.items = res.data
                //console.log(this.items)
            }
        },
        async remove(row){
            this.$confirm(`是否确定要删除此分类 "${row.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                //console.log(1 + row._id)
                let res = await this.$http.delete(`/rest/heroes/${row._id}`)
                if(res.data){
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    this.fetch()
                }
                
            })
        }
    },
    created(){
        this.fetch()
    }
}
</script>