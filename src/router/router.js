/**
 * Created by Administrator on 2017/9/6.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../page/login.vue'
import Manage from '../page/manage.vue'
import Home from '../page/home.vue'
import UserList from '../page/userList.vue'
import shopList from '../page/shopList.vue'
import foodList from '../page/foodList.vue'
import orderList from '../page/orderList.vue'
import adminList from '../page/adminList.vue'
import addShop from '../page/addShop.vue'
import addGoods from '../page/addGoods.vue'

Vue.use(VueRouter)
// const Hello = {template: '<div>hello world</div>'}
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/manage',
      name: '',
      component: Manage,
      children: [
        {
          path: '',
          component: Home,
          meta: []
        },
        {
          path: '/userList',
          name: 'userList',
          component: UserList,
          meta: ['数据管理', '用户列表']
        },
        {
          path: '/shopList',
          name: 'shopList',
          component: shopList,
          meta: ['数据管理', '商家列表']
        },
        {
          path: '/foodList',
          name: 'foodList',
          component: foodList,
          meta: ['数据管理', '食品列表']
        },
        {
          path: '/orderList',
          name: 'orderList',
          component: orderList,
          meta: ['数据管理', '订单列表']
        },
        {
          path: '/adminList',
          name: 'adminList',
          component: adminList,
          meta: ['数据管理', '管理员列表']
        },
        {
          path: '/addShop',
          name: 'addShop',
          component: addShop,
          meta: ['添加数据', '添加商铺']
        },
        {
          path: '/addGoods',
          name: 'addGoods',
          component: addGoods,
          meta: ['添加数据', '添加商品']
        }
      ]
    }
  ]
})
