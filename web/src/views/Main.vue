<template>
    <div>
        <div class="topbar bg-black py-2 text-white px-4 d-flex ai-center">
            <img src="../../../../node-vue-honerImages/logo.png" height="30" />
            <div class="pl-3 flex-1">
                <div class="text-white">王者荣耀</div>
                <div class="text-gray fs-xs">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary ">立即下载</button>
        </div>
        <div class="bg-primary d-flex jc-around pt-3 pb-2 text-white fs-lg">
            <div class="nav nav-inverse pb-1">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
            </div>
            <div class="nav">
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
            </div>
            <div class="nav">
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<style lang="scss">
.topbar{   //固定住顶部栏
    position: sticky;
    top: 0;
    z-index: 20;
}
</style>