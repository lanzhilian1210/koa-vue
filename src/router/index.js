import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import reg from '@/components/reg'
import list from '@/components/list'
import getList from '@/components/getList'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/getList',
      name: 'getList',
      component: getList
    }
  ]
})
