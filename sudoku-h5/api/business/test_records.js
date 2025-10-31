import request from '@/utils/request'

// 根据code获取SCL-90测试记录详细信息
export function getTestRecordsByCode(code) {
  return request({
    url: '/front/test_records/code/' + code,
    method: 'get'
  })
}

// 根据id获取SCL-90测试记录详细信息
export function getTestRecords(id) {
  return request({
    url: '/front/test_records/' + id,
    method: 'get'
  })
}

// 新增SCL-90测试记录
export function addTestRecords(data) {
  return request({
    url: '/front/test_records',
    method: 'post',
    data: data
  })
}

// 修改SCL-90测试记录
export function updateTestRecords(data) {
  return request({
    url: '/front/test_records',
    method: 'put',
    data: data
  })
}
