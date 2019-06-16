import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomePage',
      // component: HomePage
      component: () => import(/* webpackChunkName: "page-home" */ '../pages/home')
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: () => import(/* webpackChunkName: "page-404" */ '../pages/no-found')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
