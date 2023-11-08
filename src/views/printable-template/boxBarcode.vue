<template>
  <div class="page">
    <div ref="qrcode111" class="qrCode" />
    <div class="qrText">{{ this.data[0].boxNo }}</div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
// import JsBarcode from 'jsbarcode'
export default {
  name: 'InventoryTable',
  // components: { QRCode },
  props: {
    data: { type: Array, default: () => [] },
    page: { type: Number, default: 1 },
    currentPage: { type: Number, default: 1 },
    thead: { type: Object, default: () => {} }
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log(this.$refs)

    // })
    this.creatQrCode()
    // this.barcode()
  },
  methods: {
    creatQrCode() {
      let qrcode = new QRCode(this.$refs.qrcode111, {
        width: 70,
        height: 70,
        render: 'canvas',
        correctLevel: QRCode.CorrectLevel.H
      })
      console.log(this.data[0].boxNo)
      qrcode.makeCode(this.data[0].boxNo)
      let canvas = document.querySelector('canvas')
      var strDataURI = canvas.toDataURL('image/png')
      canvas.outerHTML = '<img alt="Scan me!" src=' + strDataURI + '>'
      qrcode.clear()
      // 替换原img，解决img不及时加载问题

      // })
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
  width: 79mm;
  height: 23.5mm;
  /* border: 1px soild #000; */
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
.qrCode {
  width: 22mm;
  height: 22mm;
  border: 1px soild #000;
  position: absolute;
  top: 1mm;
  left: 0.5mm;
}
.qrText {
  position: absolute;
  top: 7.5mm;
  left: 22.5mm;
}
</style>
