export default [
  // 注册登录忘记密码
  {
    path: "/login",
    component: (resolve) => require(["../pages/index/login"], resolve),
  },
  {
    path: "/register",
    component: (resolve) => require(["../pages/index/register"], resolve),
  },
  {
    path: "/findPwd",
    component: (resolve) => require(["../pages/index/findpwd"], resolve),
  },

  // {
  //   path: "/login/returnUrl/:returnUrl",
  //   component: (resolve) => require(["../pages/index/login"], resolve),
  // },
  // {
  //   path: "/reg",
  //   component: (resolve) => require(["../pages/index/register"], resolve),
  // },
  // 首页
  {
    path: "/",
    component: (resolve) => require(["../pages/index/index"], resolve),
  },
  {
    path: "/index",
    component: (resolve) => require(["../pages/index/index"], resolve),
  },
  // 公告
  {
    path: "/announcement/:id",
    component: (resolve) => require(["../pages/cms/NoticeItem"], resolve),
    name: "NoticeDetail",
  },
  // 买币
  {
    path: "/buyCoin",
    component: (resolve) => require(["../pages/buyCoin/index"], resolve),
  },
  // 闪兑
  {
    path: "/flashExchange",
    component: (resolve) => require(["../pages/flashExchange/index"], resolve),
  },
  {
    path: "/buyCoin/userCenter",
    component: (resolve) =>
      require(["../pages/buyCoin/pages/userCenter"], resolve),
  },
  {
    path: "/buyCoin/mySetOrders",
    component: (resolve) =>
      require(["../pages/buyCoin/pages/mySetOrders"], resolve),
  },
  {
    path: "/buyCoin/myOrders",
    component: (resolve) =>
      require(["../pages/buyCoin/pages/myOrders"], resolve),
  },
  // 行情 markets
  {
    path: "/markets",
    component: (resolve) => require(["../pages/markets/index"], resolve),
  },

  //合约交易
  {
    path: "/swap",
    component: (resolve) => require(["../pages/swap/SwapIndex"], resolve),
  },
  {
    path: "/transactionRules",
    component: (resolve) =>
      require(["../pages/swap/transactionRules"], resolve),
  },
  // Api管理
  {
    path: "/apiManage",
    component: (resolve) => require(["../pages/apiManage/index"], resolve),
  },
  {
    path: "/swap/:pair",
    component: (resolve) => require(["../pages/swap/SwapIndex"], resolve),
    name: "SwapPair",
  },

  // 现货交易
  {
    path: "/exchange",
    component: (resolve) => require(["../pages/exchange/index"], resolve),
  },
  {
    path: "/exchange/:pair",
    component: (resolve) => require(["../pages/exchange/index"], resolve),
    name: "exchangePair",
  },

  {
    path: "/financing",
    component: (resolve) => require(["../pages/financing/index"], resolve),
  },
  {
    path: "/financingInfo",
    name: "financingInfo",
    component: (resolve) =>
      require(["../pages/financing/component/financingInfo"], resolve),
  },
  {
    path: "/financingUccess",
    name: "financingUccess",
    component: (resolve) =>
      require(["../pages/financing/component/financingUccess"], resolve),
  },
  {
    path: "/interestNum",
    name: "interestNum",
    component: (resolve) =>
      require(["../pages/financing/component/interestNum"], resolve),
  },
  // 跟单
  {
    path: "/follow",
    component: (resolve) => require(["../pages/follow/index"], resolve),
  },
  {
    path: "/follow/leaderDetail",
    component: (resolve) => require(["../pages/follow/leaderDetail"], resolve),
  },
  {
    path: "/follow/follower",
    component: (resolve) => require(["../pages/follow/follower"], resolve),
  },
  // 情报中心
  {
    path: "/intelligence",
    component: (resolve) => require(["../pages/intelligence/index"], resolve),
  },
  // 个人资产
  {
    path: "/finance",
    component: (resolve) => require(["../pages/finance/index"], resolve),
    children: [
      // 资产总览
      {
        path: "all",
        component: (resolve) => require(["../pages/finance/all"], resolve),
      },
      // 资产账户
      {
        path: "property",
        component: (resolve) => require(["../pages/finance/property"], resolve),
      },
      // 现货账户
      {
        path: "spot",
        component: (resolve) => require(["../pages/finance/spot"], resolve),
      },
      // 合约账户
      {
        path: "futures",
        component: (resolve) => require(["../pages/finance/futures"], resolve),
      },
      // 跟单账户
      {
        path: "follow",
        component: (resolve) => require(["../pages/finance/follow"], resolve),
      },
    ],
  },
  // 充币
  {
    path: "/finance/deposit",
    component: (resolve) =>
      require(["../pages/finance/operate/deposit"], resolve),
  },
  // 充币审核
  {
    path: "/finance/verify",
    component: (resolve) =>
      require(["../pages/finance/operate/verify"], resolve),
  },
  // 提币
  {
    path: "/finance/withdraw",
    component: (resolve) =>
      require(["../pages/finance/operate/withdraw"], resolve),
  },
  // 客服
  {
    path: "/customer",
    component: (resolve) => require(["../pages/customer/index"], resolve),
  },
  // 地址簿
  {
    path: "/finance/address",
    component: (resolve) =>
      require(["../pages/finance/operate/address"], resolve),
  },
  // 订单
  {
    path: "/orders",
    component: (resolve) => require(["../pages/orders/index"], resolve),
    children: [
      // 现货订单-當前委托
      {
        path: "spot/open",
        component: (resolve) => require(["../pages/orders/spot/open"], resolve),
      },
      // 现货订单-歷史委托
      {
        path: "spot/close",
        component: (resolve) =>
          require(["../pages/orders/spot/close"], resolve),
      },
      // 现货订单-跟单记录
      // {
      //   path: "spot/documentary",
      //   component: (resolve) =>
      //     require(["../pages/orders/spot/documentary"], resolve),
      // },
      // // 现货订单-策略訂單
      // {
      //   path: "spot/twap",
      //   component: (resolve) => require(["../pages/orders/spot/twap"], resolve),
      // },

      // 合约订单-當前委托
      {
        path: "futures/open",
        component: (resolve) =>
          require(["../pages/orders/futures/open"], resolve),
      },
      // 合约订单-歷史委托
      {
        path: "futures/close",
        component: (resolve) =>
          require(["../pages/orders/futures/close"], resolve),
      },

      // 理财记录-收益记录
      {
        path: "financial/earnings",
        component: (resolve) =>
          require(["../pages/orders/financial/earnings"], resolve),
      },
      // 理财记录-历史申购
      {
        path: "financial/purchase",
        component: (resolve) =>
          require(["../pages/orders/financial/purchase"], resolve),
      },
      // 理财记录-历史赎回
      {
        path: "financial/redeem",
        component: (resolve) =>
          require(["../pages/orders/financial/redeem"], resolve),
      },
      // 合约订单-强平记录
      {
        path: "futures/match",
        component: (resolve) =>
          require(["../pages/orders/futures/match"], resolve),
      },
      // // 合约订单-資金流水
      // {
      //   path: "futures/transaction",
      //   component: (resolve) =>
      //     require(["../pages/orders/futures/transaction"], resolve),
      // },
      // // 合约订单-策略訂單
      // {
      //   path: "futures/twap",
      //   component: (resolve) =>
      //     require(["../pages/orders/futures/twap"], resolve),
      // },
      // 跟单历史-历史委托
      {
        path: "follow/close",
        component: (resolve) =>
          require(["../pages/orders/follow/close"], resolve),
      },
      // 跟单历史-强平记录
      {
        path: "follow/match",
        component: (resolve) =>
          require(["../pages/orders/follow/match"], resolve),
      },
    ],
  },
  // 财务记录
  {
    path: "/record",
    component: (resolve) => require(["../pages/records/index"], resolve),
    children: [
      // 全部记录
      {
        path: "all",
        component: (resolve) =>
          require(["../pages/records/components/all"], resolve),
      },
      // 充币记录
      {
        path: "deposit",
        component: (resolve) =>
          require(["../pages/records/components/deposit"], resolve),
      },
      // 提币记录
      {
        path: "withdraw",
        component: (resolve) =>
          require(["../pages/records/components/withdraw"], resolve),
      },
      // 划转记录
      {
        path: "transfer",
        component: (resolve) =>
          require(["../pages/records/components/transfer"], resolve),
      },
      // 现货记录
      {
        path: "spot",
        component: (resolve) =>
          require(["../pages/records/components/spot"], resolve),
      },
      // 理财记录
      {
        path: "financial",
        component: (resolve) =>
          require(["../pages/records/components/financial"], resolve),
      },
      // 佣金记录
      {
        path: "commission",
        component: (resolve) =>
          require(["../pages/records/components/commission"], resolve),
      },
      // 手续费记录
      {
        path: "premium",
        component: (resolve) =>
          require(["../pages/records/components/premium"], resolve),
      },
      // 其他记录
      {
        path: "other",
        component: (resolve) =>
          require(["../pages/records/components/other"], resolve),
      },
      {
        path: "subscribe",
        component: (resolve) =>
          require(["../pages/records/components/subscribe"], resolve),
      },
      // 闪兑
      {
        path: "flash",
        component: (resolve) =>
          require(["../pages/records/components/flash"], resolve),
      },
    ],
  },
  // 账户中心
  {
    path: "/user",
    component: (resolve) => require(["../pages/user/index"], resolve),
  },
  // 管理设备
  {
    path: "/equipment",
    component: (resolve) =>
      require(["../pages/user/user-center/equipment"], resolve),
  },
  // 身份认证
  {
    path: "/user-auth",
    component: (resolve) => require(["../pages/user/user-auth"], resolve),
  },
  // 用户中心
  {
    path: "/user-center",
    component: (resolve) =>
      require(["../pages/user/user-center/index"], resolve),
    children: [
      // 卡券中心
      {
        path: "bonus-card",
        component: (resolve) =>
          require(["../pages/user/user-center/bonus-card"], resolve),
      },
    ],
  },

  // 暂时不用的
  // 活動專區 理財活動
  {
    path: "/financial",
    component: (resolve) => require(["../pages/financial/index"], resolve),
  },
  // 活動專區 福利中心
  {
    path: "/rewards",
    component: (resolve) => require(["../pages/rewards/index"], resolve),
  },
  {
    path: "/feedback",
    component: (resolve) => require(["../pages/cms/feedback"], resolve),
  },
  // 站内信
  {
    path: "/noticeAll",
    component: (resolve) => require(["../pages/cms/noticeAll"], resolve),
  },
  {
    path: "/noticeAll/:id",
    component: (resolve) => require(["../pages/cms/noticeAll"], resolve),
    name: "noticeAll",
  },
  // 旧的
  {
    path: "/help",
    component: (resolve) => require(["../pages/cms/Help"], resolve),
  },
  {
    path: "/helplist",
    component: (resolve) => require(["../pages/cms/HelpList"], resolve),
  },
  {
    path: "/helpdetail",
    component: (resolve) => require(["../pages/cms/HelpDetail"], resolve),
  },

  // 新闻
  {
    path: "/news",
    component: (resolve) => require(["../pages/news/News"], resolve),
  },
  // 通知
  {
    path: "/notice",
    component: (resolve) => require(["../pages/cms/Notice"], resolve),
  },
];
