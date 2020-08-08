import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CreateEdit from '../views/CreateEdit.vue'
import CategoryList  from '../views/CategoryList.vue'
import ItemsEdit  from '../views/ItemsEdit.vue'
import  ItemsList  from '../views/ItemsList.vue'
import HeroesEdit  from '../views/HeroesEdit.vue'
import  HeroesList  from '../views/HeroesList.vue'
import ArticlesEdit  from '../views/ArticlesEdit.vue'
import  ArticlesList  from '../views/ArticlesList.vue'
import AdsEdit  from '../views/AdsEdit.vue'
import  AdsList  from '../views/AdsList.vue'
import AdminUserEdit  from '../views/AdminUserEdit.vue'
import  AdminUserList  from '../views/AdminUserList.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {isPublic: true}
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {
        path: '/categories/create',
        component: CreateEdit
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      {
        path: '/categories/edit/:id',
        component: CreateEdit,
        props: true
      },
      {
        path: '/items/create',
        component: ItemsEdit,     
      },
      {
        path: '/items/list',
        component: ItemsList,     
      },
      {
        path: '/items/edit/:id',
        component: ItemsEdit,
        props: true
      },
      {
        path: '/heroes/create',
        component: HeroesEdit,     
      },
      {
        path: '/heroes/list',
        component: HeroesList,     
      },
      {
        path: '/heroes/edit/:id',
        component: HeroesEdit,
        props: true
      },
      {
        path: '/articles/create',
        component: ArticlesEdit,     
      },
      {
        path: '/articles/list',
        component: ArticlesList,     
      },
      {
        path: '/articles/edit/:id',
        component: ArticlesEdit,
        props: true
      },
      {
        path: '/ads/create',
        component: AdsEdit,     
      },
      {
        path: '/ads/list',
        component: AdsList,     
      },
      {
        path: '/ads/edit/:id',
        component: AdsEdit,
        props: true
      },
      {
        path: '/admin_users/create',
        component: AdminUserEdit,     
      },
      {
        path: '/admin_users/list',
        component: AdminUserList,     
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUserEdit,
        props: true
      }
    ]
  }
]



const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.getItem('token')){
      
      return next('/login')
  }
  next()
})

export default router
