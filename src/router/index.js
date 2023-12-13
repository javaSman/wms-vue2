import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

// 导入组件模块路由
// import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则item将不会显示在侧边栏中(默认为false)
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果没有设置alwaysShow，当item有多个子route时，
 *                                它将变成嵌套模式，否则不会显示根菜单
 * redirect: noRedirect           如果设置noRedirect将不会在面包屑中重定向
 * name:'router-name'             the name is used by <keep-alive> (必须设置)
 * meta : {
    roles: ['admin','editor']    控制页面角色(您可以设置多个角色)
    title: 'title'               名称显示在侧边栏和面包屑 (recommend set)
    icon: 'svg-name'             图标显示在侧边栏
    noCache: true                如果设置为true，页面将不会被缓存(默认为false)
    affix: true                  如果设置为true，标签将被添加到标签视图中
    breadcrumb: false            如果设置为false，该项目将隐藏在breadcrumb中(默认为true)
    activeMenu: '/example/list'  如果设置路径，工具条将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基本页面
 * 所有角色可以访问
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/sortingDetailNew',
    component: Layout,
    redirect: '/sortingDetailNew',
    hidden: true,
    children: [
      {
        path: 'sortingDetailNew',
        component: () => import('@/views/sortingTable/sortingDetailNew'),
        name: 'sortingDetailNew',
        meta: { title: 'sortingDetail', icon: 'dashboard' }
        // meta: { title: 'sortingDetail', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'profile', icon: 'user', noCache: true }
      }
    ]
  }
]

/**
 * asyncRoutes
 * 需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  // 分拣台
  {
    path: '/sortingTable',
    component: Layout,
    redirect: '/sortingTable',
    roles: ['SortingDeskManagement'],
    children: [
      {
        path: 'sortingTable',
        component: () => import('@/views/sortingTable/sortingTable'),
        name: 'sortingTable',
        meta: {
          title: 'sortingTable',
          icon: 'dashboard',
          roles: ['SortingDeskManagement']
        }
        // meta: { title: 'sortingTable', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    alwaysShow: true,
    name: 'SystemManagement',
    meta: {
      title: 'systemAdm',
      icon: 'systemAdm',
      roles: ['Systems']
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/systemAdm/user/index'),
        name: 'User',
        meta: {
          title: 'user',
          roles: ['AbpIdentity.Users'],
          icon: 'user'
        }
      },
      {
        path: 'role',
        component: () => import('@/views/systemAdm/role/index'),
        name: 'Role',
        meta: {
          title: 'role',
          roles: ['AbpIdentity.Roles'],
          icon: 'role'
        }
      },

      {
        path: 'dict',
        component: () => import('@/views/systemAdm/dict/index'),
        name: 'Dictionary',
        meta: {
          title: 'dictionary',
          roles: ['Systems.DataDictionary'],
          icon: 'dict'
        }
      },
      {
        path: 'log',
        component: () => import('@/views/systemAdm/log/index'),
        name: 'Log',
        meta: {
          title: 'log',
          roles: ['Systems.AuditLogging'],
          icon: 'log'
        }
      },
      {
        path: 'colModel',
        component: () => import('@/views/systemAdm/colModel/index'),
        name: 'ColModel',
        meta: {
          title: 'colModel',
          roles: ['Systems.TableTemplate'],
          icon: 'colModel'
        }
      },

      // 在线用户
      {
        path: 'onlineUsers',
        component: () => import('@/views/systemAdm/onlineUsers/index'),
        name: 'OnlineUsers',
        meta: {
          title: 'onlineUsers',
          roles: ['Systems.OnlineUser'],
          icon: 'user'
        }
      },
      // 用户仓库权限
      {
        path: 'userWarePermissions',
        component: () => import('@/views/systemAdm/userWarePermissions/index'),
        name: 'UserWarePermissions',
        meta: {
          title: 'userWarePermissions',
          // roles: ['Systems.TableTemplate'],
          icon: 'appVersion'
        }
      }
    ]
  },
  // 基础信息(基础数据)
  {
    path: '/baseInfo',
    component: Layout,
    redirect: '/baseInfo/materials',
    alwaysShow: true,
    name: 'baseInfo',
    meta: {
      title: 'baseInfo',
      icon: 'baseInfo',
      roles: ['BasicsManagement']
    },
    children: [
      // 物料
      {
        path: 'materials',
        component: () => import('@/wms/baseInfo/materials/index'),
        name: 'Materials',
        meta: {
          title: 'materials',
          roles: ['BasicsManagement.Material'],
          icon: 'materials'
        }
      },
      // {
      //   path: 'supplier',
      //   component: () => import('@/wms/supplier/svueupplierManage'),
      //   name: 'Supplier',
      //   meta: {
      //     title: 'supplier',
      //     roles: ['Basics.Supplier'],
      //     icon: 'inShelves'
      //   }
      // },
      // 单位管理
      // {
      //   path: 'unitManagement',
      //   component: () => import('@/wms/baseInfo/unitManagement'),
      //   name: 'UnitManagement',
      //   meta: {
      //     title: 'unitManagement',
      //     roles: ['Basics.Units'],
      //     icon: 'inShelves'
      //   }
      // },
      // 客户管理
      // {
      //   path: 'customer',
      //   component: () => import('@/wms/baseInfo/customer'),
      //   name: 'Customer',
      //   meta: {
      //     title: 'customer',
      //     roles: ['Basics.Customer'],
      //     icon: 'inShelves'
      //   }
      // },
      // 标签管理

      {
        path: 'label',
        component: () => import('@/wms/baseInfo/label'),
        name: 'Label',
        meta: {
          title: 'label',
          roles: ['BasicsManagement.MaterialBarCode'],
          icon: 'inShelves'
        }
      }
    ]
  },
  {
    // 接口
    path: '/interface',
    component: Layout,
    redirect: '/interface/interfaceConfiguration',
    alwaysShow: true,
    name: 'InterfaceManagement',
    meta: {
      title: 'interfaceManagement',
      roles: ['APIManagement'],
      icon: 'inShelves'
    },
    children: [
      // 接口配置
      {
        path: 'interfaceConfiguration',
        component: () => import('@/wms/interface/interfaceConfiguration'),
        name: 'InterfaceConfiguration',
        meta: {
          title: 'interfaceConfiguration',
          roles: ['APIManagement.APIConfig'],
          icon: 'inShelves'
        }
      },
      // 接口日志
      {
        path: 'interfaceLog',
        component: () => import('@/wms/interface/interfaceLog'),
        name: 'InterfaceLog',
        meta: {
          title: 'interfaceLog',
          roles: ['APIManagement.APILog'],
          icon: 'inShelves'
        }
      }
    ]
  },
  // 仓库管理
  {
    path: '/baseData',
    component: Layout,
    redirect: '/baseData/materials',
    alwaysShow: true,
    name: 'BaseData',
    meta: {
      title: 'baseData',
      icon: 'baseData',
      roles: ['WarehouseManagement']
    },
    children: [
      // 载具管理
      {
        path: 'box',
        component: () => import('@/wms/baseData/box/index.vue'),
        name: 'Box',
        meta: {
          title: 'box',
          roles: ['WarehouseManagement.Box'],
          icon: 'box'
        }
      },
      // 仓库管理
      {
        path: 'warehouse',
        component: () => import('@/wms/baseData/warehouse/index.vue'),
        name: 'Warehouse',
        meta: {
          title: 'warehouse',
          roles: ['WarehouseManagement.Warehouse'],
          icon: 'warehouse'
        }
      },
      // 货位管理
      {
        path: 'locations',
        component: () => import('@/wms/baseData/locations/index.vue'),
        name: 'Locations',
        meta: {
          title: 'locations',
          roles: ['WarehouseManagement.Locations'],
          icon: 'locations'
        }
      },
      // sap仓库权限管理
      {
        path: 'SAPWarehousePermission',
        component: () => import('@/wms/baseData/SAPWarehousePermission/index.vue'),
        name: 'SAPWarehousePermission',
        meta: {
          title: 'SAPWarehousePermission',
          roles: ['WarehouseManagement.SapWarehouse'],
          icon: 'locations'
        }
      },
      // 区域管理
      {
        path: 'areaManagement',
        component: () => import('@/wms/baseData/areaManagement/index.vue'),
        name: 'AreaManagement',
        meta: {
          title: 'areas',
          roles: ['WarehouseManagement.Areas'],
          icon: 'warehouse'
        }
      },
      // 码头管理
      {
        path: 'wharf',
        component: () => import('@/wms/baseData/wharf/index.vue'),
        name: 'Wharf',
        meta: {
          title: 'wharf',
          roles: ['WarehouseManagement.Wharf'],
          icon: 'wharf'
        }
      },
      // 设备管理
      {
        path: 'device',
        component: () => import('@/wms/baseData/device/index.vue'),
        name: 'Device',
        meta: {
          title: 'device',
          roles: ['WarehouseManagement.Device'],
          icon: 'baseData'
        }
      }
    ]
  },
  // 分拣管理
  {
    path: '/sortingAdm',
    component: Layout,
    redirect: '/sortingAdm/sorting',
    alwaysShow: true,
    name: 'SortingAdm',
    meta: {
      title: 'sortingAdm',
      icon: 'sortingAdm',
      roles: ['SortingManagement']
    },
    children: [
      {
        path: 'sorting',
        component: () => import('@/wms/sortingAdm/sorting'),
        name: 'Sorting',
        meta: {
          title: 'sorting',
          roles: ['SortingManagement.SortingHeader'],
          icon: 'sorting'
        }
      },
      {
        path: 'sortingDesk',
        component: () => import('@/wms/sortingAdm/sortingDesk'),
        name: 'SortingDesk',
        meta: {
          title: 'sortingDesk',
          roles: ['SortingManagement.SortingDesk'],
          icon: 'sortingDesk'
        }
      }
    ]
  },
  // 报表管理
  {
    path: '/report',
    component: Layout,
    redirect: '/report/inventoryManage',
    alwaysShow: true,
    name: 'report',
    meta: {
      title: 'report',
      roles: ['Report'],
      icon: 'inShelves'
    },
    children: [
      // 库存管理
      {
        path: 'inventoryManage',
        component: () => import('@/wms/report/inventoryManage/index.vue'),
        name: 'InventoryManage',
        meta: {
          title: 'inventoryManage',
          roles: ['StockManagement'],
          icon: 'inStockAdm'
        }
      },
      // 库存报表
      {
        path: 'inventoryReport',
        component: () => import('@/wms/report/inventoryReport/index.vue'),
        name: 'InventoryReport',
        meta: {
          title: 'inventoryReport',
          roles: ['Report.BoxInventory'],
          icon: 'inStockAdm'
        }
      },
      // 库存汇总报表
      {
        path: 'inventorySummary',
        component: () => import('@/wms/report/inventorySummary/index.vue'),
        name: 'InventorySummary',
        meta: {
          title: 'inventorySummary',
          roles: ['Report.MaterialInventory'],
          icon: 'inStockAdm'
        }
      },
      // 物料履历
      {
        path: 'materialHistory',
        component: () => import('@/wms/report/materialHistory/index.vue'),
        name: 'MaterialHistory',
        meta: {
          title: 'materialHistory',
          roles: ['Report.MaterialResume'],
          icon: 'inShelves'
        }
      },
      // 锁库管理
      {
        path: 'lockManagement',
        component: () => import('@/wms/report/lockManagement/index.vue'),
        name: 'LockManagement',
        meta: {
          title: 'lockManagement',
          roles: ['StockManagement.LockStock'],
          icon: 'inShelves'
        }
      },
      // 交接清单
      {
        path: 'handoverList',
        component: () => import('@/wms/report/handoverList/index.vue'),
        name: 'HandoverList',
        meta: {
          title: 'handoverList',
          roles: ['MaterialHandoverManagement.Handover'],
          icon: 'inShelves'
        }
      },
      // 入库报表
      {
        path: 'warehousingReport',
        component: () => import('@/wms/report/warehousingReport/index.vue'),
        name: 'WarehousingReport',
        meta: {
          title: 'warehousingReport',
          roles: ['Report.InStockStatistics'],
          icon: 'inShelves'
        }
      },
      // 出库报表
      {
        path: 'outboundReport',
        component: () => import('@/wms/report/outboundReport/index.vue'),
        name: 'OutboundReport',
        meta: {
          title: 'outboundReport',
          roles: ['Report.OutCargoReport'],
          icon: 'inShelves'
        }
      },
      // 卡板交接报表
      {
        path: 'cardBoardHandover',
        component: () => import('@/wms/report/cardBoardHandover/index.vue'),
        name: 'CardBoardHandover',
        meta: {
          title: 'cardBoardHandover',
          roles: ['Report.HandoverOfCardReport'],
          icon: 'inShelves'
        }
      },
      // 收货报表
      {
        path: 'receiptReport',
        component: () => import('@/wms/report/receiptReport/index.vue'),
        name: 'ReceiptReport',
        meta: {
          title: 'receiptReport',
          roles: ['Report.ReceiveGoodsReport'],
          icon: 'inShelves'
        }
      },
      // 空托盘报表
      {
        path: 'emptyReport',
        component: () => import('@/wms/report/emptyReport/index.vue'),
        name: 'EmptyReport',
        meta: {
          title: 'emptyReport',
          roles: ['Report.BlankReport'],
          icon: 'inShelves'
        }
      },
      // 库存差异报表
      {
        path: 'inventoryVarianceReport',
        component: () => import('@/wms/report/inventoryVarianceReport/index.vue'),
        name: 'InventoryVarianceReport',
        meta: {
          title: 'inventoryVarianceReport',
          roles: ['Report.InventoryVarianceReport'],
          icon: 'inShelves'
        }
      },
      // 设备异常报表
      {
        path: 'deviceExceptionReport',
        component: () => import('@/wms/report/deviceExceptionReport/index.vue'),
        name: 'DeviceExceptionReport',
        meta: {
          title: 'deviceExceptionReport',
          roles: ['Report.DeviceErrorReport'],
          icon: 'inShelves'
        }
      },
      /* 输送线缓存报表 */
      {
        path: 'conveyorLineCacheReport',
        component: () => import('@/wms/report/conveyorLineCacheReport/index.vue'),
        name: 'ConveyorLineCacheReport',
        meta: {
          title: 'conveyorLineCacheReport',
          roles: ['Report.LineCacheReport'],
          icon: 'inShelves'
        }
      },
      /* 产能报表 */
      {
        path: 'deliverability',
        component: () => import('@/wms/report/deliverability/index.vue'),
        name: 'Deliverability',
        meta: {
          title: 'deliverability',
          roles: ['Report.Deliverability'],
          icon: 'inShelves'
        }
      },
      // 补货报表
      {
        path: 'replenishmentReport',
        component: () => import('@/wms/report/replenishmentReport/index.vue'),
        name: 'ReplenishmentReport',
        meta: {
          title: 'replenishmentReport',
          // roles: [''],
          icon: 'inStockAdm'
        }
      },
      // 箱子进度跟踪报表
      {
        path: 'boxPositionTrackProgressList',
        component: () => import('@/wms/report/boxPositionTrackProgressList/index.vue'),
        name: 'BoxPositionTrackProgressList',
        meta: {
          title: 'boxPositionTrackProgressList',
          // roles: [''],
          icon: 'inStockAdm'
        }
      },
      /* 箱子出库目标码头报表 */
      {
        path: 'boxOutTargetWharfIdList',
        component: () => import('@/wms/report/boxOutTargetWharfIdList/index.vue'),
        name: 'BoxOutTargetWharfIdList',
        meta: {
          title: 'boxOutTargetWharfIdList',
          // roles: [''],
          icon: 'inShelves'
        }
      },
      // 现场物料交接报表
      {
        path: 'transferMaterialResumeList',
        component: () => import('@/wms/report/transferMaterialResumeList/index.vue'),
        name: 'TransferMaterialResumeList',
        meta: {
          title: 'transferMaterialResumeList',
          // roles: ['Report.transferMaterialResumeList'],
          icon: 'inShelves'
        }
      },
      // 生成送货单报表
      {
        path: 'generateDeliveryNote',
        component: () => import('@/wms/report/generateDeliveryNote/index.vue'),
        name: 'GenerateDeliveryNote',
        meta: {
          title: 'generateDeliveryNote',
          // roles: [''],
          icon: 'inStockAdm'
        }
      }
    ]
  },
  // 策略管理
  {
    path: '/strategyAdm',
    component: Layout,
    redirect: '/strategyAdm/inStockStrategy',
    alwaysShow: true,
    name: 'StrategyAdm',
    meta: {
      title: 'StrategyAdm',
      roles: ['Strategy'],
      icon: 'strategyAdm'
    },
    children: [
      {
        path: 'strategyConfig',
        component: () => import('@/wms/strategyAdm/strategyConfig'),
        name: 'StrategyConfig',
        meta: {
          title: 'strategyConfig',
          roles: ['Strategy.StrategyConfig'],
          icon: 'strategyConfig'
        }
      },
      {
        path: 'strategyDetails',
        component: () => import('@/wms/strategyAdm/strategyDetails'),
        name: 'StrategyDetails',
        meta: {
          title: 'strategyDetails',
          roles: ['Strategy.StrategyDetails'],
          icon: 'strategyDetails'
        }
      },
      {
        path: 'strategyFlowGather',
        component: () => import('@/wms/strategyAdm/strategyFlowGather'),
        name: 'StrategyFlowGather',
        meta: {
          title: 'strategyFlowGather',
          roles: ['Strategy.StrategyFlowGather'],
          icon: 'strategyFlowGather'
        }
      },
      {
        path: 'strategyFlow',
        component: () => import('@/wms/strategyAdm/strategyFlow'),
        name: 'StrategyFlow',
        meta: {
          title: 'strategyFlow',
          roles: ['Strategy.StrategyFlow'],
          icon: 'strategyFlow'
        }
      }
    ]
  },
  // WCS任务管理
  {
    path: '/wcsAdm',
    component: Layout,
    redirect: '/wcsAdm/wcsTask',
    alwaysShow: true,
    name: 'WCSAdm',
    meta: {
      title: 'wcsTaskAdm',
      roles: ['TaskInfoManage'],
      icon: 'wcsTask'
    },
    children: [
      {
        path: 'wcsTask',
        component: () => import('@/wms/wcsAdm/wcsTask'),
        name: 'WCSTask',
        meta: {
          title: 'wcsTask',
          roles: ['TaskInfoManage.TaskInfo'],
          icon: 'wcsTask'
        }
      }
    ]
  },
  // 入库管理
  {
    path: '/inStockAdm',
    component: Layout,
    redirect: '/inStockAdm/inShelves',
    alwaysShow: true,
    name: 'InStockAdm',
    meta: {
      title: 'inStockAdm',
      roles: ['InshelvesManagement'],
      icon: 'inStockAdm'
    },
    children: [
      {
        path: 'inShelves',
        component: () => import('@/wms/inStockAdm/inShelves'),
        name: 'InShelves',
        meta: {
          title: 'inShelves',
          roles: ['InshelvesManagement.Inshelves'],
          icon: 'inShelves'
        }
      }
    ]
  },
  // 出库管理
  {
    path: '/outStockAdm',
    component: Layout,
    redirect: '/outStockAdm/outShelves',
    alwaysShow: true,
    name: 'OutStockAdm',
    meta: {
      title: 'outStockAdm',
      roles: ['OutshelvesManagement'],
      icon: 'outStockAdm'
    },
    children: [
      {
        path: 'outShelves',
        component: () => import('@/wms/outStockAdm/outShelves'),
        name: 'OutShelves',
        meta: {
          title: 'outShelves',
          roles: ['OutshelvesManagement.Outshelves'],
          icon: 'outShelves'
        }
      },
      {
        path: 'outStockRequest',
        component: () => import('@/wms/outStockAdm/outStockRequest'),
        name: 'OutStockRequest',
        meta: {
          title: 'outStockRequest',
          roles: ['OutshelvesManagement.Outshelves.OutStockRequest'],
          icon: 'outStockRequest'
        }
      }
    ]
  },
  // 订单管理
  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/orderManagement/DeliveryOrder',
    alwaysShow: true,
    name: 'OrderManagement',
    meta: {
      title: 'orderManagement',
      roles: ['OrderManagement'],
      icon: 'wcsTask'
    },
    children: [
      // 备料单管理
      {
        path: 'readyMaterials',
        component: () => import('@/wms/orderManagement/readyMaterials'),
        name: 'ReadyMaterials',
        meta: {
          title: 'readyMaterials',
          roles: ['PickingManagement.PickingHeader'],
          icon: 'readyMaterials'
        }
      },
      // 盘点单管理
      {
        path: 'inventoryOrder',
        component: () => import('@/wms/orderManagement/inventoryOrder'),
        name: 'InventoryOrder',
        meta: {
          title: 'inventoryOrder',
          roles: ['OrderManagement.InventoryOrder'],
          icon: 'inventoryOrder'
        }
      },
      // 入库单管理
      {
        path: 'inStockOrder',
        component: () => import('@/wms/orderManagement/inStockOrder'),
        name: 'InStockOrder',
        meta: {
          title: 'inStockOrder',
          roles: ['OrderManagement.InStockOrder'],
          icon: 'readyMaterials'
        }
      },
      // 出库单管理
      {
        path: 'outStockOrder',
        component: () => import('@/wms/orderManagement/outStockOrder'),
        name: 'OutStockOrder',
        meta: {
          title: 'outStockOrder',
          roles: ['OrderManagement.OutStockOrder'],
          icon: 'readyMaterials'
        }
      }
    ]
  },
  // 一期AGV管理
  {
    path: '/agvManagement',
    component: Layout,
    redirect: '/agvManagement/agvPickOrderDetailAdm',
    alwaysShow: true,
    name: 'AGVManagement',
    meta: {
      title: 'agvManagement',
      roles: ['AGVManagement'],
      icon: 'wcsTask'
    },
    children: [
      {
        path: 'agvPickOrderDetailAdm',
        component: () => import('@/wms/agvManagement/agvPickOrderDetailAdm'),
        name: 'AGVPickOrderDetailAdm',
        meta: {
          title: 'agvPickOrderDetailAdm',
          roles: ['AGVManagement.AGVPickOrderDetailAdm'],
          icon: 'agvPickOrderDetailAdm'
        }
      },
      {
        path: 'agvTaskAdm',
        component: () => import('@/wms/agvManagement/agvTaskAdm'),
        name: 'AGVTaskAdm',
        meta: {
          title: 'agvTaskAdm',
          roles: ['AGVManagement.AGVTaskAdm'],
          icon: 'agvTaskAdm'
        }
      }
    ]
  },
  // 四期AGV任务管理
  {
    path: '/FourDataagvManagement',
    component: Layout,
    redirect: '/fourDataagvManagement/callAGVWarehousing',
    alwaysShow: true,
    name: 'FourDataagvManagement',
    meta: {
      title: 'fourDataagvManagement',
      roles: ['FourDataagvManagement'],
      icon: 'wcsTask'
    },
    children: [
      // 呼叫AGV入库 层高管理-WMS
      {
        path: 'callAGVWarehousing',
        component: () => import('@/wms/fourDataagvManagement/callAGVWarehousing'),
        name: 'CallAGVWarehousing',
        meta: {
          title: 'callAGVWarehousing',
          roles: ['FourDataagvManagement.CallAGVWarehousing'],
          icon: 'callAGVWarehousing'
        }
      },
      // AGV任务管理-WMS
      {
        path: 'agvTask',
        component: () => import('@/wms/fourDataagvManagement/agvTask'),
        name: 'AGVTask',
        meta: {
          title: 'FouragvTask',
          roles: ['FourDataagvManagement.FouragvTask'],
          icon: 'agvTask'
        }
      }
    ]
  },
  // 雄韬AGV任务管理
  {
    path: '/XiongtaoAGVTask',
    component: Layout,
    reirect: '/xiongtaoAGVTask/AGVTask',
    alwaysShow: true,
    name: 'XiongtaoAGVTask',
    meta: {
      title: 'xiongtaoAGVTask',
      roles: ['XiongtaoAGVTask'],
      icon: 'wcsTask'
    },
    children: [
      // AGV管理
      {
        path: 'AGVTask',
        component: () => import('@/wms/XiongtaoAGVTask/AGVTask'),
        name: 'AGVTaskTwo',
        meta: {
          title: 'AGVTask',
          roles: ['XiongtaoAGVTask.AGVTaskTwo'],
          icon: 'AGVTask'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
