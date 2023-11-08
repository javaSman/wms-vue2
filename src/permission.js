import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { logon } from './api/wcsAPI'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist
const getLocationParams = (keyWords) => {
  // 提取路由值（字符串）
  let href = window.location.href
  // 从占位符开始截取路由（不包括占位符）
  let query = href.substring(href.indexOf('?') + 1)
  // 根据 & 切割字符串
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    // 根据指定的参数名去筛选参数值
    if (pair[0] === keyWords) {
      return pair[1]
    }
  }
  return '没有该参数信息'
}
// export const url_token = changeToken()
function changeToken() {
  var params = ''
  /* 自动登录 */
  if (window.location.href.indexOf('hk_user_token') !== -1) {
    var data = getLocationParams('hk_user_token')
    var token = {
      Token: data
    }
    logon(token).then(res => {
      if (res.IsError === false) {
        params = data
        sessionStorage.setItem('NewToken', data)
      } else {
        params = getToken()
        window.alert(res.error)
      }
    })
    return params
  } else {
    return getToken()
  }
}
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // // var params = ''
  // /* 自动登录 */
  // if (window.location.href.indexOf('hk_user_token')) {
  //   debugger
  //   var data = getLocationParams('hk_user_token')
  //   logon(data).then(res=> {
  //     if(res.isError === false){
  //       params = data
  //       sessionStorage.setItem('NewToken', data)

  //     }else {

  //     }
  //   })
  //   // console.log(data)
  // }

  // determine whether the user has logged in
  // const hasToken = getToken()
  if (changeToken()) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getPermissions')
          // debugger

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
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
