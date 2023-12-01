<template>
  <div>
    <div class="container">
      <div class="header">
        <div class="name">
          <div class="logo">
            <img
              src="../../../static/image/common/logo.png"
              alt=""
              style="width: 46px; height: 42px; margin-left: 5px; vertical-align: middle"
            />
          </div>
          <div class="text">分拣台：{{ id }}</div>
        </div>
        <div class="information">
          <span v-if="sortMessage" class="info">
            工位: <span class="red">{{ sortMessage.StationID }}</span>
          </span>
          <span v-if="sortMessage" class="info">
            项目号: <span class="red">{{ sortMessage.ProjectNo }}</span>
          </span>
          <span v-if="sortMessage" class="info">
            领料人: <span>{{ sortMessage.cardName }}</span>
          </span>
          <span v-if="sortMessage" class="info">
            来源编号: <span>{{ sortMessage.sourceID }}</span>
          </span>
          <span v-if="sortMessage" class="info">
            订单号: <span>{{ sortMessage.orderID }}</span>
          </span>
        </div>
        <div class="userInfo">
          <div style="margin-right: 5px">
            <div style="display: inline-block; margin-right: 10px">
              <Form
                ref="formList"
                :form-data="formData"
                :form-list="formList"
                size="small"
                :label-width="90"
                :layout="{ span: 24 }"
              />
            </div>
            <div class="btn" style="display: inline-block; margin-right: 25px">
              <el-button type="primary" @click="toPrint">打印</el-button>
            </div>
            <span class="info">
              账号: <span>{{ account }}</span>
            </span>
            <span class="info">
              用户名: <span>{{ userName }}</span>
            </span>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="contentLeft">
          <div class="priority">
            <div class="priorityHeader">任务优先级</div>
            <div class="priorityContent">
              等级（单量）:
              <el-radio-group v-model="radio" @change="levelClick">
                <el-radio v-for="(item, index) in priority" :key="index" :label="item.PriorityName">
                  {{ item.PriorityName }}({{ item.PriorityCount }})
                </el-radio>
                <!-- <el-radio :label="6">备选项</el-radio>
                <el-radio :label="9">备选项</el-radio> -->
              </el-radio-group>
            </div>
          </div>
          <div class="MaterialPreparation">
            <div class="materialHeader">任务单列表</div>
            <div class="table_material">
              <el-table
                border
                :data="material"
                :height="tableHeight"
                :header-cell-style="tableHeaderColor"
                :row-class-name="tableRowClassName"
                :row-style="selectedHighlight"
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
        <div class="contentRight">
          <div class="contentRight-top">
            <div class="taskInfo">
              <div class="taskInfo-header">
                <span class="taskInfo-left">
                  分拣任务
                  <span v-if="sortMessage">（备料单号：{{ sortMessage.sourceID }}） </span>
                </span>
                <span class="taskInfo-right" :style="{ color: [cacheState === '待拣料' ? 'gray' : 'green'] }">{{
                  cacheState
                }}</span>
              </div>
              <div class="table_material">
                <el-table
                  border
                  :data="task"
                  class="table_scroll"
                  :header-cell-style="tableHeaderColor"
                  :row-class-name="tableRowClassName"
                  :row-style="rowstyles"
                  height="442"
                >
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
            </div>
            <div class="materialInfo">
              <div class="materialInfo-header">来料信息</div>
              <div class="box">
                <div class="sourceBox">
                  <span class="red">来源</span><span style="color: #ffffff">箱子</span>
                  <span class="block">{{ sourceBox }}</span>
                </div>
                <div class="img">
                  <span class="solid">
                    <img src="../../../static/image/common/right.png" style="width: 18px; height: 18px" alt="" />
                  </span>
                  <span class="block">
                    分拣数量: <span class="red">{{ num }}</span>
                  </span>
                </div>
                <div class="targetBox">
                  <span class="red">目标</span><span style="color: #ffffff">箱子</span>
                  <span class="block">{{ targetBox }}</span>
                </div>
              </div>
              <div class="list">
                <div v-for="(item, index) in message" :key="index" class="field">
                  {{ item }}
                </div>
                <!-- <div class="field">field</div>
                <div class="field">field</div>
                <div class="field">field</div>
                <div class="field">field</div> -->
              </div>
            </div>
          </div>
          <div class="contentRight-bottom">
            <div class="upBox">
              <div class="upBoxHeader">上层箱子</div>
              <div class="table_material">
                <el-table
                  border
                  :data="upBox"
                  :height="boxHeight"
                  :header-cell-style="tableHeaderColor"
                  :row-class-name="tableRowClassName"
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
            <div class="downBox">
              <div class="downBoxHeader">下层箱子</div>
              <div class="table_material">
                <el-table
                  border
                  :data="downBox"
                  :height="boxHeight"
                  :header-cell-style="tableHeaderColor"
                  :row-class-name="tableRowClassName"
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
    </div>
    <div v-if="printBegin" id="sortableMaterial" ref="printTable" style="display: none">
      <PrintTable v-for="(item, index) in printData" :key="index" :data="item" @change="handleChange" />
    </div>
  </div>
</template>

<script>
import {
  getPrint,
  getShelf,
  getTransfer,
  getByPriority,
  getBoxsInfo,
  getBoxId,
  getUpDownBox,
  GetPickingGroupPriority,
  updatePrint,
  GetCacheValue
} from '@/api/wcsAPI'
import Form from '@/components/Form'
import { columns, tasks, formList, UpDowncolumns } from './config'
import { getLodop } from '@/utils/lodop'
import PrintTable from '@/views/printable-template/sortableMaterial'
import Functions from '@/utils/functions'
export default {
  name: 'SortingDetailNew',
  components: { Form, PrintTable },
  data() {
    return {
      tableHeight: window.innerHeight - 290, // 表格动态高度
      boxHeight: window.innerHeight - 725,
      screenHeight: window.innerHeight, // 内容区域高度
      conheight: {
        height: ''
      },
      columns,
      tasks,
      formList,
      UpDowncolumns,
      socket: null,
      id: localStorage.getItem('sortingID'),
      StationName: '',
      radio: '',
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
      account: localStorage.getItem('users_name'),
      userName: localStorage.getItem('name'),
      orderNo: '', // 订单号
      timer: null,
      Priority: '', // 等级
      upBox: [],
      downBox: [],
      lockReconnect: false,
      getIndex: null,
      cacheState: '' // 分拣状态
    }
  },
  watch: {
    // 监听screenHeight从而改变table的高度
    screenHeight(val) {
      this.screenHeight = val
      this.tableHeight = this.screenHeight - 290
      this.boxHeight = this.screenHeight - 725
    }
  },
  mounted() {
    // window.onresize:浏览器尺寸变化响应事件
    window.onresize = () => {
      return (() => {
        // window.innerHeight:浏览器的可用高度
        window.screenHeight = window.innerHeight
        this.screenHeight = window.screenHeight
      })()
    }
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
      this.handlePicking()
    }, 1000)
    const cacheTimer = setInterval(() => {
      this.getCache()
    }, 1000)
    this.$once('hook:beforeDestroy', () => {
      // 再通过事件监听，监听组件销毁后，再执行关闭计时器。
      clearInterval(timer)
      clearInterval(uptimer)
      clearInterval(downtimer)
      clearInterval(boxtimer)
      clearInterval(materialtimer)
      clearInterval(BoxsInfotimer)
      clearInterval(cacheTimer)
    })
  },
  created() {
    window.addEventListener('resize', this.getHeight)
    this.getHeight()
    this.init()
    this.formList.forEach(item => {
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
  },
  destroyed() {
    // 销毁监听
    this.socket.onclose = this.close
  },
  methods: {
    getHeight() {
      this.conheight.height = window.innerHeight - 100 + 'px'
    },
    // 设置表头行的样式
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      return 'background-color:rgba(6, 50, 104, 1)!important;color:#fff;font-size:14px;text-align:center;border-right:1px solid #fff;'
    },
    rowstyles({ row, rowIndex }) {
      if (row.boxID === this.sourceBox) {
        let styleJson = {
          'background-color': 'rgba(207, 19, 34, 1)!important'
        }
        return styleJson
      }
    },
    tableRowClassName({ row, rowIndex }) {
      row.index = rowIndex
      if (rowIndex.rowIndex % 2 !== 0) {
        return 'evenRow'
      }
      return 'oddRow'
    },
    selectedHighlight({ row, rowIndex }) {
      if (this.getIndex === rowIndex) {
        return {
          'background-color': 'rgba(207, 19, 34, 1)!important'
        }
      }
    },
    // 点击等级显示备料单
    levelClick(val) {
      this.Priority = val
      let data = { Priority: val }
      getByPriority(data).then(res => {
        this.material = res.items
      })
    },
    getBox() {
      getBoxId({ WharfId: this.id }).then(res => {
        if (res.IsError === false) {
          this.sourceBox = res.SourceBoxId
          this.targetBox = res.TargetBoxId
        }
      })
    },
    getupBoxs() {
      getUpDownBox({ WharfId: this.id, Type: '0' }).then(res => {
        if (res.IsError === false) {
          this.upBox = res.Data
        }
      })
    },
    getdownBoxs() {
      var downBox = this.id.replace('_3', '_2')
      getUpDownBox({ WharfId: downBox, Type: '0' }).then(res => {
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
          let obj = {}
          this.priority.forEach((item, index) => {
            if (item.PriorityName === 'S') {
              obj = item
              this.priority.splice(index, 1)
              return
            }
          })
          this.priority.unshift(obj)
        }
      })
    },
    handlePicking() {
      getBoxsInfo({ WharfID: this.id }).then(res => {
        if (res.IsError === false) {
          this.sortMessage = res.items[0]
          this.task = res.items
          this.task.forEach((val, index) => {
            if (val.boxID === this.sourceBox) {
              this.num = parseInt(val.sortingQuantity)
              this.task.unshift(this.task.splice(index, 1)[0])
            }
          })
        }
      })
    },
    // 获取拣料状态
    getCache() {
      let id = this.id.substring(0, this.id.indexOf('_'))
      GetCacheValue({ key: 'ConfirmBoxs:' + id })
        .then(res => {
          if (res === '不存在！') {
            this.cacheState = '待拣料'
          } else {
            this.cacheState = '确定拣料'
          }
        })
        .catch(() => {})
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
    handleChange() {
      this.changeNum = this.changeNum + 1
      if (this.changeNum === this.printData.length) {
        this.print()
        this.changeNum = 0
      }
    },
    /** 打印样式 */
    print() {
      let LODOP = getLodop()
      LODOP.SET_LICENSES('', '13F0BE65846276CB60111433C6280000', '', '')
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
    // 等级备料单显示分拣任务
    handleTableRow(row, event, column) {
      this.getIndex = row.index
      this.$emit('rowClick', row)
      this.pickingID = row.pickingNo
      this.sourceID = row.pickingNo
    },
    // 扫描条码直接过账
    transferSubmit() {
      let data = {
        barCodeList: [this.formData.barcode],
        boxNo: this.sourceBox,
        targetBoxID: this.targetBox,
        cardName: localStorage.getItem('name'),
        cardNo: localStorage.getItem('users_name'),
        cardNewName: localStorage.getItem('name'),
        cardNoNew: localStorage.getItem('users_name'),
        oclas: 'XWMS315',
        orderId: this.sortMessage.orderID,
        warehouseNo: 'ZNC03'
      }
      getTransfer(data)
        .then(res => {
          if (res.success === true) {
            this.message.unshift(res.message)
          } else {
            this.message.unshift(res.message)
          }
        })
        .catch(() => {})
    },
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
          const path =
            window.globalConfig.base.websocket_ip +
            ':' +
            window.globalConfig.base.websocket_port +
            '/websocket?groupId=0'
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
    },
    send() {
      // this.socket.send(params)
    },
    close() {
      this.reconnect()
      console.log('重连')
    }
  }
}
</script>
<style lang="scss">
.evenRow {
  color: #ffffff;
  background-color: rgba(6, 50, 104, 1) !important;
}
.oddRow {
  color: #ffffff;
  background-color: rgba(6, 50, 104, 0.8) !important;
}
// /deep/.el-table__body-wrapper {
//   &::-webkit-scrollbar {
//     // 整个滚动条
//     width: 0 !important; // 纵向滚动条的宽度
//     background: transparent !important;
//     border: none !important;
//     height: 0 !important;
//   }
//   &::-webkit-scrollbar-track {
//     // 滚动条轨道
//     border: none !important;
//   }
// }
</style>
<style scoped>
::v-deep .el-button--primary {
  background: rgba(207, 19, 34, 1);
  border-color: rgba(207, 19, 34, 1);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
::v-deep .el-form-item__label {
  color: #ffffff;
}
::v-deep .el-col-24 {
  height: 20px;
}
::v-deep .el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}
::v-deep .el-table th {
  background-color: transparent !important;
  /* border-bottom: 1px solid #5078fc !important; */
  color: #fefefe !important;
}
/* ::v-deep .el-table tr {
  background-color: transparent !important;
} */
::v-deep .el-table--enable-row-transition .el-table__body td,
::v-deep .el-table .cell {
  background-color: transparent !important;
  color: rgba(255, 255, 255, 0.7) !important;
  /* border: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important; */
}
::v-deep .el-table__body-wrapper tbody tr:last-child td {
  border-bottom: 1px solid #dfe6ec;
}
/* radio */
::v-deep .el-radio__inner {
  width: 16px !important;
  height: 16px !important;
}
::v-deep .el-radio__label,
.el-radio__input.is-checked + .el-radio__label {
  color: #ffffff !important;
}
::v-deep .el-radio__input.is-checked .el-radio__inner {
  width: 16px;
  height: 16px;
  border-radius: 50px;
  background: #ffffff !important;
  /* border-color: #DCDCDC !important; */
}
::v-deep .el-radio__input .el-radio__inner {
  /* content: "";
  width: 8px;
  height: 8px;
  border-radius: 50px; */
  border: 4px solid #fff;
  background: rgba(6, 42, 92, 1) !important;
}
::v-deep .el-radio__input.is-checked .el-radio__inner::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50px;
  background: rgba(245, 34, 45, 1) !important;
  position: absolute;
  top: 4px;
  left: 4px;
}
.container {
  min-height: 100%;
  /* width: 100%; */
  background: linear-gradient(180deg, rgba(6, 50, 104, 0.8) 0%, rgba(6, 50, 104, 0) 100%),
    url('../../../static/image/common/sortingBg.jpg') no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
}
.container .header {
  margin: 16px;
  /* width: 100%; */
  height: 50px;
  font-size: 14px;
  border: 1px solid rgba(0, 0, 0, 1);
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}
.header .name,
.header .information,
.header .userInfo {
  width: 33.3%;
}
.header .name {
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}
.header .name .logo {
  width: 22%;
}
.header .name .text {
  flex: 1;
  color: #ffffff;
}
.red {
  color: rgba(207, 19, 34, 1);
  font-size: 18px;
}
.block {
  display: block;
  color: #ffffff;
  margin-top: 10px;
}
.userInfo {
  text-align: right;
}
.information .info,
.userInfo .info {
  color: #ffffff;
}
.content {
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: flex-start;
}
.contentLeft {
  width: calc(35% - 16px);
}
.contentLeft .priority {
  margin-left: 16px;
  height: 92px;
  opacity: 1;
  border-radius: 4px;
  background: linear-gradient(180deg, rgba(6, 50, 104, 0.8) 0%, rgba(0, 114, 252, 0) 100%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}
.priority .priorityHeader {
  padding: 10px 16px;
  font-size: 22px;
  color: #ffffff;
}
.priority .priorityContent {
  padding: 10px 16px;
  color: #ffffff;
}
.contentLeft .MaterialPreparation {
  margin-left: 16px;
  margin-top: 16px;
  background: linear-gradient(180deg, rgba(6, 50, 104, 1) 0%, rgba(6, 50, 104, 0) 100%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
}
.MaterialPreparation .materialHeader {
  padding: 16px;
  font-size: 22px;
  color: #ffffff;
}
.table_material {
  padding: 16px;
}
.contentRight {
  width: calc(65% - 16px);
  margin-left: 16px;
}
.contentRight .contentRight-top {
  display: flex;
  align-items: flex-start;
  align-content: center;
  justify-content: flex-start;
}
.contentRight-top .taskInfo {
  width: 60%;
  border-radius: 8px;
  background: linear-gradient(
    180deg,
    rgba(6, 50, 104, 0.8) 0%,
    rgba(8, 80, 168, 0.42) 34.03%,
    rgba(10, 113, 240, 0) 100%
  );
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
.contentRight-top .taskInfo .taskInfo-header {
  padding: 16px;
  font-size: 22px;
  color: #ffffff;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: flex-start;
}
.contentRight-top .taskInfo .taskInfo-header .taskInfo-right {
  display: block;
  width: 15%;
  text-align: right;
}
.contentRight-top .taskInfo .taskInfo-header .taskInfo-left {
  display: block;
  flex: 1;
}
.contentRight-top .materialInfo {
  width: calc(40% - 8px);
  margin-left: 16px;
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(6, 50, 104, 0.8) 0%, rgba(6, 50, 104, 0) 100%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
.contentRight-top .materialInfo .materialInfo-header {
  padding: 16px;
  font-size: 22px;
  color: #ffffff;
}
.contentRight-top .materialInfo .box {
  padding: 10px 16px;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
}
.box .sourceBox,
.box .targetBox {
  width: 35%;
  text-align: center;
}
.box .img .solid {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid #ffffff;
  border-radius: 50px;
}
.box .img {
  width: 30%;
  text-align: center;
}
.list {
  /* width: 90%; */
  height: 400px;
  overflow: auto;
  padding: 10px 16px;
}
::-webkit-scrollbar {
  width: 0px;
}
.list .field {
  width: 380px;
  word-wrap: break-word;
  /* height: 40px; */
  padding: 8px;
  text-align: left;
  color: #ffffff;
}
.contentRight-bottom {
  display: flex;
  align-items: center;
  align-items: center;
  justify-content: flex-start;
}
.contentRight-bottom .upBox {
  margin: 16px 0px 0px 0px;
}
.contentRight-bottom .downBox {
  margin: 16px 16px 0px 16px;
}
.contentRight-bottom .upBox,
.contentRight-bottom .downBox {
  width: calc(50% - 8px);
  opacity: 1;
  border-radius: 8px;
  background: linear-gradient(180deg, rgba(6, 50, 104, 0.8) 0%, rgba(6, 50, 104, 0) 100%);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
}
.upBoxHeader,
.downBoxHeader {
  padding: 16px 16px 0px 16px;
  font-size: 22px;
  color: #ffffff;
}
</style>
