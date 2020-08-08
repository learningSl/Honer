<template>
    <div>
        <h1>广告位列表</h1>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240">
        </el-table-column>
        <el-table-column prop="name" label="广告位名称">
        </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
            <template slot-scope="scope">
                <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
                <!-- row 表示当前行 -->
                <el-button type="text" size="small" @click="$router.push(`/ads/edit/${scope.row._id}`)">编辑</el-button>
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
            //console.log(2)
            const res = await this.$http.get('/rest/ads')
            //console.log(1)
            if(res){
                this.items = res.data
                //console.log(this.items)
            }
        },
        async remove(row){
            this.$confirm(`是否确定要删除此广告位 "${row.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                let res = await this.$http.delete(`/rest/ads/${row._id}`)
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
