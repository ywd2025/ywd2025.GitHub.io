import { number } from "echarts";
import dayjs from "dayjs";

const filters = {
  methods: {
    /**
     * @description: 计算合约保证金: 张数 * 面值 * 币价/ 杠杆倍数
     * @param {number} volume 张数
     * @param {number} shareNumber 面值
     * @param {number} leverage 杠杆倍数
     * @param {number} coinMoney 币价
     * @return {*}
     * @author: toString
     */
    margin(volume, shareNumber, leverage, coinMoney) {
      const margin = ((volume * shareNumber * coinMoney) / leverage).toFixed(5);
      return parseFloat(margin);
    },

    /**
     * @description: 计算平仓手续费: 平仓手续费率 * 币价 * 张数 * 面值
     * @param {number} closeFee 平仓手续费率
     * @param {number} coinMoney 币价
     * @param {number} volume 张数
     * @param {number} shareNumber 面值
     * @return {*}
     */
    closingFees(closeFee, coinMoney, shareNumber, volume) {
      const temp = (closeFee * coinMoney * shareNumber * volume).toFixed(5);
      return parseFloat(temp);
    },

    /**
     * @description: 计算开多收益(未实现盈亏) = (当前价格 / 成交均价 -1) * 合约面值 * 张数 *开仓均价
     * @param {number}  price 当前价格
     * @param {number}  traderPrice 成交均价
     * @param {number}  shareNumber 合约面值
     * @param {number}  volume 张数
     * @return {*}
     */
    buyIncome(price, traderPrice, shareNumber, volume) {
      const buyIncomeText = (
        (price / traderPrice - 1) *
        shareNumber *
        volume *
        traderPrice
      ).toFixed(4);
      return parseFloat(buyIncomeText);
    },

    /**
     * @description: 计算开空收益(未实现盈亏) = (1 - 当前价格 / 成交均价) * 合约面值 * 张数  *开仓均价
     * @param {number}  price 当前价格
     * @param {number}  traderPrice 成交均价
     * @param {number}  shareNumber 合约面值
     * @param {number}  volume 张数
     * @return {*}
     * @author: toString
     */
    sellIncome(price, traderPrice, shareNumber, volume) {
      const sellIncomeText = (
        (1 - price / traderPrice) *
        shareNumber *
        volume *
        traderPrice
      ).toFixed(4);
      return parseFloat(sellIncomeText);
    },

    /**
     * @description: 计算合约收益率: 收益 / 保证金 * 100
     * @param {number} income 收益
     * @param {number} principalAmount 保证金
     * @return {*}
     * @author: toString
     */
    swapYield(income, principalAmount) {
      const swapYieldText = ((income / principalAmount) * 100).toFixed(4);
      return parseFloat(swapYieldText);
    },

    /**
     * @description: 计算开多强平价格: 开仓价x(1+(合约最低保证金率x保证金+平仓手续费-保证金)/(面值x张数x开仓价))
     * @param {number} open 开仓价
     * @param {number} maintenanceMarginRate 合约最低保证金率
     * @param {number} margin 保证金
     * @param {number} fee 平仓手续费
     * @param {number} shareNumber 面值
     * @param {number} volume 张数
     * @return {*}
     * @author: toString
     */
    buyForcePrice(
      open,
      maintenanceMarginRate,
      margin,
      fee,
      shareNumber,
      volume
    ) {
      const buyForcePriceText = (
        open *
        (1 +
          (maintenanceMarginRate * margin + fee - margin) /
            (shareNumber * volume * open))
      ).toFixed(5);
      return parseFloat(buyForcePriceText);
    },

    /**
     * @description: 计算开空强平价格: 开仓价x(1-(合约最低保证金率x保证金+平仓手续费-保证金)/(面值x张数x开仓价))
     * @param {number} open 开仓价
     * @param {number} maintenanceMarginRate 合约最低保证金率
     * @param {number} margin 保证金
     * @param {number} fee 平仓手续费
     * @param {number} shareNumber 面值x张数
     * @param {number} volume 面值x张数
     * @return {*}
     * @author: toString
     */
    sellForcePrice(
      open,
      maintenanceMarginRate,
      margin,
      fee,
      shareNumber,
      volume
    ) {
      const sellForcePriceText = (
        open *
        (1 -
          (maintenanceMarginRate * margin + fee - margin) /
            (shareNumber * volume * open))
      ).toFixed(5);
      return parseFloat(sellForcePriceText);
    },
    /**
     * @description: 计算全仓开多强平价格:  多全仓预估强平价格=开仓价格*（1+[合约最低保证金率*(开仓保证金+合约余额+所有仓位未实现盈亏)+平仓手续费-(开仓保证金+合约余额+所有仓位未实现盈亏)]/（合约面值 *张数*开仓价格）)
     * @param {number} open 开仓价格
     * @param {number} maintenanceMarginRate 合约最低保证金率
     * @param {number} margin 开仓保证金
     * @param {number} balance 合约余额
     * @param {number} allProfitLoss 所有仓位未实现盈亏(废弃了)
     * @param {number} fee 平仓手续费
     * @param {number} shareNumber 面值x张数
     * @param {number} volume 面值x张数
     * @author: toString
     */
    buyAllForcePrice(
      open,
      maintenanceMarginRate,
      margin,
      balance,   
      // allProfitLoss,
      fee,
      shareNumber,
      volume
    ) {
      const buyForcePriceText = (
        open *
        (1 +
          (maintenanceMarginRate * (margin + balance) +
            fee -
            (margin + balance)) /
            (shareNumber * volume * open))
      ).toFixed(5);
      return parseFloat(buyForcePriceText);
    },
    /**
     * @description: 计算全仓开空强平价格: 开仓价格*（1-[合约最低保证金率*(开仓保证金+合约余额+所有仓位未实现盈亏)+平仓手续费-(开仓保证金+合约余额+所有仓位未实现盈亏)]/（合约面值 *张数*开仓价格）)
     * @param {number} open 开仓价格
     * @param {number} maintenanceMarginRate 合约最低保证金率
     * @param {number} margin 开仓保证金
     * @param {number} balance 合约余额
     * @param {number} allProfitLoss 所有仓位未实现盈亏(废弃了)
     * @param {number} fee 平仓手续费
     * @param {number} shareNumber 面值x张数
     * @param {number} volume 面值x张数
     * @return {*}
     * @author: toString
     */
    sellAllForcePrice(
      open,
      maintenanceMarginRate,
      margin,
      balance,
      // allProfitLoss,
      fee,
      shareNumber,
      volume
    ) {
      const sellForcePriceText = (
        open *
        (1 -
          (maintenanceMarginRate * (margin + balance) +
            fee -
            (margin + balance)) /
            (shareNumber * volume * open))
      ).toFixed(5);
      return parseFloat(sellForcePriceText);
    },
    /**
     * @description: 计算可开张数：（杠杆*可用资产余额）/面值*当前币价*0.95（向下取整）
     * @param {number} leverage 杠杆
     * @param {number} usdtBalance 余额
     * @param {number} shareNumber 面值
     * @param {number} moneyCoin 当前币价
     * @param {number} proportion 0.95
     * @return {*}
     * @author: toString
     */
    openSheetNumber(leverage, usdtBalance, shareNumber, moneyCoin, proportion) {
      const temp =
        ((leverage * usdtBalance) / (shareNumber * moneyCoin)) * proportion;
      return parseInt(temp);
    },
    /**
     * @description: 合约最低保证金率
     * @param {Array} item 获取不同杠杆下的资金费率
     * @param {number} leverage 当前杠杆
     * @return {*}
     * @author: toString
     */
    getMaintenanceMarginRate(items, leverage) {
      if (items) {
        const foundItem = items.find((item) => leverage <= item.ccrLeverge);
        if (foundItem) {
          return foundItem.ccrMarginRate;
        } else {
          return 0.05;
        }
      } else {
        return 0.05;
      }
    },
    time_filter(num, form = "YYYY-MM-DD HH:mm:ss") {
      if (num) {
        if (num.toString().length == 10) {
          num = num * 1000;
        }
        return dayjs(num).format(form);
      }
      return "—";
    },
    fixed_filter(item) {
      if (Number(item) > 10) {
        return Number(item).toFixed(2);
      } else if (Number(item) < 10 && Number(item) > 0) {
        return Number(item).toFixed(4);
      } else if (Number(item) == 0) {
        return 0;
      } else if (Number(item) < 0 && Number(item) > -10) {
        return Number(item).toFixed(4);
      } else if (Number(item) < -10) {
        return Number(item).toFixed(2);
      }
    },
    getMaintenanceMarginRateall(items, leverage, id) {
      if (items) {
        var foundItem = items.find(
          (item) => id == item.ccrContractId && leverage <= item.ccrLeverge
        );
        if (foundItem) {
          return foundItem.ccrMarginRate;
        } else {
          return 0.05;
        }
      } else {
        return 0.05;
      }
    },
    // 处理精度
    getSymboyAccuracy(items, coin) {
      var SymboyAccuracy = items.find((item) => item.symbol == coin);
      return SymboyAccuracy.scale;
    },
    // 算小数点后几位
    countDecimalPlaces(number) {
      const str = number.toString();
      const decimalIndex = str.indexOf(".");
      if (decimalIndex === -1) {
        return 0; // 没有小数点，表示小数点后位数为0
      }
      return str.length - decimalIndex - 1;
    },
    // k   b单位展示
    getNewUnit(item) {
      if (Number(item) >= 1000000000) {
        return (Number(item) / 1000000000).toFixed(4) + "B";
      } else if (Number(item) >= 1000000) {
        return (Number(item) / 1000000).toFixed(4) + "M";
      } else if (Number(item) >= 1000) {
        return (Number(item) / 1000).toFixed(4) + "K";
      } else {
        return item;
      }
    },
    // 可开计算公式
    getkk(swapUnit, money, shareNumber, price, unitSymbol, leverageAdjustVal,proportion) {
      if (swapUnit === "USDT") {
        return (money * leverageAdjustVal * proportion ).toFixed(5);
      } else if (swapUnit === unitSymbol) {
        return ((money * leverageAdjustVal * proportion) / price).toFixed(5);
      } else {
        return Math.floor((money * leverageAdjustVal * proportion) / (shareNumber * price));
      }
    },
    // 精度的取舍
    getFixed(item){
      if(Number(item) > 10000){
        return Number(item).toFixed(1);
      }else if(Number(item) > 100){
        return Number(item).toFixed(2);
      }else if(Number(item) > 10){
        return Number(item).toFixed(3);
      }else if(Number(item) > 1){
        return Number(item).toFixed(4);
      }else{
        return Number(item).toFixed(5);
      }
    }
  },
};
export default filters;
