<template>
  <div class="page">
    <table cellspacing="0" cellpadding="0" class="table">
      <thead>
        <tr class="col_design">
          <td style="width: 9mm" />
          <td style="width: 22mm" />
          <td style="width: 44mm" />
          <td style="width: 9mm" />
          <td style="width: 9mm" />
          <td style="width: 21mm" />
          <td style="width: 20mm" />
          <td style="width: 12mm" />
          <td style="width: 13mm" />
          <td style="width: 9mm" />
          <td style="width: 13mm" />
          <td style="width: 15mm" />
        </tr>
        <tr>
          <td colspan="11" class="main-title">
            <img src="../../../static/image/common/logo.png" class="logo" />
            库存盘点表
            <span class="top-right"> 版次：A4 <br />表单编号：LYH-D-SCC-060</span>
          </td>
        </tr>
        <tr class="newText">
          <td colspan="8" style="border: none">文件密级： ○高密 ○机密 ○秘密 ○内部公开 ○外部公开</td>
          <td colspan="5" style="text-align: right; padding-right: 5mm; border: none">保密期：○无 ○ 年</td>
        </tr>
        <tr class="top-title">
          <td colspan="8">盘点单号：{{ thead.inventoryID }}</td>
          <td colspan="4" style="text-align: right">盘点日期:</td>
        </tr>
        <tr class="newTitle">
          <td colspan="14">
            隶属公司:□利元亨 □柏塘分公司 □上海分公司 □宁德子公司 □索沃科技 □海葵 □玛克医疗 □其它________
          </td>
        </tr>
        <tr class="td-title">
          <td>序号</td>
          <td>物料编码</td>
          <td>物料描述</td>
          <td>仓位</td>
          <td>单位</td>
          <td>载具号</td>
          <td>货位号</td>
          <td>系统数量</td>
          <td>中转库存</td>
          <td>已冻结</td>
          <td>库存总计</td>
          <td>实盘数量</td>
          <td>差异数</td>
          <td>备注</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td style="text-align: center">{{ (currentPage - 1) * 14 + index + 1 }}</td>
          <td>{{ item.materialID }}</td>
          <td>{{ item.materialDesc }}</td>
          <td>{{ item.unitID }}</td>
          <td />
          <td>{{ item.boxID }}</td>
          <td>{{ item.locationID }}</td>
          <td>{{ item.sumQty }}</td>
          <td />
          <td />

          <td>{{ item.sumQty }}</td>
          <td />

          <td />
          <td />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="14">
            注：【SAP系统】导出数据不包含载具号、货位号，【WMS系统】导出的数据不包含中转库存、已冻结数量。
          </td>
        </tr>
        <tr class="tb-footer">
          <td colspan="4">
            <div style="float: left">盘点人：</div>
          </td>
          <td colspan="4">
            <div style="float: left">监盘人：</div>
          </td>
          <td colspan="4">
            <div style="float: left">审核人：</div>
          </td>
        </tr>
      </tfoot>
    </table>
    <div class="footer-page">第{{ currentPage }}页，共{{ page }}页</div>
    <div style="page-break-after: always" />
  </div>
</template>
<script>
export default {
  name: 'InventoryTable',
  props: {
    data: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
    thead: { type: Object, default: () => {} }
  }
}
</script>
<style scoped>
/* 需与打印样式同步 */
html,
body {
  padding: 0;
  margin: 0;
}
.logo {
  width: 10mm;
  position: absolute;
}
.page {
  width: 196mm;
  height: 293mm;
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
table {
  position: relative;
  margin: auto;
  border-collapse: collapse;
  font-family: 宋体;
  font-size: 10pt;
  table-layout: fixed;
  word-break: break-all;
  page-break-after: always;
}
.table td {
  text-align: left;
  height: 13mm;
  border: 1px solid #000;
  padding: 0 3px;
}
.table tr {
  height: 7mm;
}
.td-title td {
  text-align: center;
  height: 14mm !important;
}
.top-title td {
  height: 7mm;
  /* border: none !important; */
}
.main-title {
  height: 12mm !important;
  font-size: 16pt;
  font-weight: bold;
  text-align: center !important;
  line-height: 12mm;
  /* border: none !important; */
}
.top-right {
  text-align: left;
  font-size: 9pt;
  font-weight: normal;
  position: absolute;
  right: 1mm;
  line-height: 4mm;
}
.col_design {
  height: 0 !important;
}
.col_design td {
  height: 0 !important;
  visibility: hidden;
  /* border: none; */
}
.tb-footer td {
  line-height: 7mm;
  text-align: right;
  /* border: none; */
}
.footer-page {
  font-family: 宋体;
  font-size: 10pt;
  text-align: center;
  bottom: 0;
  position: absolute;
  width: 100%;
}
.newText {
  height: 7mm;
}
</style>
