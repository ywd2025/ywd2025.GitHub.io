export default {
  baseUrl: "http://api.deac.info",
  IP:'ws://74.67.002.57:8083/mqtt',
  imgUrl:'https://ds-apk.s3.ap-east-1.amazonaws.com/imges',
  login: {
    login: "/uc/login",
    getCountry: "/uc/support/country",
    setPhoneCode: "/uc/mobile/code",
    setEmailCode: "/uc/reg/email/code",
    loginOut: "/uc/loginout",
    configQuery: "/uc/system/front/config-query",
  },

  user: {
    real: "/uc/approve/real/detail", //判断身份验证
    country: "/uc/support/country",
    submitReal: "/uc/approve/real/name",
    userInfo: "/uc/member/my-info", // 获取用户信息
    getSecretKey: "/newbusiness/PublicController/getSecretKey", // 獲取谷歌秘鑰
    checkValidCode: "/newbusiness/PublicController/checkValidCode", // 驗證谷歌秘鑰
    googleSetCode: "/uc/mobile/google/code", // 發送驗證碼
    bindGoogle: "/newbusiness/PublicController/bind/google", // 綁定谷歌
    updateGoogleFlag: "/newbusiness/PublicController/updateGoogleFlag", // 谷歌驗證器開啟關閉
    setEmailCode: "/uc/reset/email/code", // 修改密碼發送驗證碼
    updatePassword: "/uc/reset/login/passwordByOld", // 修改密碼
    updateMember: "/uc/member/updateMember", // avatar username 修改昵称及头像
    findRecord: "/uc/findRecord", // 登陆设备
    loginOutByEquipment: "/uc/loginOutByEquipment", // 踢人
    newPhone: "/uc/approve/bind/newPhone", // 更换绑定手机号
    newEmail: "/uc/approve/bind/newEmail", // 更换绑定邮箱
    oldEmailCode: "/uc/bind/email/oldCode", // 绑定邮箱原邮箱验证码
    EmailNewCode: "/uc/bind/email/newCode", // 绑定邮箱新邮箱验证码
    mobileNewCode: "/uc/mobile/bind/newCode", // 绑定新手机验证码
    mobileOldCode: "/uc/mobile/bind/oldCode", // 绑定原手机验证码
    email: "/uc/approve/bind/email", // 绑定邮箱
    bindemailcode: "/uc/bind/email/code", // 绑定邮箱验证码
    bindmobilecode: "/uc/mobile/bind/code", // 绑定手机验证码
    phone: "/uc/approve/bind/phone", // 绑定手机
    commitCoinValidate: "/uc/mobile/commitCoinValidate", //  谷歌验证器  获取验证码
    phoneOrEmail: "/uc/mobile/google/phoneOrEmail", //  谷歌验证器  提交审核
    pageMy: "/uc/message/listMsg",
    oneliCkRead: "/uc/message/oneliCkRead"
  },

  index: {
    getBanner: "/uc/ancillary/system/advertise",
    getNotice: "/uc/announcement/page",
    getDictionary: "/uc/announcement/getPlateInfoByLable",
    getEvaluate: "/uc/ancillary/system/findHomeManagementList",
    getFriendlyLinkList: "/uc/ancillary/system/findFriendlyLinkList", // 首页友情链接
    getTraderList: '/trader/TraderController/trader/list',
    getOverview: '/mqtts/exchange/market/overview',
  },

  // 理财赚币
  financial: {
    getMemberZJWalletApi: "/newbusiness/NewCoinMemberCycleController/getMemberZJWallet", //获取用户所有资金钱包-返回所有用户资金钱包可用值，以及每个币种支持的分期赚币方案，以及昨日收益，累计收益
    addWalletApi: "/newbusiness/NewCoinMemberCycleController/add",  //参加申购
  },

  financialRecords: {
    earningsApi: "/newbusiness/NewCoinMemberCycleController/dayListByPage", // 收益记录
    purchaseApi: "/newbusiness/NewCoinMemberCycleController/joinListByPage", // 历史申购
    redeemApi: "/newbusiness/NewCoinMemberCycleController/getHistoryList", // 赎回记录
    redemptionApi: "/newbusiness/NewCoinCycleController/redemption", // 手动赎回
  },

  // C2C买币
  buy: {
    payDepositApi: "/newbusiness/c2c/payDeposit", // 冻结资金
    orderPageApi: "/newbusiness/c2c/order/getOrderPage", // 买币商家单列表
    getDepositApi: "/newbusiness/c2c/getDeposit", // 获取服务器设置的押金
    getMyDepositApi: "/newbusiness/c2c/getMyDeposit", // 获取用户押金余额
    // 支付方式
    payType: "/newbusiness/c2c/ptype/getPayType", // 支付方式-获取当前用户支付方式
    addPayYD: "/newbusiness/c2c/ptype/saveOrUpdataWithYD", // 支付方式-移动支付-添加修改
    addPayBank: "/newbusiness/c2c/ptype/saveOrUpdataWithBank", // 支付方式-银行卡-添加修改
    delPayYD: "/newbusiness/c2c/ptype/delectPayTypeOfYD", // 支付方式-移动支付-删除
    delPayBank: "/newbusiness/c2c/ptype/delectPayTypeOfBank", // 支付方式-银行卡-删除
    // 商户
    getMemberInformationApi: "/newbusiness/c2c/getMemberInformation", // 获取商户信息
    createOrderApi: "/newbusiness/c2c/order/createOrder", // 商户发布订单
    getOrderPageByShopIdApi: "/newbusiness/c2c/order/getOrderPageByShopId", // 商户查询自己发布的订单
    cancelOrderApi: "/newbusiness/c2c/order/cancelOrder", // 商户删除自己的订单
    getOrderInfoApi: "/newbusiness/c2c/order/getOrderInfo", // 通过商家单查询关联的用户单
    // 用户
    getPayType: "/newbusiness/c2c/order/getPayType", //查询订单id对应的付款方式
    createBuyOrderApi: "/newbusiness/c2c/orderInfo/createBuyOrder", // 购买
    createSellOrderApi: "/newbusiness/c2c/orderInfo/createSellOrder", // 出售
    userOrderListApi: "/newbusiness/c2c/orderInfo/getByMemberId", // 用户订单分页查询
    paymentApi: "/newbusiness/c2c/confirm/payment", // 确认付款
    collectApi: "/newbusiness/c2c/confirm/collect", // 放币
    getCancelCauseApi: "/newbusiness/c2c/getCancelCause", // 取消订单原因
    cancelOrderInfoApi: "/newbusiness/c2c/cancelOrderInfo", // 取消订单
    avgPriceApi: "/newbusiness/c2c/greentrade/avgPrice", // 获取均价
    idealOrderApi: "/newbusiness/c2c/greentrade/idealOrder", // 获取快速订单
    sendVerifyCode: "/newbusiness/c2c/sendVerifyCode", // 出售币子获取二维码
    confirmVerifyCode: "/newbusiness/c2c/confirmVerifyCode", // 出售币子验证二维码
    shoprefund: "/newbusiness/c2c/shop/refund", // 解除商家身份
    shopapplication: "/newbusiness/c2c/shop/cancel/application", // 撤销解除商家身份
    shopthaw: "/newbusiness/c2c/shop/thaw", // 解冻申诉
  },

  // 跟单
  follow: {
    traderList: "/trader/TraderController/trader/list", // 总资产
    memberInfo: "/trader/TraderController/getNormalMemberInfo", // 用户收益率和总资产
    exchangeCoinList:
      "/newbusiness/PublicController/getAllContractCoinAndExchangeCoin", // 交易对列表
    traderVerify: "/trader/TraderController/trader/verify", // 交易员申请
    traderInfoVerify: "/trader/TraderController/trader/info/verify", // 交易员审核状态
    // 交易员详情
    followerDetailApi: "/trader/TraderController/trader/info/detail", // 交易员详情
    rankingApi: "/trader/TraderController/trader/follow/ranking", // 交易员 跟单排名
    leaderCurrentApi: "/trader/TraderController/current", // 当前带单记录
    leaderHistoryApi: "/trader/TraderController/history", // 交易员历史带单记录
    leaderFollowersApi: "/trader/TraderController/trader/follow/list", // 查看交易员下的跟随者
    followSettingApi: "/trader/TraderController/save/setting", // 设置参数确认跟单
    myFollowInfo: "/trader/TraderController/myfollow/info", // 我的跟单数据
    myTraderInfoApi: "/trader/TraderController/trader/info", // 我的交易员
    currentFollowApi: "/trader/TraderController/current/follow", // 获取当前跟单
    historyFollowApi: "/trader/TraderController/history/follow", // 获取历史跟单
    cancelFellowApi: "/trader/TraderController/cancelFellow", // 取消连续跟随
    getTraderInfo: "/trader/TraderController/getTraderInfo", // 获取交易员信息
    deleteAllDoc: "/uc/member/deleteAllDoc", // 取消用户所有跟单
  },

  // 行情
  markets: {
    //行情-現貨自选
    favorThumb: "/exchange/favor/find", // 收藏
    //行情-合約自选
    swapFavorThumb: "/mqtts/contract/favor/find", // 收藏
    //行情-既现货币币交易
    marketThumb: "/mqtts/exchange/market/overview", // 現貨
    //合约列表
    swapThumb: "/mqtts/contract/market/symbol-thumb", // 合約
    topData: "/market/symbol-thumb-first", //上方四條數據
    // 收藏與取消收藏
    addFavor: "/exchange/favor/add", // 添加收藏
    delFavor: "/exchange/favor/delete", // 刪除收藏
    addSwapFavor: "/swap/favor/add", // 添加收藏
    delSwapFavor: "/swap/favor/delete", // 刪除收藏
  },

  // 資產頁面
  finance: {
    // 資產總覽
    allFinance: "/newbusiness/MemberWalletController/getWalletList",
    // 近期充提交易
    allFinanceRecord: "/newbusiness/MemberWalletController/transfer/index",
    // 賬戶信息
    walletDetail: "/newbusiness/MemberWalletController/getWalletDetail",
    // 合約與跟單的表格
    contractDetail: "/newbusiness/MemberWalletController/getContractDetail",
    // 充幣記錄
    depositRecordsList: "/uc/memberDeposit/queryByUserId",
    // 添加充幣申請
    submitVerify: "/uc/memberDeposit/addAudit",
    //根据币种查询可划转账户
    canTransferAccount: "/newbusiness/MemberWalletController/transfer/wallet",
    // 获取所有币种汇率
    getAllRateApi: "/mqtts/exchange/exchange-rate/getAllRate",
    // 合约最低保证金率
    getRuleMarginRate: "/swap/coin/rule/list",
  },

  // 資金變動 查询 充币、提币、划转
  FinanceChange: {
    // 基礎信息
    deposit: "/newbusiness/MemberWalletController/coin/list",
    getForPc: "/newbusiness/MemberWalletController/coin/list/getForPc",   //不要token币种信息
    //查询币种对应的链信息
    depositAddress: "/newbusiness/MemberWalletController/coin/chain/",
    //重置地址
    resetAddress: "/uc/asset/wallet/reset-address",
    // 提幣提領
    submitWithdraw: "/newbusiness/MemberWalletController/withdraw/apply",
    // 提币地址
    getAddress: "/newbusiness/MemberWalletController/withdraw/address/list",
    // 保存提幣地址
    addAddress: "/newbusiness/MemberWalletController/withdraw/address",
    // 刪除提幣地址
    delAddress: "/newbusiness/MemberWalletController/withdraw/address",
    // 划转提交
    transferSubmit: "/newbusiness/MemberWalletController/transfer",
    // 提币 内转 平台内提币到指定账户
    outInPlateApi: "/uc/member/outInPlate",
  },

  // 現貨交易
  exchange: {
    //币币交易委托提交与查询接口
    orderAdd: "/exchange/order/add", //提交订单接口
    // current: '/exchange/order/current', //当前委托接口
    current: "/exchange/order/personal/current", //当前委托接口(新)
    history: "/exchange/order/personal/history", //历史委托接口
    orderhistory: "/exchange/order/history", //历史委托接口
    detail: "/exchange/order/detail/", //详细订单接口
    favorFind: "/exchange/favor/find", //查询自选
    favorAdd: "/exchange/favor/add", //添加自选
    favorDelete: "/exchange/favor/delete", //删除自选
    orderCancel: "/exchange/order/cancel", //取消委托
    spotOrderAll: "/exchange/order/spotOrderAll", //计划委托
    orderCancelPlan: "/exchange/order/cancenlSpotOrder", //计划委托取消
    coinAll: "/exchange/exchange-coin/coin-all", //现货盘口精度列表
  },

  // 合約交易
  swap: {
    //合約-自选
    favorFind: "/mqtts/contract/favor/find", //查询自选
    favorAdd: "/swap/favor/add", // 收藏
    favorDelete: "/swap/favor/delete", //删除自选
    open: "/swap/order/open", // 开仓
    close: "/swap/order/close", // 全倉平仓
    closeFix: "/swap/order/closeFix", // 逐倉平仓
    addOpenOrClose: "/swap/order/addOrderToOpenWinOrLoseOrderList", // 设置逐仓订单止盈止损
    // addOpenCroClose: "/swap/order/addCrossedOrderToOpenWinOrLoseOrderList", // 设置全仓订单止盈止损
    // addPrincipalAmountApi: "/swap/order/addPrincipalAmount", // 追加保证金
    ws: "/swap/swap-ws",
    thumb: "/mqtts/contract/market/symbol-thumb",
    plate: "/mqtts/contract/market/exchange-plate", //主动查询的盘口信息
    platemini: "/mqtts/contract/market/exchange-plate-mini", //获取10条数据
    platefull: "/mqtts/contract/market/exchange-plate-full", //获取所有数据
    trade: "/mqtts/contract/market/latest-trade", //主动查询的实时成交信息
    symbolInfo: "/swap/symbol-info", // 獲取交易对信息
    coinInfo: "/swap/coin/coin-info", // 合约交易对信息详情
    contractWallet: "/swap/wallet/detail", // 用户合约钱包账户信息
    getTakePosition: "/swap/order/getTakePosition", // 获取当前用户跟单/非跟单持仓
    modifyLeverage: "/swap/order/modify-leverage", // 修改杠杆
    canSwitchPattern: "/swap/order/can-switch-pattern", // 是否能修改仓位模式
    switchPattern: "/swap/order/switch-pattern", // 修改仓位模式
    cancel: "/swap/order/cancel", // 撤销
    getEntrustList: "/swap/order/current", // 当前委托
    getHistoryEntrustList: "/swap/order/history", // 历史委托
    getPageInfo: "/swap/wallet/getPageInfo", // 合约页面信息汇总
    getCloseAll: "/swap/order/closeAll", // 一件平仓
    getSpotAll: "/swap/order/getSpotAll", // 计划委托
    cancelSpotOrder: "/swap/order/cancelSpotOrder", // 撤销计划委托
    blast: "/swap/order/blast", // 撤销计划委托
    coinAll: '/swap/coin/coin-all', //合约盘口精度列表
    orderMerge: "/swap/order/merge", // 合并仓位
  },

  // 記錄
  record: {
    // 2024 04 30 记录统一成一个接口了 0全部1充值2提币3划转4现货5理财6佣金7手续费8IM9矿场
    getRecordApi: "/newbusiness/MemberWalletController/memberTransactionRecord",
    //充幣記錄
    depositRecord: "/uc/withdraw/memberDeposit",
    //提幣記錄
    withdrawRecord: "/uc/withdraw/record",
    //划转记录
    transferRecord: "/uc/withdraw/transList",
    //其他记录
    otherRecord: "/uc/member/outInPlateRecord",
  },

  market: {
    ws: "/market/market-ws", //行情
    swapThumb: "/mqtts/contract/market/symbol-thumb", // 合約
    marketThumb: "/mqtts/exchange/market/symbol-thumb", // 現貨
    thumb: "/mqtts/exchange/market/symbol-thumb",
    thumbTrend: "/mqtts/exchange/market/symbol-thumb-trend",
    plate: "/mqtts/exchange/market/exchange-plate", //主动查询的盘口信息
    platemini: "/mqtts/exchange/market/exchange-plate-mini", //获取10条数据
    platefull: "/mqtts/exchange/market/exchange-plate-full", //获取所有数据
    trade: "/market/latest-trade", //主动查询的实时成交信息
    symbolInfo: "/market/symbol-info", // 獲取交易對詳情
    coinInfo: "/market/coin-info",
    indexData: "/market/index_info",
  },

  // 帮助中心
  help: {
    helpCountApi: "/uc/ancillary/getSysHelpCountInfo", // 帮助中心按钮
    helpListApi: "/uc/ancillary/system/helpByType", // 帮助中心列表
  },

  common: {
    area: "/uc/support/country",
    feedback: "/uc/question-help/commit",
    questions: "/uc/question-help/questions",   //问题下拉
    informationCenter: "/uc/informationCenter/page-query",   //问题下拉
  },

  uc: {
    //会员中心接口
    register: "/uc/register",
    walletNew: "/uc/asset/userWalletInfo/",
    wallet: "/uc/asset/wallet/",
    captcha: "/uc/start/captcha",
    identification: "/uc/approve/certified/business/status", //商家认证
    apply: "/uc/approve/certified/business/apply", //商家认证申请
    announcement: "/uc/announcement/page", //公告列表
    paydividends: "/uc/bonus/user/page", //持币分红
    mylistrecord: "/uc/mine/detail/", //交易挖矿详情
    activitylist: "/uc/activity/page-query", // 活动列表
    memberactivity: "/uc/activity/getmemberrecords", // 用户参与活动列表
    attendActivity: "/uc/activity/attend", // 参与活动
    mypromotion: "/uc/promotion/mypromotion", // 我的推广佣金
    toppromotion: "/uc/promotion/toprank", // 推广合伙人排行
    getfreecard: "/uc/promotion/promotioncard/getfreecard", // 获取免费推广卡
    exchangecard: "/uc/promotion/promotioncard/exchangecard", // 兑换推广卡
    mycardlist: "/uc/promotion/promotioncard/mycard", // 兑换推广卡
    toppromotionmonth: "/uc/promotion/monthtoprank", // 推广合伙人排行
    toppromotionweek: "/uc/promotion/weektoprank", // 推广合伙人排行
    memberInfo: "/uc/member/my-info", // 获取用户信息
    mypromotionrecord: "/uc/promotion/record", //获取推广邀请人记录
    myInnovationOrderList: "/uc/activity/getmyorders", // 创新实验区参与订单列表
    myInnovationMinings: "/uc/miningorder/my-minings", // 获取我的矿机列表
    myInnovationLocked: "/uc/lockedorder/my-locked", // 获取我的矿机列表
    country: "/uc/support/country", // 国家前缀
  },

  second: {
    ws: "/second/second-ws",
    thumb: "/second/symbol-thumb",
    plate: "/second/exchange-plate", //主动查询的盘口信息
    platemini: "/second/exchange-plate-mini", //获取10条数据
    platefull: "/second/exchange-plate-full", //获取所有数据
    trade: "/second/latest-trade", //主动查询的实时成交信息
    symbolInfo: "/second/symbol-info", // 交易对信息
    coinInfo: "/second/coin/coin-info", // 合约交易对信息
  },

  activity: {
    activity: "/activity/page-query",
  },
  flashExchange:{
    coin: "/newbusiness/MemberWalletController/getXhInfo",
    exchange: "/exchange/order/flash-exchange",
    joinListByPage: "/newbusiness/NewCoinMemberCycleController/joinListByPage",
    cycleList: "/newbusiness/NewCoinMemberCycleController/cycle-list",
    addCoinList: "/newbusiness/NewCoinMemberCycleController/add",
    dayListByPage: "/newbusiness/NewCoinMemberCycleController/dayListByPage",
    membercycleList: "/newbusiness/NewCoinMemberCycleController/member-cycle",
    charityList: "/uc/charity/data-list",
    dictionary: "/uc/data-dictionary/",
    version: "/uc/ancillary/system/app/version/",
  },
};
