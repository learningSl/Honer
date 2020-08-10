<template>
    <m-card :icon="icon" :title="title">
      <div class=" nav pt-4 jc-between">
          <div @click="$refs.list.swiper.slideTo(index)" class="nav-item" :class="{active: active === index}" v-for="(item, index) in categories" :key="index">
            <div class="nav-link">
              {{item.name}}
            </div>
          </div>
          
          
        </div>
        <div class="pt-2">
          <swiper ref="list" @slide-change="() => {active = $refs.list.swiper.realIndex}" :options="swiperOptions">
            <swiper-slide v-for="(items, index) in categories" :key="index">
                <!-- 通过插槽进行组件传值 通过 <template #item="{items}">来接收 -->
                    <!-- #item == name="item" -->
                <slot name="item" :items="items"></slot>
            </swiper-slide>
            
          </swiper>
        </div>
    </m-card>
</template>
<script>
export default {
    props:{
        title:{type : String, required: true},
        icon:{required: true},
        categories: {type: Array, required: true}
    },
    data(){
        return{
            active: 0,
            swiperOptions: {
              pagination:{el: '.swiper-pagination',clickable: true,},
              
              initialSlide: 0,
              //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
              direction: 'horizontal',
          }
        }
    },
}
</script>