import request from '@/utils/request'

// 防伪码查询
export function queryAntiCounterfeit(code) {
  return request({
    url: '/front/antiCounterfeit/query',
    method: 'post',
    data: {
      code: code
    },
    header: {
      isToken: false
    }
  })
}

