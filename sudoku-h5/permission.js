import {getToken} from '@/utils/auth'

// 登录页面
const authPage = "/pages/auth"

// 页面白名单
const whiteList = [
    '/',
    '/pages/test/cover',
    '/pages/test/questions',
    '/pages/test/result',
]

// 检查地址白名单
function checkWhite(url) {
    const path = url.split('?')[0]
    return whiteList.indexOf(path) !== -1
}

const list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
list.forEach(item => {
    // uni.addInterceptor(item, {
    //     invoke(to) {
    //         if (getToken()) {
    //             if (to.url === authPage) {
    //                 uni.reLaunch({url: "/"})
    //             }
    //             return true
    //         } else {
    //             console.log(to.url)
    //             if (checkWhite(to.url)) {
    //                 return true
    //             }
    //             uni.reLaunch({url: authPage})
    //             return false
    //         }
    //     },
    //     fail(err) {
    //         console.log(err)
    //     }
    // })
})
