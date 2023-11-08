<template>
  <div class="container">
    <el-card class="box-card">
      <div class="title">分拣站台</div>
      <div class="text-item">
        <span v-for="o in list" :key="o.code" class="item" @click="toClick(o.code)">{{ o.name }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
// import VueWS from 'vue-websocket'
// import { columns } from './config'
export default {
  name: 'SortingTable',
  // mixins: [VueWS],
  data() {
    return {
      list: [
        { name: '3层1号分拣台1', code: '70_3' },
        { name: '3层1号分拣台2', code: '90_3' },
        { name: '3层2号分拣台1', code: '190_3' },
        { name: '3层2号分拣台2', code: '210_3' },
        { name: '3层3号分拣台1', code: '430_3' },
        { name: '3层3号分拣台2', code: '450_3' },
        { name: '3层4号分拣台1', code: '560_3' },
        { name: '3层4号分拣台2', code: '580_3' },
        { name: '3层5号分拣台1', code: '830_3' },
        { name: '3层5号分拣台2', code: '850_3' }
      ],
      path: 'ws://10.0.7.22:56233/websocket?groupId=1',
      socket: null
    }
  },
  created() {
    // this.getData()
    // this.init()
  },
  // destroyed() {
  //   // 销毁监听
  //   this.socket.onclose = this.close
  // },
  methods: {
    toClick(id) {
      this.$router.push({ path: '/sortingDetailNew/sortingDetailNew', query: { id: id } })
    },
    // 设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'background-color:rgb(128 128 0);color:#fff;font-size:14px;text-align:center;border-right:1px solid #fff;'
    },
    init() {
      if (typeof WebSocket === 'undefined') {
        alert('您的浏览器不支持socket')
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        console.log(this.socket)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open() {
      console.log('socket连接成功')
    },
    error() {
      console.log('连接错误')
    },
    getMessage(msg) {
      console.log(msg)
    },
    send() {
      this.socket.send(params)
    },
    close() {
      this.socket.onconnect = this.connect()
      console.log('socket已经关闭')
    },
    connect() {
      console.log('重连')
    }
  }
}
</script>
<style scoped>
.box-card {
  width: 90%;
  height: 600px;
  margin: 20px auto;
}
.box-card .title {
  text-align: center;
  font-size: 24px;
}
.box-card .text-item {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 18px;
}
.box-card .text-item .item {
  display: block;
  width: 200px;
  height: 200px;
}
.box-card .text-item .item:hover {
  color: #409eff;
  text-decoration: underline;
}
</style>
