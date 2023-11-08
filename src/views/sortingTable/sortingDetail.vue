<template>
  <div class="container">
    <div class="top">
      <div class="level">
        <span style="color: #ff0000; font-weight: bold">S级:售后</span>
        <span style="color: #ed7d31; font-weight: bold">A:EH</span>
        <span style="color: #ffff00; font-weight: bold">B:尾料</span>
        <span style="color: #000000; font-weight: bold">C:批量</span>
        <span style="color: #00b050; font-weight: bold">D:插单</span>
      </div>
      <div class="btn"><el-button type="primary" @click="toPrint">打印</el-button></div>
      <div class="info" style="margin-right: 2.5%">账号：{{ account }} &nbsp; &nbsp; 用户名：{{ userName }}</div>
    </div>
    <div class="content">
      <div class="title">
        <div class="titleLeft">
          <span>分拣台编码:{{ id }}</span>
        </div>
        <div class="titleRight">
          <!-- <span>物料条码：</span>
          <el-input ref="materialInput" v-model="barCode" class="input" @input="handleInput" @keyup.enter.native="transferSubmit" /> -->
          <Form
            ref="formList"
            :form-data="formData"
            :form-list="formList"
            size="small"
            :label-width="90"
            :layout="{ span: 24 }"
          />
        </div>
      </div>
      <div class="sortable">
        <div class="priority">
          <div class="header">任务优先级</div>
          <div class="priorityContent">
            <!-- <div class="priorityLevel">
                            <span>等级</span>
                            <div class="levelColor">
                                <div class="color red">S</div>
                                <div class="color orange">A</div>
                                <div class="color yellow">B</div>
                                <div class="color white">C</div>
                                <div class="color green">D</div>
                            </div>
                        </div>
                        <div class="priorityLevel">
                            <span>单量</span>
                            <div class="levelColor">
                                <div class="color red">1</div>
                                <div class="color orange">34</div>
                                <div class="color yellow">4</div>
                                <div class="color white">34</div>
                                <div class="color green">44</div>
                            </div>
                        </div> -->
            <div class="priorityLevel">
              <div class="textColor">
                <div class="grade-text">等级</div>
                <div class="quanlity-text">单量</div>
              </div>
              <div
                v-for="(item, index) in priority"
                :key="index"
                class="levelColor"
                @click="levelClick(item.PriorityName)"
              >
                <div
                  :class="{
                    red: item.PriorityName == 'S',
                    orange: item.PriorityName == 'A',
                    yellow: item.PriorityName == 'B',
                    white: item.PriorityName == 'C',
                    green: item.PriorityName == 'D'
                  }"
                >
                  {{ item.PriorityName }}
                </div>
                <div
                  :class="{
                    red: item.PriorityName == 'S',
                    orange: item.PriorityName == 'A',
                    yellow: item.PriorityName == 'B',
                    white: item.PriorityName == 'C',
                    green: item.PriorityName == 'D'
                  }"
                >
                  {{ item.PriorityCount }}
                </div>
              </div>
            </div>
            <div class="MaterialPreparation">
              <div class="header">备料任务单</div>
              <el-table
                border
                :data="material"
                class="table_scroll"
                :header-cell-style="tableHeaderColorTwo"
                height="520"
                highlight-current-row
                @row-click="handleTableRow"
              >
                <el-table-column
                  v-for="(item, index) in columns"
                  :key="index + 'i'"
                  :label="item.label"
                  :prop="item.prop"
                  :width="item.width"
                  align="center"
                />
              </el-table>
            </div>
          </div>
        </div>
        <div class="task">
          <div>
            <div class="header">
              分拣任务 <span v-if="sortMessage">（备料单号：{{ sortMessage.sourceID }}） </span>
            </div>
            <el-table border :data="task" class="table_scroll" :header-cell-style="tableHeaderColor" height="466">
              <el-table-column
                v-for="(item, index) in tasks"
                :key="index + 'i'"
                :label="item.label"
                :prop="item.prop"
                :width="item.width"
                align="center"
              />
            </el-table>
          </div>
          <div class="lowerBox">
            <div class="header">上层箱子</div>
            <div class="boxContentUp">
              <!-- <div class="messageConent">{{ upMessage }}</div> -->
              <el-table
                border
                :data="upBox"
                class="table_scroll"
                :header-cell-style="tableHeaderColorTwo"
                height="155"
                highlight-current-row
              >
                <el-table-column
                  v-for="(item, index) in UpDowncolumns"
                  :key="index + 'i'"
                  :label="item.label"
                  :prop="item.prop"
                  :width="item.width"
                  align="center"
                />
              </el-table>
            </div>
          </div>
        </div>
        <div class="text">
          <div class="header">来料信息</div>
          <div class="boxHeader">
            <div class="SourceBlock">
              <div class="title">来源的箱子</div>
              <div class="field">{{ sourceBox }}</div>
            </div>
            <div class="numBlock">
              <div class="title">{{ num }}</div>
              <div class="field">
                <img src="../../../static/image/common/rightArrow.png" alt="" />
              </div>
            </div>
            <div class="targetBlock">
              <div class="title">目标的箱子</div>
              <div class="field">{{ targetBox }}</div>
            </div>
          </div>
          <div class="boxContent">
            <div v-for="(item, index) in message" :key="index" class="messageConent">{{ item }}</div>
          </div>
          <div class="SortOrderInformation">
            <div class="header">分拣单信息</div>
            <div class="information">
              <span v-if="sortMessage" class="field"><span class="text">工位:</span>{{ sortMessage.StationID }}</span>
              <span v-if="sortMessage" class="field">
                <span class="text">项目号:</span> {{ sortMessage.ProjectNo }}</span
              >
              <span v-if="sortMessage" class="field">
                <span class="text">领料人:</span> {{ sortMessage.cardName }}</span
              >
              <span v-if="sortMessage" class="field">
                <span class="text">来源编号:</span>{{ sortMessage.sourceID }}</span
              >
              <span v-if="sortMessage" class="field"><span class="text">订单号:</span> {{ sortMessage.orderID }}</span>
            </div>
          </div>
          <div class="lowerBox">
            <div class="header">下层箱子</div>
            <div class="boxContentDown">
              <!-- <div class="messageConent">{{ downMessage }}</div> -->
              <el-table
                border
                :data="downBox"
                class="table_scroll"
                :header-cell-style="tableHeaderColorTwo"
                height="155"
                highlight-current-row
              >
                <el-table-column
                  v-for="(item, index) in UpDowncolumns"
                  :key="index + 'i'"
                  :label="item.label"
                  :prop="item.prop"
                  :width="item.width"
                  align="center"
                />
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="printBegin" id="sortableMaterial" ref="printTable" style="display: none">
      <PrintTable v-for="(item, index) in printData" :key="index" :data="item" @change="handleChange" />
    </div>
  </div>
</template>

<script>
// import VueWS from 'vue-websocket'
// import { API } from '@/api/generalAPI'
// import { getTransfer } from '@/api/wmsAPI'
import {
  getPrint,
  getShelf,
  getTransfer,
  getByPriority,
  getBoxsInfo,
  getBoxId,
  getUpDownBox,
  GetPickingGroupPriority,
  updatePrint
} from '@/api/wcsAPI'
import Form from '@/components/Form'
import { columns, tasks, formList, UpDowncolumns } from './config'
import { getLodop } from '@/utils/lodop'
import PrintTable from '@/views/printable-template/sortableMaterial'
import Functions from '@/utils/functions'
export default {
  name: 'SortingTable',
  components: { Form, PrintTable },
  // mixins: [VueWS],
  data() {
    return {
      columns,
      tasks,
      formList,
      UpDowncolumns,
      // path: 'ws://10.0.7.22:56233/websocket?groupId=' + this.$route.query.id,
      path: 'ws://10.0.7.22:56233/websocket?groupId=0',
      socket: null,
      id: this.$route.query.id,
      StationName: '',
      formData: {},
      priority: [], // 等级
      material: [], // 备料
      task: [], // 任务
      barCode: '',
      sourceBox: '',
      targetBox: '',
      message: [],
      sortMessage: {},
      upMessage: '',
      downMessage: '',
      taskMessage: {}, // 类型五返回的数据
      PickingNo: '', // 类型五传单号调分拣任务接口
      pagesize: 30,
      currentPage: 1,
      num: 0,
      changeNum: 0,
      lodop: '',
      printData: [],
      printBegin: false,
      sourceID: '',
      pickingID: '', // 选中备料单任务的单号
      account: sessionStorage.getItem('users_name'),
      userName: sessionStorage.getItem('name'),
      orderNo: '', // 订单号
      timer: null,
      Priority: '', // 等级
      upBox: [],
      downBox: [],
      lockReconnect: false
    }
  },
  mounted() {
    const timer = setInterval(() => {
      this.getPriority()
    }, 1000) // 获取等级
    const uptimer = setInterval(() => {
      this.getupBoxs() // 上层箱子
    }, 1000)
    const downtimer = setInterval(() => {
      this.getdownBoxs() // 下层箱子
    }, 1000)
    const boxtimer = setInterval(() => {
      this.getBox()
    }, 1000) // 获取箱子号
    const materialtimer = setInterval(() => {
      getByPriority({ Priority: this.Priority }).then(res => {
        this.material = res.items
      })
    }, 2000)
    const BoxsInfotimer = setInterval(() => {
      getBoxsInfo({ WharfID: this.id }).then(res => {
        if (res.IsError === false) {
          if (res.items) {
            this.sortMessage = res.items[0]
            this.task = res.items
            // this.orderNo = res.items[0].orderID
            res.items.forEach(val => {
              if (val.boxID === this.sourceBox) {
                this.num = parseInt(val.sortingQuantity)
              }
            })
          }
        }
      })
    }, 1000)
    this.$once('hook:beforeDestroy', () => {
      // 再通过事件监听，监听组件销毁后，再执行关闭计时器。
      clearInterval(timer)
      clearInterval(uptimer)
      clearInterval(downtimer)
      clearInterval(boxtimer)
      clearInterval(materialtimer)
      clearInterval(BoxsInfotimer)
    })
  },
  created() {
    // this.inputFocus()
    this.init()
    this.formList.forEach(item => {
      debugger
      switch (item.prop) {
        case 'barcode': {
          item.keyupenter = () => {
            this.transferSubmit()
            this.formData.barcode = ''
            this.$refs.formList.$refs.formList.$children[0].$children[0].$children[0].$children[1].focus()
          }
          break
        }
      }
    })
    // this.sourceBox = sessionStorage.getItem('sourceBox')
    // this.targetBox = sessionStorage.getItem('targetBox')
    // this.timer = setInterval(() => {
    //   getBoxsInfo({ 'WharfID': this.id })
    //     .then(res => {
    //       if (res.IsError === false) {
    //         if (res.items) {
    //           this.sortMessage = res.items[0]
    //           this.task = res.items
    //           // this.orderNo = res.items[0].orderID
    //           res.items.forEach(val => {
    //             if (val.boxID == this.sourceBox) {
    //               this.num = parseInt(val.sortingQuantity)
    //             }
    //           })
    //         }
    //       }
    //     })
    // }, 1000)
  },
  // beforeUnmount() {
  //     debugger
  //     this.socket.close();
  // },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    // 聚焦
    inputFocus() {
      this.$nextTick(x => {
        this.$refs.materialInput.focus()
      })
    },
    // 点击分拣任务显示分拣单信息
    // sortOrderTableRow(row, event, column) {
    //   this.num = parseInt(row.sortingQuantity)
    //   API.post('sortingdetails', { barcode: row.materialID }, 'GetSortingDetail').then(res => {
    //     this.sortMessage = res
    //   })
    // },
    getBox() {
      getBoxId({ WharfId: this.id }).then(res => {
        if (res.IsError === false) {
          this.sourceBox = res.SourceBoxId
          this.targetBox = res.TargetBoxId
        }
      })
    },
    getupBoxs() {
      getUpDownBox({ WharfID: this.id, Type: '1' }).then(res => {
        if (res.IsError === false) {
          this.upBox = res.Data
        }
      })
    },
    getdownBoxs() {
      getUpDownBox({ WharfID: this.id, Type: '2' }).then(res => {
        if (res.IsError === false) {
          this.downBox = res.Data
        }
      })
    },
    // 获取等级
    getPriority() {
      GetPickingGroupPriority().then(res => {
        if (res.IsError === false) {
          this.priority = res.items
          this.priority = this.priority.filter(item => {
            return item.PriorityName !== null
          })
        }
      })
    },
    // 点击等级显示备料单
    levelClick(val) {
      this.Priority = val
      // setTimeout(() => {
      // API.get('picking', { Priority: val }, 'GetPickingDetailByPriority').then(res => {
      //   this.material = res.items
      // })
      let data = { Priority: val }
      getByPriority(data).then(res => {
        this.material = res.items
        // res.items.forEach(val=>{
        //   if(val.pickingNo == this.task[0].sourceID){
        //     this.sortMessage = val
        //   }
        // })
      })
      // }, 1000)
    },
    // 等级备料单显示分拣任务
    handleTableRow(row, event, column) {
      // this.sortMessage = row
      this.pickingID = row.pickingNo
      this.sourceID = row.pickingNo
      // setTimeout(() => {
      //   API.get('sortingdetails', { orderID: row.pickingNo }, 'GetTotalBoxsInfo').then(res => {
      //   if (res.success === true) {
      //     this.task = res.datas
      //     this.orderNo = res.datas[0].orderID
      //   }
      // })

      // let data = {"orderID": row.pickingNo,'WharfID':this.id}
      // getBoxsInfo(data)
      //   .then(res => {
      //     if (res.IsError === false) {
      //     this.task = res.items
      //     this.orderNo = res.items[0].orderID
      //   }
      //   })
      // }, 1000)
    },
    handlePicking() {
      // API.get('sortingdetails', { orderID: val }, 'GetTotalBoxsInfo').then(res => {
      //   // console.log(res, '121')
      //   if (res.success === true) {
      //     this.task = res.datas
      //     this.orderNo = res.datas[0].orderID
      //   }
      // })
      getBoxsInfo({ WharfID: this.id }).then(res => {
        if (res.IsError === false) {
          if (res.items) {
            this.sortMessage = res.items[0]
            this.task = res.items
            res.items.forEach(val => {
              if (val.boxID === this.sourceBox) {
                this.num = parseInt(val.sortingQuantity)
              }
            })
          }
        }
      })
    },
    // 下架
    toShelf(data) {
      getShelf(data)
        .then(res => {
          if (res.IsError === false) {
            this.$message({
              message: '下架成功！',
              type: 'success'
            })
          } else {
            this.message.unshift(res.ErrMsg)
          }
        })
        .catch(() => {})
    },
    // 打印条码
    toPrint() {
      let data = {
        boxid: this.sourceBox,
        sourceid: this.sortMessage.sourceID
        // boxid: 'C-888',
        // barcode: '800004877076'
      }
      getPrint(data)
        .then(res => {
          if (res.IsError === false) {
            this.printBegin = true
            let row = [res.Data]
            this.printData = Functions.splitArray(row, 1)
            if (this.printData) {
              let text = {
                Barcode: this.formData.barcode,
                BoxID: this.sortMessage.sourceID
              }
              updatePrint(text) // 更新打印次数
                .then(res => {})
            }
          } else {
            this.message.unshift(res.ErrMsg)
          }
        })
        .catch(() => {})
    },
    // attrChoose() {
    //   this.printBegin = true
    //   let row = this.treeSelection
    //   this.printData = Functions.splitArray(row, 1)
    //   // this.theadData = {}
    // },
    handleChange() {
      this.changeNum = this.changeNum + 1
      if (this.changeNum === this.printData.length) {
        this.print()
        this.changeNum = 0
      }
    },
    /** 打印样式 */
    print() {
      // this.printBegin = true
      // let details = []
      // this.treeSelection.map(item => {
      //   details = details.concat(item)
      // })
      // let row = this.treeSelection
      // this.printData = Functions.splitArray(row, 1)let LODOP = getLodop()
      let LODOP = getLodop()
      if (LODOP.statusHtml) {
        this.$alert(LODOP.statusHtml, '打印提示', {
          dangerouslyUseHTMLString: true,
          showClose: true,
          showConfirmButton: false
        })
      } else {
        let strStyle = '<style>'
        strStyle += 'html,body {padding: 0;margin: 0;}'
        strStyle += '.page { width: 80mm; height: 50mm;position: relative; page-break-after: always;overflow: hidden;}'
        strStyle +=
          'table {position:relative;margin: auto;border-collapse: collapse;font-family: 宋体;font-weight:bolder;font-size: 12px;table-layout: fixed;word-break: break-all;page-break-after:always;  table-layout: fixed;  margin-left: 5mm;}'
        strStyle += '.table td {text-align: left;text-valign: top;height: 7mm;border: 1px solid #000;padding: 0 3px;}'
        strStyle += '.td-title td {text-align: center;height: 7mm !important;}'
        strStyle += '.table tr {height: 7mm;}'
        strStyle += '.top-title td { height: 7mm;border: none !important;}'
        strStyle +=
          '.top-right {text-align: left;font-size: 7pt;font-weight: normal;position: absolute;right: 1mm;line-height: 4mm;}'
        strStyle += '.col_design {height: 0 !important}'
        strStyle += '.col_design td {height: 0;visibility: hidden;border: none;}'
        strStyle += '.newTitle {font-size: 20px;font-weight: 800;text-align: center;}'
        strStyle += '.newText  {height: 7mm;}'
        strStyle += '.qrcodestyle {margin-left: 8px;}'
        strStyle += '.textSt {margin: 10px 8px;font-size: 12px;}'
        strStyle += '.werks {margin:10px 8px 10px 8px;font-size: 12px;}'
        strStyle +=
          '.ruleStyle {   display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;}'
        strStyle += '.materialText {text-valign: top;}'
        strStyle += '</style>'
        // let LODOP = this.lodop
        this.$nextTick(() => {
          let strHtml = document.getElementById('sortableMaterial').innerHTML
          // LODOP.SET_LICENSES("","13F0BE65846276CB60111433C6280000","","")
          LODOP.SET_LICENSES('', 'E2D9D84300E17DEFA8DB8B28BA83CA25', '', '')
          LODOP.PRINT_INIT('标签打印')
          LODOP.SET_PRINT_PAGESIZE(1, '80mm', '50mm') // 1纵向、2横向，纸宽，纸高，A4规格
          let printTemplate = strStyle + '<body>' + strHtml + '</body>'
          LODOP.ADD_PRINT_HTM('0mm', '0mm', '80mm', '50mm', printTemplate) // Top,Left,Width,Height
          // LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1) // 横向时的正向显示
          LODOP.PRINT()
          // LODOP.PREVIEW()
          this.printBegin = false
        })
      }
    },
    // 设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'background-color:rgb(128 128 0);color:#fff;font-size:14px;text-align:center;border-right:1px solid #fff;'
    },
    tableHeaderColorTwo({ row, column, rowIndex, columnIndex }) {
      return 'background-color:rgb(189 215 238);color:#000;font-size:14px;text-align:center;border-right:1px solid #fff;'
    },
    // 扫描条码直接过账
    transferSubmit() {
      let data = {
        barCodeList: [this.formData.barcode],
        boxNo: this.sourceBox,
        targetBoxID: this.targetBox,
        cardName: sessionStorage.getItem('name'),
        cardNo: sessionStorage.getItem('users_name'),
        cardNewName: sessionStorage.getItem('name'),
        cardNoNew: sessionStorage.getItem('users_name'),
        oclas: 'XWMS315',
        orderId: this.sortMessage.orderID,
        warehouseNo: 'ZNC03'
      }
      getTransfer(data)
        .then(res => {
          if (res.success === true) {
            // this.$message({
            //   message: '过账成功！',
            //   type: 'success'
            // })
            this.message.unshift(res.message)
          } else {
            this.message.unshift(res.message)
            // this.$message({
            //   message: '过账失败！',
            //   type: 'error'
            // })
          }
        })
        .catch(() => {})
    },
    // reconnect() {
    //   let _this = this
    //   setTimeout(function () {
    //     _this.init(this.path)
    //   }, 1000)
    // },
    // 若链接中断30秒后创建新的链接
    reconnect() {
      if (this.lockReconnect) return ''
      this.lockReconnect = true
      setTimeout(() => {
        this.init()
        this.lockReconnect = false
        // 若链接中断30秒后创建新的链接
      }, 30000)
    },
    init() {
      try {
        if (typeof WebSocket === 'undefined') {
          alert('您的浏览器不支持socket')
        } else {
          // 实例化socket
          const path = 'ws://10.0.7.22:56233/websocket?groupId=0'
          this.socket = new WebSocket(path)
          // console.log(this.socket, '12344')
          // 监听socket连接
          this.socket.onopen = this.open
          // 监听socket错误信息
          this.socket.onerror = this.error
          // 监听socket消息
          this.socket.onmessage = this.getMessage
          this.socket.onclose = this.close
        }
      } catch (e) {
        this.reconnect()
      }
    },
    open() {
      // console.log("socket连接成功")
    },
    error() {
      this.reconnect()
      console.log('重连')
      // console.log("连接错误")
    },
    getMessage(msg) {
      // console.log(msg,'msg')
      let data = JSON.parse(msg.data)
      if (data.ScreenId === this.id) {
        if (data.MsgType === 0) {
          // 来源箱子
          this.sourceBox = data.Content
          // sessionStorage.setItem('sourceBox', this.sourceBox)
          this.toPrint() // 自动打印
          // console.log(this.sourceBox, '2q45')
          // this.StationName = JSON.parse(data.Content).StationName
        } else if (data.MsgType === 1) {
          // 目标箱子
          this.targetBox = data.Content
          // sessionStorage.setItem('targetBox', this.targetBox)
        } else if (data.MsgType === 2) {
          // 来料信息
          this.message.unshift(data.Content)
        } else if (data.MsgType === 3) {
          // 上层箱子消息
          this.upMessage = data.Content
        } else if (data.MsgType === 4) {
          // 下层箱子消息
          this.downMessage = data.Content
        } else if (data.MsgType === 5) {
          // 接收任务消息
          let Message = JSON.parse(data.Content) // 修改从接口获取PickingNo字段值，从点击备料任务单号传入
          this.taskMessage = {
            WarehouseId: Message.WarehouseId,
            Floor: Message.Floor,
            PickingNo: this.pickingID,
            WharfID: Message.WharfID
          }
          this.PickingNo = this.taskMessage.PickingNo
          this.toShelf(this.taskMessage) // 自动下架
          this.handlePicking() // 类型五显示分拣任务数据
          // console.log( this.taskMessage)
        } else if (data.MsgType === 8) {
          this.message.unshift(data.Content)
        }
      }
      // console.log(data)
      // console.log(JSON.parse(data.Content).StationName)
    },
    send() {
      this.socket.send(params)
    },
    // close() {
    //     console.log("socket已经关闭")
    // },
    close() {
      // this.socket.onconnect = this.connect()
      this.reconnect()
      console.log('重连')
      // console.log("socket已经关闭")
    }
    // connect() {
    //     console.log('重连')
    // }
  }
}
</script>
<style scoped>
/* /deep / .el-table__body-wrapper tbody tr:last-child td {
    border-bottom: 1px solid #dfe6ec;
} */
::v-deep .el-form-item--small.el-form-item {
  margin-top: 20px;
}

::v-deep .app-main {
  background: #f0f2f5 !important;
}

::v-deep .el-table__body-wrapper tbody tr:last-child td {
  border-bottom: 1px solid #dfe6ec;
}

.container {
  width: 100%;
  height: auto;
}

.container .top {
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}

.container .level {
  width: 50%;
  margin-left: 2.5%;
  height: 50px;
  line-height: 50px;
  background: #8faadc;
  font-size: 18px;
}

.container .btn {
  flex: 1;
  margin-left: 10px;
}

.container .content {
  width: 95%;
  height: 763px;
  margin: 0 auto;
  border: 1px solid #eeeeee;
}

.container .title {
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}

.container .title .titleLeft {
  width: 50%;
  text-align: left;
}

.container .title .titleRight {
  width: 50%;
  display: flex;
  justify-content: flex-start;
}

.titleRight .search_input {
  width: 70%;
  height: 69px;
  line-height: 69px;
}

/* .titleRight span {
  width: 120px;
  display: inline-block;
  line-height: 36px;
} */

.title .input {
  text-align: right;
}

.sortable {
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: flex-start;
}

.sortable .priority,
.sortable .task,
.sortable .text {
  width: 33.3%;
}

.sortable .priority .header,
.sortable .task .header,
.sortable .text .header {
  height: 30px;
  line-height: 30px;
  background: #eeeeee;
}

/* 任务优先级 */
.priorityContent {
  height: 100px;
}

.priorityContent .priorityLevel {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.priorityLevel .textColor {
  height: 100px;
}

.grade-text,
.quanlity-text {
  width: 60px;
  height: 50px;
  line-height: 50px;
  text-align: center;
}

.priorityContent .levelColor {
  width: 18%;
  height: 100px;
}

/* .levelColor .grade,
.levelColor .quanlity {
    height: 50px;
} */

/* .priorityContent .priorityLevel span {
    width: 10%;
    display: block;
}

.priorityContent .levelColor .color {
    width: 20%;
    height: 50px;
    font-size: 20px;
} */

.red {
  background: #ff0000;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
}

.red:active {
  background: #ff0000;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
}

.orange {
  background: #ed7d31;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
}

.yellow {
  background: #ffff00;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #000000;
}

.white {
  background: #ffffff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #000000;
}

.green {
  background: #00b050;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #ffffff;
}

.text .boxHeader {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
  border-bottom: 1px solid #eeeeee;
}

.boxHeader .SourceBlock,
.boxHeader .targetBlock {
  width: 40%;
  height: 80px;
}

.SourceBlock .title,
.targetBlock .title {
  width: 80px;
  height: 20px;
  margin: 0 auto;
}

.SourceBlock .field {
  width: 90%;
  margin-left: 10px;
  margin-bottom: 10px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  background: #ed7d31;
}

.targetBlock .field {
  width: 90%;
  margin-left: 10px;
  margin-bottom: 10px;
  height: 55px;
  line-height: 55px;
  text-align: center;
  background: #ffff00;
}

.boxHeader .numBlock {
  width: 20%;
  height: 80px;
}

.numBlock .title {
  width: 15px;
  height: 20px;
  margin: 0 auto;
  text-align: center;
}

.numBlock .field {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #ffffff;
  margin: 0 auto;
}

.numBlock img {
  width: 60px;
  height: 60px;
}

.boxContent {
  height: 190px;
  overflow: auto;
  border: 1px solid #eeeeee;
}

.boxContent .messageConent {
  margin: 10px;
}

.SortOrderInformation .information {
  height: 165px;
}

.SortOrderInformation .information .field {
  display: block;
  margin: 0 20px;
  color: blue;
}

.SortOrderInformation .information .text {
  color: #ff0000;
}
</style>
