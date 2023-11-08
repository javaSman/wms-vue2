import request from '@/utils/requestThree'
// 扫描物料条码直接过账
export function getTransfer(data) {
  return request({
    url: 'Wcf/WmsService.svc/rest/FullBoxOutStock ',
    method: 'post',
    data
  })
}
