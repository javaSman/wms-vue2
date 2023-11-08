<template>
  <!-- 大货架标签-一页两个 -->
  <div class="page">
    <div v-for="(item, index) in dataArr" :key="index" :class="'tagH' + index + ' tag'">
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
    this.creatQrCode()
  },
  methods: {
    creatQrCode() {
      this.dataArr.forEach((item, index) => {
        let qrcode = new QRCode(this.$refs[`qrcode${index}`][0], {
          width: 156,
          height: 156,
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
      // })
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
  width: 280mm;
  height: 70mm;
  position: absolute;
  /* left: 5mm; */
  background: #f2f2f2;
  border: 1px solid;
  page-break-after: always;
}
.tagH0 {
  top: 20mm;
}
.tagH1 {
  top: 100mm;
}
.left {
  width: 185mm;
  height: 60mm;
  position: absolute;
  top: 5mm;
  left: 5mm;
  vertical-align: middle;
  text-align: left;
}
.right {
  width: 84mm;
  height: 60mm;
  position: absolute;
  top: 15mm;
  right: 15mm;
  vertical-align: middle;
  text-align: right;
}
.logo {
  width: 20mm;
  height: 20mm;
  line-height: 60mm;
}
.text {
  position: absolute;
  width: 180mm;
  height: 60mm;
  line-height: 20mm;
  /* left: 38mm; */
  top: 15mm;
  font-weight: bold;
  font-size: 33pt;
  text-align: center;
}
.qrcode {
  width: 60mm;
  height: 60mm;
  line-height: 60mm;
}
.arrow {
  width: 15mm;
  height: 40mm;
  line-height: 60mm;
}
</style>
