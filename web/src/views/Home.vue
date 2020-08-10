<template>
  <div class="home">
    <swiper :options="swiperOptions">
      <!-- :options="swiperOptions" -->
      <swiper-slide>
        <img class="w-100" src="../../../../node-vue-honerImages/ads1.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../../../node-vue-honerImages/ads2.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../../../../node-vue-honerImages/ads3.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination text-right" slot="pagination"></div>
  </swiper>
    <div class="w-100 text-center pt-3 nav-icons bg-white mt-3 ">
      <div class=" d-flex flex-wrap">
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-news"></i>  
            <div class="py-2">爆料站</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-story"></i>  
            <div class="py-2">故事站</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-shop"></i>  
            <div class="py-2">周边商城</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-test"></i>  
            <div class="py-2">体验服</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-newpeople"></i>  
            <div class="py-2">新人专区</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-honor"></i>  
            <div class="py-2">荣耀-传承</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-place"></i>  
            <div class="py-2">王者营地</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-public"></i>  
            <div class="py-2">公众号</div>
          </div>
          <div class="nav-items mb-3 text-gray">
            <i class="sprite sprite-introduce"></i>  
            <div class="py-2">版本介绍</div>
          </div>
      </div>
      <div class="bg-light py-2 fs-sm d-flex ai-center jc-center">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- 卡片 -->
    <list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #item="{items}">
        <div class="py-2 fs-lg d-flex" v-for="(item, i) in items.newsList" :key="i">
                <span class="text-info">[{{item.categoryName}}]</span>
                <span class="px-2"> | </span>
                <span class="flex-1 text-ignore pr-2">{{item.title}}</span>
                <span>{{item.createdAt | date}}</span>
              </div>
      </template>
    </list-card>
    <m-card icon="Menu" title="英雄列表"></m-card>
    <m-card icon="iconfonttupian" title="精彩视频"></m-card>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
    filters:{  //过滤器
        date(value){
          return dayjs(value).format('MM/DD')
        }
    },
    data() {
      return {
        newsCats:[],
        swiperOptions: {
          pagination:'.swiper-pagination',
          clickable: true,
          initialSlide: 0,
          //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
          direction: 'horizontal',
          // 自动切换图配置
          autoplay: 3000,
          speed:1000,
          grabCursor:true,
          centeredSlides: true,
              // 环状轮播
          loop: true,
          slidesPerView: 'auto',
          loopedSlides: 3,
          loopAdditionalSlides: 0,
          // 一个屏幕展示的数量
          },
        }
      
    },
    created(){
      this.fetchNewsCats()
    },
    methods:{
      async fetchNewsCats(){
        const res = await this.$http.get('/news/list')
        this.newsCats = res.data
       // console.log(res.data)
      }
    }
  }
</script>

<style lang="scss">

  .swiper-pagination-bullet{
    background-color: #fff !important;
    opacity: 1;
    &.swiper-pagination-bullet-active{
      background-color: #4b67af !important;
    }
  
}
.nav-items{
  width: 25%;
  border-right: 1px solid #d4d9de ;
  &:nth-child(4n){
    border-left: none;
  }
}
.nav-icons{
  border-top: 1px solid #d4d9de;
  border-bottom: 1px solid #d4d9de;
}


</style>