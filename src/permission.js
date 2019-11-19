import router  from './router' 
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/serve/serveIndex', '/rate/rateIndex','/rate/news','/netbar', '/login'] // no redirect whitelist

var routerjs= require('./router/index.js')
// var getLastUrl=(str,yourStr)=>str.slice(str.lastIndexOf(yourStr));
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

// 切换效果start
  const list = ['serve', 'rate','netbar']  // 将需要切换效果的路由名称组成一个数组
  const toName = to.name  // 即将进入的路由名字
  const fromName = from.name  // 即将离开的路由名字
  const toIndex = list.indexOf(toName)  // 进入下标
  const fromIndex = list.indexOf(fromName)  // 离开下标
  let direction = ''
 
  if (toIndex > -1 && fromIndex > -1) {  // 如果下标都存在
   if (toIndex < fromIndex) {     // 如果进入的下标小于离开的下标，那么是左滑
    direction = 'left'
   } else {
    direction = 'right'     // 如果进入的下标大于离开的下标，那么是右滑
   }
  }
  store.state.user.viewDirection = direction //这里使用vuex进行赋值
// 切换效果end

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    next()
    NProgress.done()
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) >=0) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
