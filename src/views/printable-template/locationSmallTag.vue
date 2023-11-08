<template>
  <!-- 小货架标签-一页四个 -->
  <div class="page">
    <!--
     -->
    <div v-for="(item, index) in dataArr" :key="index" :class="'tagH' + index + ' tag'">
      <!-- <div > -->
      <div class="left">
        <img src="../../../static/image/common/logo.png" class="logo" />
        <span class="text">{{ item.locationNo }}</span>
      </div>
      <div class="right">
        <div :ref="'qrcode' + index" class="qrcode0 in-block" />
        <img src="../../../static/image/common/upArrow.png" class="arrow" />
      </div>
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'BigTag',
  props: {
    dataArr: { type: Array, default: () => [] }
  },
  computed: {},
  mounted() {
    // console.log(this.$refs)
    this.creatQrCode()
  },
  methods: {
    creatQrCode() {
      this.dataArr.forEach((item, index) => {
        let qrcode = new QRCode(this.$refs[`qrcode${index}`][0], {
          width: 113,
          height: 113,
          render: 'canvas',
          correctLevel: QRCode.CorrectLevel.H
        })
        qrcode.makeCode(item.locationNo)
        let canvas = document.querySelector('canvas')
        var strDataURI = canvas.toDataURL('image/png')
        canvas.outerHTML = '<img alt="Scan me!" src=' + strDataURI + '>'
        qrcode.clear()
        // 替换原img，解决img不及时加载问题
      })
    }
  }
}
</script>
<style scoped>
/* 需与打印样式同步 */
body {
  font-family: '黑体';
  font-size: 8pt;
  margin: 0;
}
.in-block {
  display: inline-block;
}
.page {
  width: 281mm;
  height: 191.5mm;
  position: relative;
  overflow: hidden;
  border: 1px solid;
  page-break-after: always;
}
.tag {
  width: 220mm;
  height: 37mm;
  position: absolute;
  left: 30mm;
  background: #f2f2f2;
  border: 1px solid;
  page-break-after: always;
}
.tagH0 {
  top: 15mm;
}
.tagH1 {
  top: 60mm;
}
.tagH2 {
  top: 105mm;
}
.tagH3 {
  top: 150mm;
}
.left {
  width: 160mm;
  height: 31mm;
  position: absolute;
  top: 3mm;
  left: 3mm;
  vertical-align: middle;
  text-align: left;
}
.right {
  width: 50mm;
  height: 31mm;
  position: absolute;
  top: 3mm;
  right: 3mm;
  vertical-align: middle;
}
.logo {
  width: 20mm;
  height: 20mm;
  line-height: 31mm;
}
.text {
  position: absolute;
  width: 150mm;
  height: 31mm;
  line-height: 31mm;
  left: 28mm;
  font-weight: bold;
  font-size: 35pt;
}
.qrcode {
  width: 31mm;
  height: 31mm;
  line-height: 31mm;
}
.arrow {
  width: 13mm;
  height: 31mm;
  line-height: 31mm;
  position: absolute;
  left: 35mm;
}
</style>
