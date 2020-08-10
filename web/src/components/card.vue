<template>
    <div class="card bg-white p-3 mt-3">
      <div class="card-header d-flex pb-3">
          <i class="iconfont pr-2" :class="`icon-${icon}`"></i>
          <div class="fs-xl flex-1">{{title}}</div>
          <i class="iconfont">&#xe6b6;</i>
      </div>
      <div class="card-body">
        <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{type : String, required: true},
        icon:{required: true}
    }
}
</script>
<style lang="scss">
.card{
    .card-header{
        border-bottom: 1px solid #d4d9de;
    }
    border-bottom: 1px solid #d4d9de;
}
</style>