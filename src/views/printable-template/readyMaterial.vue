<template>
  <div class="page">
    <!-- <div class="content">
      <div class="fieldContent">{{ data[0].materialDesc }}</div>
      <div class="codeContent">
        <div ref="qrcode11111" class="qrcodestyle" />
              <div class="textSt">{{ data[0].barcode }}</div>
      </div>
    </div> -->

    <table cellspacing="0" cellpadding="0" class="table">
      <!-- <thead>
          <tr class="col_design">
            <td style="width: 22mm" />
            <td style="width: 29mm" />
            <td style="width: 13mm" />
            <td style="width: 30mm" />
          </tr>
          <tr>
            <td class="newTitle" style="text-align: center" colspan="4">物料标签</td>
          </tr>
        </thead> -->
      <tbody>
        <tr>
          <!-- <td style="border-top: none; border-bottom: none;height: 10mm;">物料编号{{ data[0].materialID }}</td> -->
          <!-- <td style="border-top: none; border-bottom: none">{{ data[0].materialID }}</td> -->
          <td style="height: 12mm; padding: 5px 5px" valign="top">
            <div class="materialText">
              物料编号:{{ data[0].materialID }}
              <br />
              物料描述:{{ data[0].materialDescription }}
            </div>
          </td>
          <td style="width: 40%" rowspan="3" valign="top">
            <div class="werks">
              {{ data[0].werks }}-{{ data[0].Lgort }}
            </div>
            <div ref="qrcode11111" class="qrcodestyle" />
            <div class="textSt">{{ data[0].barcode }}</div>
          </td>
          <!-- <td style="border-top: none; border-bottom: none">物料名称</td>
            <td style="border-top: none; border-bottom: none">{{ data[0].materialDesc }}</td> -->
        </tr>
        <tr>
          <!-- <td colspan="2" rowspan="3">
              <div class="textSt">{{ data[0].barcode }}</div>
            </td> -->
          <td style="height: 28mm" valign="top">
            <div class="text">
              制单号：{{ data[0].orderNo }}
              <br />
              备料单：{{ data[0].pickingNo }}
              <br />
              <!-- 计划：{{ data[0].materialDescription }}
              <br /> -->
              生产批：{{ data[0].batchID }}&nbsp;{{ data[0].stationID }}
              <br />
              QTY：{{ data[0].quantity }}&nbsp;&nbsp;&nbsp;{{ data[0].unit }}
              <br />
              领料人：{{ data[0].cardName }}-{{ data[0].PrepareArea }}
              <br />
              ECN号： {{ data[0].EcnNo }}&nbsp;&nbsp;需点数□
            </div>
          </td>
          <!-- <td>净重/数量</td>
            <td>{{ data[0].quantity + data[0].unitName }}</td> -->
        </tr>
        <!-- <tr>
            <td  style="height: 30mm;">
              <div class="text">{{ data[0].barcode }}</div>
              </td>
          </tr> -->
        <tr>
          <td colspan="2" style="width: 80mm; height: 10mm">组件退料：</td>
        </tr>
        <!-- <tr>
            <td>毛重</td>
            <td>{{ data[0].grossWeight }}</td>
            <td colspan="2" rowspan="9">
              <div ref="qrcode11111" class="qrcodestyle" />
              <div class="textSt">{{ data[0].barcode }}</div>
            </td>
          </tr> -->
        <!-- <tr>
            <td>供应商</td>
            <td>{{ data[0].supplierName }}</td>
          </tr>
          <tr>
            <td>供应商批次</td>
            <td>{{ data[0].supplierBatch }}</td>
          </tr>
          <tr>
            <td>送货批次</td>
            <td>{{ data[0].batch }}</td>
          </tr>
          <tr>
            <td>失效日期</td>
            <td>{{ data[0].invalidTime }}</td>
          </tr>
          <tr>
            <td>生产日期</td>
            <td>{{ data[0].productTime }}</td>
          </tr>
          <tr>
            <td>保质期</td>
            <td>{{ data[0].quality }}</td>
          </tr> -->
      </tbody>
    </table>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'InventoryTable',
  props: {
    data: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
    thead: { type: Object, default: () => {} }
  },
  mounted() {
    this.$nextTick(() => {
      console.log(this.$refs)
      this.creatQrCode()
    })
  },
  methods: {
    creatQrCode() {
      // console.log(this.$refs)

      let qrcode = new QRCode(this.$refs.qrcode11111, {
        width: 90,
        height: 90,
        render: 'canvas',
        correctLevel: QRCode.CorrectLevel.H
      })
      // let aa = 'W230726000001'
      qrcode.makeCode(this.data[0].barcode)
      // console.log(this.data[0].barcode, 'bar')
      let canvas = document.querySelector('canvas')
      var strDataURI = canvas.toDataURL('image/png')
      canvas.outerHTML = '<img alt="Scan me!" src=' + strDataURI + '>'
      qrcode.clear()
      this.$emit('change', true)
    }
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

.page {
  width: 80mm;
  height: 50mm;
  page-break-after: always;
  position: relative;
  overflow: hidden;
}

/* .content {
  width: 100%;
  border: 1px soild #000;
  position: absolute;
  top: 5mm;
  left: 4mm;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}

.content .fieldContent {
  width: 60mm;
  border: 1px soild #000;
}

.content .codeContent {
  flex: 1;
  border: 1px soild #000;
}
.qrCode {
  width: 25mm;
  height: 25mm;
} */

table {
  table-layout: fixed;
  position: relative;
  margin: auto;
  border-collapse: collapse;
  font-family: 宋体;
  font-size: 7pt;
  margin-left: 5mm;
  table-layout: fixed;
  word-break: break-all;
  page-break-after: always;
}

.table td {
  text-align: left;
  height: 6.9mm;
  border: 1px solid #000;
  padding: 0 3px;
}

.table tr {
  height: 6.9mm;
}

.td-title td {
  text-align: center;
  height: 6.9mm !important;
}

.top-title td {
  height: 6.9mm;
}

/* .main-title {
    height: 12mm !important;
    font-size: 16pt;
    font-weight: bold;
    text-align: center !important;
    line-height: 12mm;
    border: none !important;
  } */
.top-right {
  text-align: left;
  font-size: 7pt;
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
}

.newTitle {
  font-size: 20px;
  font-weight: 800;
  text-align: center;
}

.newText {
  height: 6.9mm;
}

.qrcodestyle {
  margin-left: 27px;
}

.textSt {
  margin: 10px 40px;
  font-size: 12px;
}

.ruleStyle {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
</style>
