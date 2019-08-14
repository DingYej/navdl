import Vue from 'vue'
import Router from 'vue-router'
import Tout from '../containers/Tout'
import Keji from '../containers/Keji'
import Yule from '../containers/Yule'
import Tiyu from '../containers/Tiyu'
import NotFound from '../containers/NotFound'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Tout',
      component: Tout
    },
    {
      path: '/keji',
      name: 'Keji',
      component: Keji
    },
    {
      path: '/yule',
      name: 'Yule',
      component: Yule
    },
    {
      path: '/tiyu',
      name: 'Tiyu',
      component: Tiyu
    },
    {
      path:'NotFound',
      name:'NotFound',
      component:NotFound
    }
  ]
})
