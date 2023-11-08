import request from '@/utils/requestFour'
// 打印
export function getPrint(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetPickingOrderPrintBoxID',
    method: 'get',
    params: data
  })
}
// 下架
export function getShelf(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/ReceiveTask',
    method: 'post',
    data
  })
}
// 扫描物料条码直接过账
export function getTransfer(data) {
  return request({
    url: '9037Wcf/WarehouseService.svc/rest/FullBoxOutStock',
    method: 'post',
    data
  })
}
// 点击等级
export function getByPriority(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetPickingDetailByPriority',
    method: 'post',
    data
  })
}
// 点击备料单
export function getBoxsInfo(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetTotalBoxsInfo',
    method: 'post',
    data
  })
}
// 获取来源箱子&目标箱子
export function getBoxId(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetWharfBox',
    method: 'post',
    data
  })
}
// 获取上层箱子&下层箱子
export function getUpDownBox(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetBoxTrackProgressListByWharfId ',
    method: 'post',
    data
  })
}
// 获取等级
export function GetPickingGroupPriority(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetPickingGroupPriority',
    method: 'post',
    data
  })
}
// 更新打印次数
export function updatePrint(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/UpdateSortingDetailsPrint',
    method: 'post',
    data
  })
}
// 获取拣料状态
export function GetCacheValue(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetCacheValue',
    method: 'get',
    params: data
  })
}
/** 备料单管理 */
/**
 *  @function outShelves 下架
 */
export function outShelves(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/PickingOffShelfVerify',
    method: 'post',
    data
  })
}

/**
 *  @function logon 单点登录
 */
export function logon(data) {
  return request({
    url: '9037Wcf/WarehouseService.svc/Rest/LogOnForHKCloud',
    method: 'post',
    // headers: { 'Content-Type': 'text/xml;charset=utf-8' },
    data
  })
}

/**
 * 输送线缓存表报
 *  @function query 查询
 */
export function query(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/GetLineCache',
    method: 'post',
    data
  })
}

/**
 * 提交
 * @function submit()
 */
export function submit(data) {
  return request({
    url: 'Wcs/WcsService.svc/rest/UpdateDeviceCurrentCach',
    method: 'post',
    data
  })
}
