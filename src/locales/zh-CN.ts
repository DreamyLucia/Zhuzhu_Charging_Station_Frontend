import { getAllStationApi } from "@/api/station";

export default {
  productName: '猪猪充电站',
  message: {
    error: {
      usernameEmpty: '用户名不能为空',
      passwordEmpty: '密码不能为空',
      recheckPasswordEmpty: '请再次确认密码',
      passwordMismatch: '两次输入的密码不一致',
      getUserInfoError: '获取用户信息失败',
      getAllStationError: '获取充电桩信息失败',
      getOrderError: '获取订单信息失败',
    },
    success: {
      signUp: '注册成功',
      signIn: '登录成功',
      reset: '重置密码成功',
      logout: '登出成功',
    },
    info: {

    },
  },
  signup: {
    title: '欢迎来到',
    label: '注册您的账号',
    usernamePlaceholder: '用户名',
    passwordPlaceholder: '密码',
    recheckPlaceholder: '确认密码',
    remember: '记住我',
    button: '注册',
    signinLabel: '已经有账号了？',
    signinButton: '去登录',
  },
  signin: {
    title: '欢迎回来',
    label: '登录您的账号',
    usernamePlaceholder: '用户名',
    passwordPlaceholder: '密码',
    remember: '记住我',
    forget: '忘记密码',
    button: '登录',
    signupLabel: '还没有账号？',
    signupButton: '去注册',
  },
  reset: {
    label: '重置密码',
    usernamePlaceholder: '用户名',
    passwordPlaceholder: '密码',
    recheckPlaceholder: '确认密码',
    button: '重置',
  },
  unit: {
    degree: '度',
    currency: '元',
    time: '秒',
    times: '次',
  },
  dashboardSiderbar: {
    digitalTitle: {
      totalDuration: '总充电时长',
      totalCount: '总充电次数',
      totalFee: '总充电费用',
      totalServiceFee: '总服务费',
      totalAmount: '总充电电量',
      totalCost: '总费用',
    },
    button: {
      chargePanel: '充电面板',
      allOrders: '全部订单',
      adminPanel: '管理员面板',
      settings: '设置',
    },
  },
  stationContainer: {
    button: {
      add: '新建订单',
      reload: '刷新列表',
    },
  },
  stationCard: {
    power: '功率',
    serviceFee: '服务费',
    mode: {
      slow: '慢充',
      fast: '快充',
    },
    status: {
      idle: '空闲中',
      charging: '使用中',
      closed: '关闭',
      error: '故障',
    },
    price: {
      peak: '峰时电价',
      normal: '平时电价',
      valley: '谷时电价',
    },
  },
  order: {
    status: {
      completed: "已完成",
      inProgress: "进行中",
      queued: "排队中",
      waiting: "等待中",
      cancelled: "已取消",
    },
  },
}
