import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    name:'login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
// 个人首页
  {
    path: '/',
    component: Layout,
    redirect: '/netbar',
    name:'netbar',
    meta: { title: '当前网咖', icon: 'international'},
    children: [
      {
        path: 'netbar',
        name: 'netbardetail',
        component: () => import('@/views/netbar/detail.vue'),
        meta: { title: '当前网咖', icon: 'international'}
      },
      {
        path: 'comment',
        name: 'commentAdd',
        component: () => import('@/views/netbar/comment.vue'),
        meta: { title: '场所评论', icon: 'international'},
        hidden:true
      },
      {
        path: 'complain',
        name: 'complain',
        component: () => import('@/views/netbar/complain.vue'),
        meta: { title: '场所投诉', icon: 'international'},
        hidden:true
      },
    ]
  },
  {
    path: '/rate',
    component: Layout,
    name:'rate',
    meta: { title: '评级平台', icon: 'compontent'},
    children: [
      {
        path: 'rateIndex',
        name: 'rateIndex',
        component: () => import('@/views/rate'),
        meta: { title: '评级平台', icon: 'compontent'}
      },
      {
        path: 'news',
        name: 'news',
        component: () => import('@/views/rate/news'),
        meta: { title: '评级平台', icon: 'compontent'},
        hidden:true
      },
    ]
  },
  {
    path: '/serve',
    component: Layout,
    name:'serve',
    meta: { title: '场所服务', icon: 'shopping'},
    children: [
      {
        path: 'serveIndex',
        name: 'serveIndex',
        component: () => import('@/views/serve/index.vue'),
        meta: { title: '场所服务', icon: 'shopping'}
      },
      {
        path: 'creditsDetail',
        name: 'creditsDetail',
        component: () => import('@/views/serve/creditsDetail.vue'),
        meta: { title: '奖品详情'},
        hidden:true
      },
    ]
  },
  {
    path: '/personalPage',
    component: Layout,
    name:'personalPage',
    meta: { title: '个人中心', icon: 'user'},
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/views/personal/index'),
        meta: { title: '个人中心', icon: 'user'}
      },
      {
        path: 'collect',
        name: 'collect',
        component: () => import('@/views/personal/collect.vue'),
        meta: { title: '我的收藏', icon: 'dashboard'},
        hidden:true
      },
      {
        path: 'expenditure',
        name: 'expenditure',
        component: () => import('@/views/personal/expenditure.vue'),
        meta: { title: '我的消费', icon: 'dashboard'},
        hidden:true
      },
      {
        path: 'evaluation',
        name: 'evaluation',
        component: () => import('@/views/personal/evaluation.vue'),
        meta: { title: '我的评价', icon: 'dashboard'},
        hidden:true
      },
      {
        path: 'mycomplain',
        name: 'mycomplain',
        component: () => import('@/views/personal/mycomplain.vue'),
        meta: { title: '我的投诉', icon: 'dashboard'},
        hidden:true
      },
      {
        path: 'complainDetail',
        name: 'complainDetail',
        component: () => import('@/views/personal/complainDetail.vue'),
        meta: { title: '投诉详情', icon: 'dashboard'},
        hidden:true
      },
      {
        path: 'myscore',
        name: 'myscore',
        component: () => import('@/views/personal/myscore.vue'),
        meta: { title: '我的积分', icon: 'dashboard'},
        hidden:true
      },
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
export const dynamicRouter = [
  { path: '*', redirect: '/404', hidden: true ,meta:{roles: 0}}
];

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
