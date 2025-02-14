<template>
  <!-- 合約交易 -->
  <div class="container swap" :class="skin">
    <div class="main">
      <div style="display: flex; width: 100%">
        <div class="all_content">
          <div class="Kline_part">
            <div class="top">
              <div class="Kline_content">
                <div class="box_kline">
                  <keep-alive>
                    <symbolList></symbolList>
                  </keep-alive>
                  <keep-alive>
                    <klineHeader
                      :currentCoin="currentCoin"
                      :nowsymbol="currentCoin.symbol"
                      :pageInfo="pageInfo"
                      :coinType="basecion"
                      :currentCoinIsFavor="currentCoinIsFavor"
                      :lineCurrentCoin="dataIndex"
                      @changeBaseCion="changeBaseCion"
                      @currentCoinFavorChange="currentCoinFavorChange"
                      @changeFavor="changeFavor"
                      @gohref="gohref"
                    ></klineHeader>
                  </keep-alive>
                  <div class="kline_tabs">
                    <div class="kline_tabs_left">
                      <div
                        @click="changeKlineTabs(0)"
                        :class="KlineTabs == 0 ? 'tabActive' : 'tab'"
                      >
                        {{ $t("newUi.text83") }}
                      </div>
                      <div
                        @click="changeKlineTabs(1)"
                        :class="KlineTabs == 1 ? 'tabActive' : 'tab'"
                      >
                        {{ $t("newUi.text84") }}
                      </div>
                    </div>
                    <div class="handler">
                      <span
                        @click="changeImgTable('k')"
                        :class="{ active: currentImgTable === 'k' }"
                        >{{ $t("swap.kline") }}</span
                      >
                      <span
                        @click="changeImgTable('s')"
                        :class="{ active: currentImgTable === 's' }"
                        >{{ $t("swap.depth") }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="imgtable" style="height: 504px">
                  <div
                    id="kline_container"
                    :class="{ hidden: currentImgTable === 's' }"
                  ></div>
                  <img
                    src="../../assets/images/kline_logo.svg"
                    alt=""
                    class="kline_logo"
                  />
                  <DepthGraph
                    :class="{ hidden: currentImgTable === 'k' }"
                    ref="depthGraph"
                  ></DepthGraph>
                </div>
              </div>
            </div>
            <div class="tabs-container">
              <div class="center plate-wrap m_l5" style="position: relative">
                <div class="plateAllTitle">
                  {{ $t("newUi.text85") }}
                </div>
                <keep-alive>
                  <plateAll
                    @changePlate="changePlate"
                    :selectedPlate="selectedPlate"
                    :CNYRate="CNYRate"
                    :dataList0="plate.askRows"
                    :dataList1="plate.bidRows"
                    :baseTitle="currentCoin"
                    :bidTotle="plate.bidTotle"
                    :askTotle="plate.askTotle"
                    :select_type="select_type"
                  ></plateAll>
                </keep-alive>
                <div class="plateAllTitle m_t5">
                  {{ $t("swap.latestdeal") }}
                </div>
                <keep-alive>
                  <tradeAll
                    :dataList="trade.rows"
                    :baseTitle="currentCoin"
                  ></tradeAll>
                </keep-alive>
              </div>
            </div>
          </div>
          <!-- 持仓列表 -->
          <keep-alive>
            <tableAll
              :positionData="positionData"
              :followPositionData="followPositionData"
              :currentEntrustOrderList="currentEntrustOrderList"
              :planDelegationList="planDelegationList"
              :openMerge="openMerge"
              :unitSymbol="unitSymbol"
              :swapUnit="swapUnit"
              :contractCoinInfo="contractCoinInfo"
              :parrentBuySell0="parrentBuySell0"
              :parrentBuySell="parrentBuySell"
              :allLists="allLists"
              :pageInfo="pageInfo"
              :openType1="openType1"
              :openType="openType"
              :currentCoin="currentCoin"
              :joinPositionData="joinPositionData"
            />
          </keep-alive>
        </div>
        <!-- 开仓 -->
        <div class="center" style="background-color: #f5f5f5; margin-top: 2px;">
          <div class="table open-close">
            <!-- 開倉 -->
            <div class="open">
              <div class="btn_two">
                <div
                  class="btn_two_price"
                  :class="isLogin ? 'cp' : 'cn'"
                  @click="showMarginModeModal()"
                >
                  <span v-if="openType === '1'">{{
                    $t("swap.marginMode1")
                  }}</span>
                  <span v-if="openType === '0'">{{
                    $t("swap.marginMode2")
                  }}</span>
                  <span>·</span>
                  <span v-if="openType1 === '1' && openMerge == 1">{{
                    $t("dolphin.text185")
                  }}</span>
                  <span v-if="openType1 === '0' && openMerge == 1">{{
                    $t("dolphin.text184")
                  }}</span>
                </div>
                <div
                  class="btn_two_price"
                  :class="isLogin ? 'cp' : 'cn'"
                  @click="showLeverageModal()"
                >
                  {{ leverageList[leverageNumber] }}X
                </div>
                <div @click="cancelFollow" style="color: #03C59E">
                  {{ tradeType == 1 ? $t("carouselItem.text51") : "" }}
                </div>
              </div>
              <div class="tabs_group">
                <div
                  class="tabs_group_btn"
                  :class="openTabVal == 0 ? 'tabActive' : ''"
                  @click="changeOpenTaba('0')"
                >
                  {{ $t("swap.open") }}
                </div>
                <div
                  class="tabs_group_btn"
                  :class="openTabVal == 1 ? 'tabActive' : ''"
                  @click="changeOpenTaba('1')"
                >
                  {{ $t("swap.close") }}
                </div>
              </div>
              <div class="entrustOrderTabs">
                <div
                  :class="
                    entrustOrderType == 'MARKET_PRICE' ? 'tabActive' : 'tab'
                  "
                  @click="changeEntrustOrderType('MARKET_PRICE')"
                >
                  {{ $t("swap.market_price") }}
                </div>
                <div
                  :class="
                    entrustOrderType == 'LIMIT_PRICE' ? 'tabActive' : 'tab'
                  "
                  @click="changeEntrustOrderType('LIMIT_PRICE')"
                >
                  {{ $t("swap.limited_price") }}
                </div>
                <div
                  :class="
                    entrustOrderType == 'SPOT_LIMIT' ? 'tabActive' : 'tab'
                  "
                  @click="changeEntrustOrderType('SPOT_LIMIT')"
                >
                  {{ $t("carouselItem.text17") }}
                </div>
              </div>
              <Form>
                <!-- 计划委托选择市价还是限价 -->
                <div class="getUsdt_list">
                  <div class="getUsdt_list_left">
                    <div class="left_title">
                      {{ $t("carouselItem.text18") }}:
                    </div>
                    <div class="left_title">
                      {{ pageInfo.usdtBalance ? pageInfo.usdtBalance : 0 }}
                    </div>
                    <div>
                      <router-link to="/finance/all">
                        <span class="routlink">{{
                          $t("swap.zijinhuazhuan")
                        }}</span>
                      </router-link>
                    </div>
                  </div>
                  <Tooltip
                    :content="$t('carouselItem.text235')"
                    style="cursor: pointer"
                  >
                    <switchAll
                      :contractCoinInfo="this.contractCoinInfo"
                      :myBalance="pageInfo.usdtBalance"
                    ></switchAll>
                  </Tooltip>
                </div>
                <!-- <FormItem
                  style="margin-bottom: 10px"
                  :label="$t('dolphin.text106')"
                >
                  <Select
                    style="width: 100%;border: 1px solid #DCDEE2;border-radius: 5px;height: 36px;z-index: 9;"
                    v-model="datasource"
                    @on-change="handleDatasource"
                  >
                    <Option value="-1">{{ $t("dolphin.text119") }}</Option>
                    <Option value="0">{{ $t("dolphin.text88") }}</Option>
                    <Option value="1">{{ $t("dolphin.text89") }}</Option>
                  </Select>
                </FormItem> -->
                <div
                  style="margin-bottom: 10px"
                  v-if="entrustOrderType == 'SPOT_LIMIT'"
                >
                  <div class="limit_price_title">价格</div>
                  <div class="limit_price_style">
                    <div class="limit_price_left">
                      <input
                        class="limit_price_input"
                        v-model="form.entrustPrice"
                        :disabled="spotPriceType == 'MARKET_SPOT_LIMIT'"
                        @on-keyup="
                          form.entrustPrice = form.entrustPrice.replace(
                            /[^\d^\.]+/g,
                            ''
                          )
                        "
                        :placeholder="
                          spotPriceType == 'MARKET_SPOT_LIMIT'
                            ? $t('carouselItem.text20')
                            : ''
                        "
                      />
                    </div>
                    <div class="good_num">
                      <Dropdown @on-click="handleSpotPrice" trigger="click">
                        {{
                          spotPriceType == "LIMIT_SPOT_LIMIT"
                            ? $t("carouselItem.text19")
                            : $t("carouselItem.text20")
                        }}
                        <Icon type="ios-arrow-down"></Icon>
                        <DropdownMenu slot="list">
                          <DropdownItem name="LIMIT_SPOT_LIMIT">{{
                            $t("carouselItem.text19")
                          }}</DropdownItem>
                          <DropdownItem name="MARKET_SPOT_LIMIT">{{
                            $t("carouselItem.text20")
                          }}</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
                <div
                  style="margin-bottom: 10px"
                  v-if="entrustOrderType == 'LIMIT_PRICE'"
                >
                  <div class="limit_price_title">
                    {{ $t("dolphin.text146") }}
                  </div>
                  <div class="limit_price_style">
                    <div class="limit_price_left">
                      <input
                        class="limit_price_input"
                        v-model="form.entrustPrice"
                        @on-keyup="
                          form.entrustPrice = form.entrustPrice.replace(
                            /[^\d^\.]+/g,
                            ''
                          )
                        "
                      />
                    </div>
                    <div class="good_num" @click="handNewPrice">
                      {{ $t("newUi.text86") }}
                    </div>
                  </div>
                </div>
                <!-- 触发价 -->
                <FormItem
                  style="margin-bottom: 10px"
                  :label="$t('swap.triggleprice')"
                  v-if="entrustOrderType == 'SPOT_LIMIT'"
                >
                  <span
                    style="
                      position: absolute;
                      top: 22px;
                      right: 10px;
                      color: #7c7f82;
                    "
                    >USDT</span
                  >
                  <input
                    v-model="form.triggerPrice"
                    class="input_volume"
                    type="text"
                  />
                </FormItem>
                <!-- 开仓数量 -->
                <FormItem
                  style="margin-bottom: 12px"
                  :label="$t('buyCoin.universal.number')"
                >
                  <Poptip
                    trigger="focus"
                    :content="
                      $t('dolphin.text144') +
                        `${
                          isLogin
                            ? pageInfos.minShare
                              ? swapUnit === 'USDT'
                                ? (
                                    pageInfos.minShare *
                                    currentCoin.shareNumber *
                                    currentCoin.price
                                  ).toFixed(4)
                                : swapUnit === unitSymbol
                                ? (
                                    pageInfos.minShare * currentCoin.shareNumber
                                  ).toFixed(4)
                                : pageInfos.minShare
                              : swapUnit === 'USDT'
                              ? (
                                  currentCoin.shareNumber * currentCoin.price
                                ).toFixed(4)
                              : swapUnit === unitSymbol
                              ? currentCoin.shareNumber.toFixed(4)
                              : 1
                            : 0
                        }` +
                        swapUnit
                    "
                    placement="top-start"
                  >
                    <span class="swapUnitstyle">
                      <Dropdown @on-click="handleSwapUnit" v-if="!swapUnitType">
                        {{ swapUnit }}
                        <Icon type="ios-arrow-down"></Icon>
                        <DropdownMenu slot="list">
                          <DropdownItem :name="$t('swap.shareNumber')">{{
                            $t("swap.shareNumber")
                          }}</DropdownItem>
                          <DropdownItem name="USDT">USDT</DropdownItem>
                          <DropdownItem :name="unitSymbol">{{
                            this.unitSymbol
                          }}</DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                      <span v-else>USDT</span>
                    </span>
                    <!--  :placeholder="" -->
                    <input
                      v-model="form.volume"
                      class="input_volume"
                      :placeholder="sliderValue"
                      type="number"
                    />
                  </Poptip>
                </FormItem>
                <div class="slider-wrap">
                  <!--  :disabled="sliderBuyDisabled"  v-model="sliderBuyLimitPercent" -->
                  <Slider
                    class="silder-buy"
                    :step="1"
                    :marks="marks"
                    show-tip="never"
                    @on-input="changeValue"
                  ></Slider>
                </div>
                <div class="silder_openNumber">
                  <div>
                    <span>{{ $t("new.orders.buy") }}：</span>
                    <span
                      >{{
                        (
                          (isLogin
                            ? getkk(
                                swapUnit,
                                pageInfo.usdtBalance,
                                currentCoin.shareNumber,
                                currentCoin.price,
                                unitSymbol,
                                leverageAdjustVal,
                                pageInfo.buyProportion
                              ) <
                              getkk(
                                swapUnit,
                                pageInfos.maxShare,
                                currentCoin.shareNumber,
                                currentCoin.price,
                                unitSymbol,
                                leverageAdjustVal,
                                pageInfo.buyProportion
                              )
                              ? getkk(
                                  swapUnit,
                                  pageInfo.usdtBalance,
                                  currentCoin.shareNumber,
                                  currentCoin.price,
                                  unitSymbol,
                                  leverageAdjustVal,
                                  pageInfo.buyProportion
                                )
                              : getkk(
                                  swapUnit,
                                  pageInfos.maxShare,
                                  currentCoin.shareNumber,
                                  currentCoin.price,
                                  unitSymbol,
                                  leverageAdjustVal,
                                  pageInfo.buyProportion
                                )
                            : 0.0) * sliderValueNum
                        ).toFixed(2)
                      }}{{ " " + swapUnit }}</span
                    >
                  </div>
                  <div>
                    <span>{{ $t("new.orders.sell") }}：</span>
                    <span
                      >{{
                        (
                          (isLogin
                            ? getkk(
                                swapUnit,
                                pageInfo.usdtBalance,
                                currentCoin.shareNumber,
                                currentCoin.price,
                                unitSymbol,
                                leverageAdjustVal,
                                pageInfo.sellProportion
                              ) <
                              getkk(
                                swapUnit,
                                pageInfos.maxShare,
                                currentCoin.shareNumber,
                                currentCoin.price,
                                unitSymbol,
                                leverageAdjustVal,
                                pageInfo.sellProportion
                              )
                              ? getkk(
                                  swapUnit,
                                  pageInfo.usdtBalance,
                                  currentCoin.shareNumber,
                                  currentCoin.price,
                                  unitSymbol,
                                  leverageAdjustVal,
                                  pageInfo.sellProportion
                                )
                              : getkk(
                                  swapUnit,
                                  pageInfos.maxShare,
                                  currentCoin.shareNumber,
                                  currentCoin.price,
                                  unitSymbol,
                                  leverageAdjustVal,
                                  pageInfo.sellProportion
                                )
                            : 0.0) * sliderValueNum
                        ).toFixed(2)
                      }}{{ " " + swapUnit }}</span
                    >
                  </div>
                </div>
                <FormItem
                  style="margin-bottom: 10px;font-size: 11px;color: rgba(0,0,0,0.87);"
                >
                  <Checkbox v-model="triggerPriceType"
                    >{{ $t("new.swap.earning") }}/{{
                      $t("new.swap.loss")
                    }}</Checkbox
                  >
                </FormItem>
                <FormItem
                  :label="$t('new.swap.earning')"
                  style="margin-bottom: 10px"
                  v-show="triggerPriceType"
                >
                  <input
                    class="input_volume"
                    v-model="form.triggerPriceWin"
                    type="tel"
                    @on-keyup="
                      form.triggerPriceWin = form.triggerPriceWin.replace(
                        /[^\d^\.]+/g,
                        ''
                      )
                    "
                  />
                  <label class="triggerPriceStyle">{{
                    currentCoin.base
                  }}</label>
                </FormItem>
                <FormItem
                  :label="$t('new.swap.loss')"
                  style="margin-bottom: 10px"
                  v-show="triggerPriceType"
                >
                  <input
                    class="input_volume"
                    v-model="form.triggerPriceLose"
                    type="tel"
                    @on-keyup="
                      form.triggerPriceLose = form.triggerPriceLose.replace(
                        /[^\d^\.]+/g,
                        ''
                      )
                    "
                  />
                  <label class="triggerPriceStyle">{{
                    currentCoin.base
                  }}</label>
                </FormItem>
              </Form>
              <div class="operate" v-if="isLogin">
                <Button
                  type="primary"
                  class="open_btn"
                  @click="handleBuyAndSell('BUY')"
                  >{{ $t("newUi.text75") }}</Button
                >
                <Button
                  type="error"
                  class="open_btn"
                  @click="handleBuyAndSell('SELL')"
                  >{{ $t("newUi.text76") }}</Button
                >
              </div>
              <div class="row_list" v-if="isLogin">
                <div class="row_one">
                  <div class="open_number">
                    <Poptip
                      trigger="hover"
                      width="300"
                      :word-wrap="true"
                      :content="$t('newUi.text87')"
                      placement="top-start"
                    >
                      <span style="cursor: help;">{{
                        $t("carouselItem.text224")
                      }}</span>
                    </Poptip>
                    <span
                      v-if="
                        !isNaN(getBuyForcePrice()) &&
                          getBuyForcePrice() > 0 &&
                          getSellForcePrice() != 'Infinity'
                      "
                      >{{ getBuyForcePrice() }} USDT</span
                    >
                    <span v-else>-- USDT</span>
                  </div>
                  <div class="open_number">
                    <Poptip
                      trigger="hover"
                      width="300"
                      :word-wrap="true"
                      :content="$t('newUi.text87')"
                      placement="left-start"
                    >
                      <span style="cursor: help;">{{
                        $t("carouselItem.text224")
                      }}</span>
                    </Poptip>
                    <span
                      v-if="
                        !isNaN(getSellForcePrice()) &&
                          getSellForcePrice() > 0 &&
                          getSellForcePrice() != 'Infinity'
                      "
                      >{{ getSellForcePrice() }} USDT</span
                    >
                    <span v-else>-- USDT</span>
                  </div>
                </div>
                <div class="row_one">
                  <div class="open_number">
                    <Poptip
                      trigger="hover"
                      width="300"
                      :word-wrap="true"
                      :content="$t('newUi.text88')"
                      placement="top-start"
                    >
                      <span style="cursor: help;">{{
                        $t("follow.universal.earnestMoney")
                      }}</span>
                    </Poptip>
                    <span
                      v-if="
                        !isNaN(buyMargin()) &&
                          buyMargin() != 'Infinity' &&
                          buyMargin()
                      "
                      >{{ buyMargin() }} USDT</span
                    >
                    <span v-else>-- USDT </span>
                  </div>
                  <div class="open_number">
                    <Poptip
                      trigger="hover"
                      width="300"
                      :word-wrap="true"
                      :content="$t('newUi.text88')"
                      placement="left-start"
                    >
                      <span style="cursor: help;">{{
                        $t("follow.universal.earnestMoney")
                      }}</span>
                    </Poptip>
                    <span
                      v-if="
                        !isNaN(sellMargin()) &&
                          sellMargin() != 'Infinity' &&
                          sellMargin()
                      "
                      >{{ sellMargin() }} USDT
                    </span>
                    <span v-else>-- USDT </span>
                  </div>
                </div>
                <div class="row_one">
                  <!-- 可开 可开多 -->
                  <div class="open_number" style="cursor: default;">
                    <span>{{ $t("carouselItem.text225") }}</span>
                    <span>
                      {{
                        isLogin
                          ? getkk(
                              swapUnit,
                              pageInfo.usdtBalance,
                              currentCoin.shareNumber,
                              currentCoin.price,
                              unitSymbol,
                              leverageAdjustVal,
                              pageInfo.buyProportion
                            )
                          : 0
                      }}{{ swapUnit }}
                    </span>
                  </div>
                  <!-- 可开 可开空 -->
                  <div class="open_number" style="cursor: default;">
                    <span>{{ $t("carouselItem.text225") }}</span>
                    <span>
                      {{
                        isLogin
                          ? getkk(
                              swapUnit,
                              pageInfo.usdtBalance,
                              currentCoin.shareNumber,
                              currentCoin.price,
                              unitSymbol,
                              leverageAdjustVal,
                              pageInfo.sellProportion
                            )
                          : 0
                      }}
                      {{ swapUnit }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="login_register" v-show="!isLogin">
                <div class="login_btn" @click="goPage('login')">
                  {{ $t("common.login") }}
                </div>
                <div class="register_btn" @click="goPage('register')">
                  {{ $t("carouselItem.text23") }}
                </div>
              </div>
            </div>
          </div>
          <div class="open_bottom">
            <div v-show="isLogin">
              <div class="open_bottom_title">
                {{ $t("buyCoin.pages.userCenter.PayType.txt7") }}
              </div>
              <div class="open_bottom_center">
                <div class="bottom_center_title">
                  {{ $t("newUi.text89") }}
                </div>
                <div class="bottom_center_row">
                  <Poptip
                    trigger="hover"
                    width="300"
                    :word-wrap="true"
                    :content="$t('newUi.text90')"
                    placement="top-start"
                  >
                    <div style="cursor: help;">{{ $t("newUi.text89") }}</div>
                  </Poptip>
                  <div>
                    {{
                      (
                        (minBond / (pageInfo.usdtBalance + profitAndLoss)) *
                        100
                      ).toFixed(2)
                    }}%
                  </div>
                </div>
                <div class="bottom_center_row">
                  <Poptip
                    trigger="hover"
                    maxWidth="300"
                    :word-wrap="true"
                    :content="$t('newUi.text92')"
                    placement="top-start"
                  >
                    <div style="cursor: help;">{{ $t("newUi.text91") }}</div>
                  </Poptip>
                  <div>{{ minBond.toFixed(4) }}</div>
                </div>
                <div class="bottom_center_row">
                  <Poptip
                    trigger="hover"
                    width="300"
                    :word-wrap="true"
                    :content="$t('newUi.text93')"
                    placement="top-start"
                  >
                    <div style="cursor: help;">{{ $t("newUi.text94") }}</div>
                  </Poptip>
                  <div>
                    {{
                      pageInfo.usdtBalance + profitAndLoss
                        ? (pageInfo.usdtBalance + profitAndLoss).toFixed(4)
                        : "--"
                    }}
                  </div>
                </div>
              </div>
              <div class="open_bottom_title">
                USDT
              </div>
              <div class="open_bottom_center">
                <div class="bottom_center_row">
                  <div>{{ $t("new.finance.walletBalance") }}</div>
                  <div>
                    {{
                      pageInfo.usdtBalance
                        ? pageInfo.usdtBalance.toFixed(4)
                        : "--"
                    }}USDT
                  </div>
                </div>
                <div class="bottom_center_row">
                  <div>{{ $t("swap.profitandloss") }}</div>
                  <div>
                    {{ profitAndLoss ? profitAndLoss.toFixed(4) : "--" }}USDT
                  </div>
                </div>
                <div class="bottom_center_row1">
                  <div
                    class="bottom_row1_btn"
                    @click="link_to('/finance/deposit')"
                  >
                    {{ $t("new.header.buyCoin") }}
                  </div>
                  <div
                    class="bottom_row1_btn"
                    @click="link_to('/flashExchange')"
                  >
                    {{ $t("newUi.text95") }}
                  </div>
                  <div class="bottom_row1_btn" @click="link_to('/finance/all')">
                    {{ $t("new.finance.transfer") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 和分仓 -->
    <open-type
      :openMerge="openMerge"
      :openType="openType"
      :openType1="openType1"
      :marginModeModal="marginModeModal"
      @openTypeSubmit="openTypeSubmit"
      @openTypeCancel="openTypeCancel"
    ></open-type>
    <!-- 杠杆 -->
    <leverageSelect
      :leverageModal="leverageModal"
      :leverageList="leverageList"
      :leverageNumber="leverageNumber"
      @leverageCancel="leverageCancel"
      @leverageSubmit="leverageSubmit"
    ></leverageSelect>
  </div>
</template>

<script>
import expandRow from "@components/exchange/expand.vue";
import Datafeeds from "@js/charting_library/datafeed/swaptrade.js";
import DepthGraph from "@components/exchange/DepthGraph.vue";
import LineCarousel from "@components/exchange/carousel3.vue";
import switchAll from "./component/switchAll.vue";
import tradeAll from "./component/tradeAll.vue";
import plateAll from "./component/plateAll.vue";
import headCoin from "./component/head_coin.vue";

import klineHeader from "./component/klineHeader.vue";
import tableAll from "./component/tableAll.vue";
import symbolList from "./component/symbolList.vue";
import openType from "./component/openType.vue";
import leverageSelect from "./component/leverageSelect.vue";
import $ from "@js/jquery.min.js";
export default {
  components: {
    expandRow,
    DepthGraph,
    switchAll,
    tradeAll,
    plateAll,
    LineCarousel,
    headCoin,
    // addtype,
    klineHeader,
    tableAll,
    symbolList,
    openType,
    leverageSelect,
  },
  data() {
    let self = this;
    return {
      allLists: [], //合约最低保证金率
      KlineTabs: 0,
      v_auto: [],
      openMerge: 0, //是否开放和分仓
      joinPositionData: [], //仓位合并
      currentPageName: "",
      swapUnitType: false,
      tradeType: null, // 是否是带单
      openTabVal: 0, //切换开仓平仓
      sliderValue: null, //滑块初始值百分数
      sliderValueNum: 0, //滑块初始值小数
      pricingStatus: localStorage.getItem("pricingStatus"), // 计价方式
      lineCurrentCoin: [],
      swapUnit: this.$t("swap.shareNumber"), // 单位
      positionData: [], // 当前非跟单持仓信息
      followPositionData: [], // 跟单持仓信息
      marginModeModal: false, // 逐倉全倉彈窗及狀態
      openType: "0",
      openType1: "0",
      triggerPriceType: false, // 止盈止損是否顯示
      leverageList: [], // 杠杆列表
      leverageModal: false, // 调整杠杆 合约倍数弹窗
      leverageNumber: 0,
      leverageAdjustVal: "",
      Yield: "",
      Mflag: false,
      checkSellCount: 0,
      checkBuyCount: 0,
      checkAllCount: 0,
      entrustType: 1,
      entrustOrderType: "MARKET_PRICE",
      sliderOpenPercent: 0,
      sliderClosePercent: 0,
      memberRate: 0,
      activeWidth: window.innerWidth,
      collecRequesting: false,
      currentCoinIsFavor: false,
      isUseBHB: false,
      skin: "day", //k线图皮肤样式day&night
      currentImgTable: "k",
      selectedOrder: "currentPositions", //当前显示的委托记录
      selectedPlate: "all", //当前显示的买卖盘
      CNYRate: null,
      datafeed: null,
      basecion: "usdt",
      coinScale: 6,
      baseCoinScale: 6,
      symbolFee: 0.001,
      dataIndex: [],
      allList: {},
      contractCoinInfo: {
        id: 0,
        baseSymbol: "",
        coinSymbol: "",
        symbol: "",
        openFee: 0,
        closeFee: 0,
        enableTriggerEntrust: 1,
        feePercent: 0,
        leverage: "",
        maxShare: 0,
        minShare: 0,
        shareNumber: 0,
      },
      contractWalletInfo: {
        usdtBalance: 0.0,
        usdtBuyPosition: 0.0,
        usdtSellPosition: 0.0,
        usdtBuyLeverage: 10,
        usdtSellLeverage: 10,
        usdtFrozenBalance: 0.0,
        usdtBuyPrincipalAmount: 0.0,
        usdtSellPrincipalAmount: 0.0,
      },
      currentCoin: {
        base: "",
        coin: "",
        symbol: "",
        price: 0.0,
      },
      currentEntrustOrderList: [], // 持仓
      historyEntrustOrderList: [],
      planDelegationList: [],
      list_show: false,
      pageInfo: {}, //资金费率的数据
      pageInfos: {}, //最小
      RuleList: [], //合约最低保证金率
      tabs_nexts: 0,
      select_type: [],
      coinAllList: [],
      unitSymbol: "",
      coins: {
        _map: [],
        USDT: [],
        favor: [],
        symbol: "",
      },
      form: {
        trigglePrice: "",
        entrustPrice: "",
        volume: "",
        triggerPrice: 0,
        triggerPriceWin: "",
        triggerPriceLose: "",
      },
      spotPriceType: "LIMIT_SPOT_LIMIT",
      trade: {
        rows: [],
      },
      // 盘口数据
      plate: {
        maxPostion: 7,
        askRows: [],
        bidRows: [],
      },
      fullTrade: {},
      marks: {
        0: " ",
        25: "",
        50: "",
        75: "",
        100: "",
      },
    };
  },
  computed: {
    // 获取汇率
    allRate() {
      return this.$store.state.allRate;
    },
    // 单位
    pricingStatusRate() {
      return this.$store.state.pricingStatusRate;
    },
    isLogin: function() {
      return this.$store.getters.isLogin;
    },
    member: function() {
      return this.$store.getters.member;
    },
    lang: function() {
      return this.$store.state.lang;
    },
    // 开仓的张数买
    buyVolume: function() {
      let temVolume = null;
      if (this.form.volume) {
        if (this.swapUnit === "USDT") {
          temVolume = (
            this.form.volume /
            this.currentCoin.shareNumber /
            this.currentCoin.price
          )
            .toFixed(5)
            .split(".")[0];
        } else if (this.swapUnit === this.unitSymbol) {
          temVolume = (this.form.volume / this.currentCoin.shareNumber)
            .toFixed(5)
            .split(".")[0];
        } else {
          temVolume = this.form.volume;
        }
      } else {
        if (this.swapUnit === "USDT") {
          temVolume = (
            (this.getkk(
              this.swapUnit,
              this.pageInfo.usdtBalance,
              this.currentCoin.shareNumber,
              this.currentCoin.price,
              this.unitSymbol,
              this.leverageAdjustVal,
              this.pageInfo.buyProportion
            ) *
              this.sliderValueNum) /
            this.currentCoin.shareNumber /
            this.currentCoin.price
          )
            .toFixed(5)
            .split(".")[0];
        } else if (this.swapUnit === this.unitSymbol) {
          temVolume = (
            (this.getkk(
              this.swapUnit,
              this.pageInfo.usdtBalance,
              this.currentCoin.shareNumber,
              this.currentCoin.price,
              this.unitSymbol,
              this.leverageAdjustVal,
              this.pageInfo.buyProportion
            ) *
              this.sliderValueNum) /
            this.currentCoin.shareNumber
          )
            .toFixed(5)
            .split(".")[0];
        } else {
          temVolume =
            this.getkk(
              this.swapUnit,
              this.pageInfo.usdtBalance,
              this.currentCoin.shareNumber,
              this.currentCoin.price,
              this.unitSymbol,
              this.leverageAdjustVal,
              this.pageInfo.buyProportion
            ) * this.sliderValueNum;
        }
      }
      return temVolume;
    },
    // 开仓的张数卖
    sellVolume: function() {
      let temVolume = null;
      if (this.form.volume) {
        if (this.swapUnit === "USDT") {
          temVolume = (
            this.form.volume /
            this.currentCoin.shareNumber /
            this.currentCoin.price
          )
            .toFixed(5)
            .split(".")[0];
        } else if (this.swapUnit === this.unitSymbol) {
          temVolume = (this.form.volume / this.currentCoin.shareNumber)
            .toFixed(5)
            .split(".")[0];
        } else {
          temVolume = this.form.volume;
        }
      } else {
        if (this.swapUnit === "USDT") {
          temVolume = (
            (this.getkk(
              this.swapUnit,
              this.pageInfo.usdtBalance,
              this.currentCoin.shareNumber,
              this.currentCoin.price,
              this.unitSymbol,
              this.leverageAdjustVal,
              this.pageInfo.sellProportion
            ) *
              this.sliderValueNum) /
            this.currentCoin.shareNumber /
            this.currentCoin.price
          )
            .toFixed(5)
            .split(".")[0];
        } else if (this.swapUnit === this.unitSymbol) {
          temVolume = (
            (this.getkk(
              this.swapUnit,
              this.pageInfo.usdtBalance,
              this.currentCoin.shareNumber,
              this.currentCoin.price,
              this.unitSymbol,
              this.leverageAdjustVal,
              this.pageInfo.sellProportion
            ) *
              this.sliderValueNum) /
            this.currentCoin.shareNumber
          )
            .toFixed(5)
            .split(".")[0];
        } else {
          temVolume =
            this.getkk(
              this.swapUnit,
              this.pageInfo.usdtBalance,
              this.currentCoin.shareNumber,
              this.currentCoin.price,
              this.unitSymbol,
              this.leverageAdjustVal,
              this.pageInfo.sellProportion
            ) * this.sliderValueNum;
        }
      }
      return temVolume;
    },
    // 账户总权益
    // totalQuanyi: function() {
    //   if (!this.isLogin || this.contractWalletInfo == null) {
    //     return 0;
    //   }
    //   var buyPL = 0;
    //   if (this.contractWalletInfo.usdtBuyPrice > 0) {
    //     buyPL =
    //       (this.currentCoin.price / this.contractWalletInfo.usdtBuyPrice - 1) *
    //       this.contractWalletInfo.usdtBuyPosition *
    //       this.contractWalletInfo.usdtShareNumber;
    //   }
    //   var sellPL = 0;
    //   if (this.contractWalletInfo.usdtSellPrice > 0) {
    //     sellPL =
    //       (1 - this.currentCoin.price / this.contractWalletInfo.usdtSellPrice) *
    //       (this.contractWalletInfo.usdtSellPosition +
    //         this.contractWalletInfo.usdtFrozenSellPosition) *
    //       this.contractWalletInfo.usdtShareNumber;
    //   }

    //   return (
    //     buyPL +
    //     sellPL +
    //     this.contractWalletInfo.usdtBalance +
    //     this.contractWalletInfo.usdtFrozenBalance +
    //     this.contractWalletInfo.usdtBuyPrincipalAmount +
    //     this.contractWalletInfo.usdtSellPrincipalAmount +
    //     this.contractWalletInfo.useMoney
    //   );
    // },
    // 资金利用率
    // assetRate: function() {
    //   if (!this.isLogin || this.contractWalletInfo == null) return 0;
    //   var zhanyong =
    //     this.contractWalletInfo.usdtFrozenBalance +
    //     this.contractWalletInfo.usdtBuyPrincipalAmount +
    //     this.contractWalletInfo.usdtSellPrincipalAmount +
    //     this.contractWalletInfo.useMoney;
    //   if (this.totalQuanyi > 0) {
    //     return zhanyong / this.totalQuanyi;
    //   } else {
    //     return 0;
    //   }
    // },
    // 预估强平价   全仓   买卖同时存在不算强平价
    parrentBuySell0() {
      let a = this.positionData.filter((item) => item.patterns === "CROSSED");
      let hasBuyAndSell =
        a.some((item) => item.direction === "BUY") &&
        a.some((item) => item.direction === "SELL");
      return hasBuyAndSell;
    },
    parrentBuySell() {
      let a = this.followPositionData.filter(
        (item) => item.patterns === "CROSSED"
      );
      let hasBuyAndSell =
        a.some((item) => item.direction === "BUY") &&
        a.some((item) => item.direction === "SELL");
      return hasBuyAndSell;
    },
    // 未实现盈亏
    profitAndLoss: function() {
      if (!this.isLogin || this.contractWalletInfo == null) {
        return 0;
      }
      let a = 0;
      if (this.positionData.length != 0) {
        this.positionData.map((item, index) => {
          a += this.getIncome(item);
        });
        return a;
      } else {
        return 0;
      }
    },
    // 维持保证金
    minBond: function() {
      if (!this.isLogin || this.contractWalletInfo == null) {
        return 0;
      }
      let a = 0;
      if (this.positionData.length != 0) {
        this.positionData.map((item, index) => {
          a += item.principalAmount;
        });
        return a;
      } else {
        return 0;
      }
    },
  },
  watch: {
    lang: function() {
      this.updateLangData();
    },
    $route(to, from) {
      this.init();
    },
    unitSymbol: function(newVal, oldVal) {
      if (this.swapUnit == oldVal) {
        this.swapUnit = newVal;
      }
      this.unitSymbol = newVal;
      this.getWalletPageInfo();
    },
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      // 更新汇率
      this.$store.dispatch("getAllRateActions");
      // 币种
      var params = this.$route.params.pair;
      if (params == undefined) {
        // 合约
        this.$http
          .post(this.host + this.api.markets.swapThumb, {})
          .then((res) => {
            this.$store.commit("getswapCoin", res.data[0].symbol);
            this.$router.push(
              "/swap/" + res.data[0].symbol.toLowerCase().replace("/", "_")
            );
            params = res.data[0].symbol.toLowerCase().replace("/", "_");
          });
        return;
      } else {
        this.$store.commit("getswapCoin", params);
      }
      // 是否是带单
      this.tradeType = localStorage.getItem("tradeType");
      if (params && typeof params === "string") {
        const basecion = params.split("_")[1];
        if (basecion) {
          this.basecion = basecion;
        }
      }
      if (params && typeof params === "string") {
        var coin = params.toUpperCase().split("_")[0];
        var base = params.toUpperCase().split("_")[1];
      }
      this.unitSymbol = coin;
      this.currentCoin.symbol = coin + "/" + base;
      this.$store.commit("addPage", this.currentCoin.symbol);
      this.getCNYRate();
      this.currentCoin.coin = coin;
      this.currentCoin.base = base;
      this.$store.commit("setSkin", this.skin);
      this.getSymbolInfo();
      this.getSymbolThumb(); //包含 K线图、getFavor、startWebsock等
      this.getPlate(); //买卖盘
      this.getPlateFull();
      this.getTrade();
      this.sliderOpenPercent = 0;
      this.sliderClosePercent = 0;
      this.getWalletPageInfo(); // 资金费率
      this.getCoinAllList(); //精度
      this.getAuto(); // 权限
    },
    // 获取动态数据
    getSymbolThumb() {
      this.$http.post(this.host + this.api.swap.thumb, {}).then((response) => {
        var resp = response.body;
        //先清空已有数据
        for (var i = 0; i < resp.length; i++) {
          var coin = resp[i];
          coin.base = resp[i].symbol.split("/")[1];
          this.coins[coin.base] = [];
          this.coins._map = [];
        }
        // 填充币种数据
        for (var i = 0; i < resp.length; i++) {
          var coin = resp[i];
          coin.price = resp[i].close = resp[i].close.toFixed(
            this.baseCoinScale
          );
          coin.rose =
            resp[i].chg > 0
              ? "+" + (resp[i].chg * 100).toFixed(2) + "%"
              : (resp[i].chg * 100).toFixed(2) + "%";
          coin.coin = resp[i].symbol.split("/")[0];
          coin.base = resp[i].symbol.split("/")[1];
          coin.href = (coin.coin + "_" + coin.base).toLowerCase();
          coin.isFavor = false;
          this.coins._map[coin.symbol] = coin;
          this.coins[coin.base].push(coin);
          // 当币种数据的交易对等于当前页面选择的交易对
          if (coin.symbol == this.currentCoin.symbol) {
            this.currentCoin = coin;
            this.form.entrustPrice = coin.price;
          }
        }
        if (this.isLogin) {
          this.getFavor();
        }
        this.initMqtt();
      });
    },
    // 更改单位
    handleSwapUnit(name) {
      this.swapUnit = name;
    },
    // 获取汇率
    getCNYRate() {
      this.CNYRate = this.pricingStatusRate;
      // 更新汇率
      this.$store.dispatch("getAllRateActions");
    },
    // 切换自选和本位
    changeBaseCion(type) {
      this.basecion = type;
      this.getFavor();
    },
    // 滑动
    changeValue(value) {
      if (value == 0) {
        this.sliderValue = null;
      } else {
        this.sliderValue = value + "%";
      }
      this.sliderValueNum = value / 100;
    },
    //查询自选(收藏)
    getFavor() {
      this.$http
        .post(this.host + this.api.swap.favorFind, {})
        .then((response) => {
          this.coins.favor = [];
          this.currentCoinIsFavor = false;
          var resp = response.body.data;
          for (var i = 0; i < resp.length; i++) {
            var coin = this.getCoin(resp[i].symbol);
            if (coin != null) {
              coin.isFavor = true;
              this.coins.favor.push(coin);
            }
            if (this.currentCoin.symbol == resp[i].symbol) {
              this.currentCoinIsFavor = true;
            }
          }
          if (this.basecion == "usdt") {
            this.dataIndex = this.coins.USDT;
          }
          if (this.basecion == "favor") {
            this.dataIndex = this.coins.favor;
          }
        });
    },
    currentCoinFavorChange() {
      if (!this.isLogin) {
        this.$Message.warning(this.$t("common.logintip"));
        return;
      }
      if (this.collecRequesting) {
        return;
      }
      this.coins.symbol = this.currentCoin.symbol;
      this.collecRequesting = true;
      if (this.currentCoinIsFavor) {
        //取消收藏
        this.cancelCollect(this.coins);
      } else {
        //收藏
        this.collect(this.coins);
      }
    },
    changeFavor(type) {
      if (type.isFavor) {
        this.cancelCollect(type);
      } else {
        this.collect(type);
      }
    },
    collect(row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.swap.favorAdd, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.do_favorite"));
            this.getCoin(row.symbol).isFavor = true;
            row.isFavor = true;
            this.coins.favor.push(row);
            if (this.currentCoin.symbol == row.symbol) {
              this.currentCoinIsFavor = true;
            }
          }
          this.collecRequesting = false;
        });
    },
    cancelCollect(row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.swap.favorDelete, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Message.info(this.$t("exchange.cancel_favorite"));
            this.getCoin(row.symbol).isFavor = false;
            for (var i = 0; i < this.coins.favor.length; i++) {
              var favorCoin = this.coins.favor[i];
              if (favorCoin.symbol == row.symbol) {
                this.coins.favor.splice(i, 1);
                break;
              }
            }
            if (this.currentCoin.symbol == row.symbol) {
              this.currentCoinIsFavor = false;
            }
          }
          this.collecRequesting = false;
        });
    },
    // 开仓平仓切换
    changeOpenTaba(num) {
      this.openTabVal = num;
    },
    openTypeCancel(val) {
      this.marginModeModal = val;
    },
    openTypeSubmit(val0, val1, val2) {
      this.marginModeModal = val0;
      if (val1) {
        this.openType1 = val1;
      }
      if (val2) {
        this.openType = val2;
      }
    },
    // 获取合约不同杠杆下合约最低保证金率
    getRuleList() {
      this.$http
        .get(this.host + this.api.finance.getRuleMarginRate, {
          params: {
            contractId: this.contractCoinInfo.id,
          },
        })
        .then((res) => {
          this.allLists = res.data.data;
        });
    },
    // 预估强评价 买
    getBuyForcePrice() {
      //合约最低保证金率
      var MarginRate = this.getMaintenanceMarginRate(
        this.allLists,
        this.leverageAdjustVal
      );
      // 开仓价格
      var openPrice =
        this.entrustOrderType == "MARKET_PRICE"
          ? this.currentCoin.price
          : this.entrustOrderType == "LIMIT_PRICE"
          ? this.form.entrustPrice
          : this.form.entrustPrice;
      // 保证金
      var margin = this.margin(
        this.buyVolume,
        this.currentCoin.shareNumber,
        this.leverageAdjustVal,
        this.currentCoin.price
      );
      // 手续费
      var openFee = this.currentCoin.openFee;
      // 面值
      var shareNumber = this.currentCoin.shareNumber;
      // 合约余额
      var balance = this.pageInfo.usdtBalance;
      if (this.openType == 0) {
        //  openFee
        return this.buyAllForcePrice(
          openPrice,
          MarginRate,
          margin,
          balance,
          openFee,
          shareNumber,
          this.buyVolume
        );
      } else {
        return this.buyForcePrice(
          openPrice,
          MarginRate,
          margin,
          openFee,
          shareNumber,
          this.buyVolume
        );
      }
    },
    //  预估强评价 卖
    getSellForcePrice() {
      //合约最低保证金率
      var MarginRate = this.getMaintenanceMarginRate(
        this.allLists,
        this.leverageAdjustVal
      );
      // 开仓价格
      var openPrice =
        this.entrustOrderType == "MARKET_PRICE"
          ? this.currentCoin.price
          : this.entrustOrderType == "LIMIT_PRICE"
          ? this.form.entrustPrice
          : this.form.entrustPrice;
      // 保证金
      var margin = this.margin(
        this.sellVolume,
        this.currentCoin.shareNumber,
        this.leverageAdjustVal,
        this.currentCoin.price
      );
      // 手续费
      var openFee = this.currentCoin.openFee;
      // 面值
      var shareNumber = this.currentCoin.shareNumber;
      // 合约余额
      var balance = this.pageInfo.usdtBalance;
      if (this.openType == 0) {
        return this.sellAllForcePrice(
          openPrice,
          MarginRate,
          margin,
          balance,
          openFee,
          shareNumber,
          this.sellVolume
        );
      } else {
        return this.sellForcePrice(
          openPrice,
          MarginRate,
          margin,
          openFee,
          shareNumber,
          this.sellVolume
        );
      }
    },
    // 保证金
    buyMargin() {
      return this.margin(
        this.buyVolume,
        this.currentCoin.shareNumber,
        this.leverageAdjustVal,
        this.currentCoin.price
      );
    },
    sellMargin() {
      return this.margin(
        this.sellVolume,
        this.currentCoin.shareNumber,
        this.leverageAdjustVal,
        this.currentCoin.price
      );
    },
    // 盘口数据条数
    changePlate(str) {
      if (str != "all") {
        this.plate.maxPostion = 14;
      } else {
        this.plate.maxPostion = 7;
      }
      this.getPlate(str);
    },
    // 切换k 线
    changeImgTable(str) {
      if (str == "k") {
        this.Mflag = false;
      } else if (str == "s") {
        this.Mflag = true;
      }
      this.currentImgTable = str;
    },
    getCoin(symbol) {
      return this.coins._map[symbol];
    },
    // 生成K线
    getKline() {
      var that = this;
      let config = {
        autosize: true,
        height: 400,
        // fullscreen: window.innerWidth > 767 ? true : false,
        symbol: that.symbol,
        interval: "5", // 默认K线周期
        timezone: this.getTimezone4K(),
        toolbar_bg: "#fff",
        container_id: "kline_container",
        datafeed: that.datafeed,
        library_path:
          process.env.NODE_ENV === "production"
            ? "/assets/charting_library/"
            : "/src/assets/js/charting_library/",
        locale: this.getLang4K(),
        debug: false,
        drawings_access: {
          type: "black",
          tools: [{ name: "Regression Trend" }],
        },
        disabled_features: [
          "header_resolutions",
          "timeframes_toolbar",
          "header_symbol_search",
          "header_chart_type",
          "header_compare",
          "header_undo_redo",
          "header_screenshot",
          "header_saveload",
          //"use_localstorage_for_settings",
          //"left_toolbar",
          "volume_force_overlay",
          "widget_logo",
          "compare_symbol",
          "display_market_status",
          "go_to_date",
          "header_interval_dialog_button",
          "legend_context_menu",
          "show_hide_button_in_legend",
          "show_interval_dialog_on_key_press",
          "snapshot_trading_drawings",
          "symbol_info",
          //"header_widget",
          "edit_buttons_in_legend",
          "context_menus",
          "control_bar",
          "border_around_the_chart",
        ],
        enabled_features: [
          "disable_resolution_rebuild",
          "keep_left_toolbar_visible_on_small_screens", //防止左侧工具栏在小屏幕上消失
          "hide_last_na_study_output",
          "move_logo_to_main_pane",
          "dont_show_boolean_study_arguments",
          "use_localstorage_for_settings",
          "remove_library_container_border",
          "save_chart_properties_to_local_storage",
          "side_toolbar_in_fullscreen_mode",
          "constraint_dialogs_movement",
          "header_toolbar",
          "hide_left_toolbar_by_default",
          "left_toolbar",
          "same_data_requery",
          "header_in_fullscreen_mode",
          "show_right_widgets_panel_by_default",
        ],
        //成交量样式
        studies_overrides: {
          "volume.volume.color.0": "#F14A3E",
          "volume.volume.color.1": "#03C59E",
          "volume.volume.transparency": 25,
        },
        custom_css_url: "bundles/common.css",
        supported_resolutions: [
          "1",
          "5",
          "15",
          "30",
          "60",
          "4H",
          "1D",
          "1W",
          "1M",
        ],
        charts_storage_url: "http://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        overrides: {
          "paneProperties.background": "#192330",
          "paneProperties.vertGridProperties.color": "rgba(0,0,0,.1)",
          "paneProperties.horzGridProperties.color": "rgba(0,0,0,.1)",
          "scalesProperties.textColor": "#000000",
          "mainSeriesProperties.candleStyle.upColor": "#03C59E",
          "mainSeriesProperties.candleStyle.downColor": "#F14A3E",
          "mainSeriesProperties.candleStyle.drawBorder": false,
          "mainSeriesProperties.candleStyle.wickUpColor": "#589065",
          "mainSeriesProperties.candleStyle.wickDownColor": "#AE4E54",
          "paneProperties.legendProperties.showLegend": false,
          "mainSeriesProperties.areaStyle.color1": "rgba(71, 78, 112, 0.5)",
          "mainSeriesProperties.areaStyle.color2": "rgba(71, 78, 112, 0.5)",
          "mainSeriesProperties.areaStyle.linecolor": "#9194a4",
          volumePaneSize: "small",
        },
        time_frames: [
          {
            text: "1min",
            resolution: "1",
            description: "realtime",
            title: this.$t("swap.realtime"),
          },
          { text: "1min", resolution: "1", description: "1min" },
          { text: "5min", resolution: "5", description: "5min" },
          { text: "15min", resolution: "15", description: "15min" },
          { text: "30min", resolution: "30", description: "30min" },
          {
            text: "1hour",
            resolution: "60",
            description: "1hour",
            title: "1hour",
          },
          {
            text: "4hour",
            resolution: "240",
            description: "4hour",
            title: "4hour",
          },
          {
            text: "1day",
            resolution: "1D",
            description: "1day",
            title: "1day",
          },
          {
            text: "1week",
            resolution: "1W",
            description: "1week",
            title: "1week",
          },
          { text: "1mon", resolution: "1M", description: "1mon" },
        ],
      };
      if (that.skin === "day") {
        config.toolbar_bg = "#fff";
        config.custom_css_url = "bundles/common_day.css";
        config.overrides["paneProperties.background"] = "#fff";
        config.overrides["mainSeriesProperties.candleStyle.upColor"] =
          "#03C59E";
        config.overrides["mainSeriesProperties.candleStyle.downColor"] =
          "#F14A3E";
      }
      require(["@js/charting_library/charting_library.min.js"], function(tv) {
        var widget = (window.tvWidget = new TradingView.widget(config));
        widget.onChartReady(function() {
          widget.chart().executeActionById("undo");
          if (window.innerWidth > 767) {
            widget
              .chart()
              .createStudy("Moving Average", false, false, [5], null, {
                "plot.color": "#EDEDED",
              });
            widget
              .chart()
              .createStudy("Moving Average", false, false, [10], null, {
                "plot.color": "#ffe000",
              });
            widget
              .chart()
              .createStudy("Moving Average", false, false, [30], null, {
                "plot.color": "#ce00ff",
              });
            widget
              .chart()
              .createStudy("Moving Average", false, false, [60], null, {
                "plot.color": "#00adff",
              });
          }
          if (window.innerWidth > 767) {
            widget
              .createButton()
              .attr("title", "realtime")
              .on("click", function() {
                if ($(this).hasClass("selected")) return;
                $(this)
                  .addClass("selected")
                  .parent(".group")
                  .siblings(".group")
                  .find(".button.selected")
                  .removeClass("selected");
                widget.chart().setChartType(3);
                widget.setSymbol("", "1");
              })
              .append("<span>Time</span>");
          }

          widget
            .createButton()
            .attr("title", "M1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1");
            })
            .append("<span>M1</span>");
          if (window.innerWidth > 767) {
            widget
              .createButton()
              .attr("title", "M5")
              .on("click", function() {
                if ($(this).hasClass("selected")) return;
                $(this)
                  .addClass("selected")
                  .parent(".group")
                  .siblings(".group")
                  .find(".button.selected")
                  .removeClass("selected");
                widget.chart().setChartType(1); //改变K线类型
                widget.setSymbol("", "5");
              })
              .append("<span>M5</span>")
              .addClass("selected");
          }

          widget
            .createButton()
            .attr("title", "M15")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "15");
            })
            .append("<span>M15</span>");

          widget
            .createButton()
            .attr("title", "M30")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "30");
            })
            .append("<span>M30</span>");

          widget
            .createButton()
            .attr("title", "H1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "60");
            })
            .append("<span>H1</span>");

          if (window.innerWidth > 767) {
            widget
              .createButton()
              .attr("title", "H4")
              .on("click", function() {
                if ($(this).hasClass("selected")) return;
                $(this)
                  .addClass("selected")
                  .parent(".group")
                  .siblings(".group")
                  .find(".button.selected")
                  .removeClass("selected");
                widget.chart().setChartType(1);
                widget.setSymbol("", "240");
              })
              .append("<span>H4</span>");
          }

          widget
            .createButton()
            .attr("title", "D1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1D");
            })
            .append("<span>D1</span>");

          widget
            .createButton()
            .attr("title", "W1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1W");
            })
            .append("<span>W1</span>");

          widget
            .createButton()
            .attr("title", "M1")
            .on("click", function() {
              if ($(this).hasClass("selected")) return;
              $(this)
                .addClass("selected")
                .parent(".group")
                .siblings(".group")
                .find(".button.selected")
                .removeClass("selected");
              widget.chart().setChartType(1);
              widget.setSymbol("", "1M");
            })
            .append("<span>M1</span>");
        });
      });
    },
    getSymbolInfo() {
      //获取精度
      this.$http
        .post(this.host + this.api.swap.symbolInfo, {
          symbol: this.currentCoin.symbol,
        })
        .then((response) => {
          var resp = response.body;
          if (resp != null) {
            this.currentCoin.coinScale = resp.coinScale;
            this.currentCoin.baseCoinScale = resp.baseCoinScale;
            this.baseCoinScale = resp.baseCoinScale;
            this.coinScale = resp.coinScale;
            this.symbolFee = resp.fee;
            this.contractCoinInfo = resp;
            this.leverageList = this.contractCoinInfo.leverage.split(",");
            this.leverageNumber = 0;
            this.leverageAdjustVal = this.leverageList[0];
          }
          this.getRuleList();
        });
    },
    getPlate(str = "") {
      //买卖盘
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      this.$http
        .post(this.host + this.api.swap.platemini, params)
        .then((response) => {
          this.plate.askRows = [];
          this.plate.bidRows = [];
          let resp = response.body;
          var c = resp.ask.items;
          var b = resp.bid.items;
          if (resp.ask && c) {
            for (var i = 0; i < c.length; i++) {
              if (i == 0) {
                c[i].totalAmount = c[i].amount;
              } else {
                c[i].totalAmount = c[i - 1].totalAmount + c[i].amount;
              }
            }
            if (c.length >= this.plate.maxPostion) {
              for (var i = this.plate.maxPostion; i > 0; i--) {
                var ask = c[i - 1];
                ask.direction = "SELL";
                ask.position = i;
                this.plate.askRows.push(ask);
              }
              const rows = this.plate.askRows,
                len = rows.length,
                totle = rows[0].totalAmount;
              this.plate.askTotle = totle;
            } else {
              for (var i = this.plate.maxPostion; i > c.length; i--) {
                var ask = { price: 0, amount: 0 };
                ask.direction = "SELL";
                ask.position = i;
                ask.totalAmount = ask.amount;
                this.plate.askRows.push(ask);
              }
              for (var i = c.length; i > 0; i--) {
                var ask = c[i - 1];
                ask.direction = "SELL";
                ask.position = i;
                this.plate.askRows.push(ask);
              }
              var askItemIndex = c.length - 1 > 0 ? c.length - 1 : 0;
              const rows = this.plate.askRows,
                len = rows.length,
                totle = rows[askItemIndex].totalAmount;
              this.plate.askTotle = totle;
            }
            this.plate.askRows.sort((a, b) => b.price - a.price);
          }
          if (resp.bid && b) {
            for (var i = 0; i < b.length; i++) {
              if (i == 0) b[i].totalAmount = b[i].amount;
              else b[i].totalAmount = b[i - 1].totalAmount + b[i].amount;
            }
            for (var i = 0; i < b.length; i++) {
              var bid = b[i];
              bid.direction = "BUY";
              bid.position = i + 1;
              this.plate.bidRows.push(bid);
              if (i == this.plate.maxPostion - 1) break;
            }
            if (b.length < this.plate.maxPostion) {
              for (var i = b.length; i < this.plate.maxPostion; i++) {
                var bid = { price: 0, amount: 0 };
                bid.direction = "BUY";
                bid.position = i + 1;
                bid.totalAmount = 0;
                this.plate.bidRows.push(bid);
              }
              var bidItemIndex = b.length - 1 > 0 ? b.length - 1 : 0;
              const rows = this.plate.bidRows,
                len = rows.length,
                totle = rows[bidItemIndex].totalAmount;
              this.plate.bidTotle = totle;
            } else {
              const rows = this.plate.bidRows,
                len = rows.length,
                totle = rows[len - 1].totalAmount;
              this.plate.bidTotle = totle;
            }
            this.plate.bidRows.sort((a, b) => b.price - a.price);
          }
          if (str != "") {
            this.selectedPlate = str;
          }
        });
    },
    getPlateFull() {
      //深度图
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      this.$http
        .post(this.host + this.api.swap.platefull, params)
        .then((response) => {
          try {
            var resp = response.body;
            resp.skin = this.skin;
            this.fullTrade = resp;
            this.$refs.depthGraph.draw(resp);
          } catch (error) {}
        });
    },
    getTrade() {
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["size"] = 20;
      this.$http
        .post(this.host + this.api.swap.trade, params)
        .then((response) => {
          this.trade.rows = [];
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            this.trade.rows.push(resp[i]);
          }
        });
    },
    gohref(currentRow) {
      if (
        currentRow.href !=
        this.currentCoin.symbol.replace("/", "_").toLowerCase()
      ) {
        let arr = [
          "contract-trade-pc/" + this.currentCoin.symbol.replace("/", "-"),
          "contract-plate/" + this.currentCoin.symbol.replace("/", "-"),
        ];
        if (this.isLogin) {
          arr.push(
            "contract-takeposition-doc/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-"),
            "contract-takeposition/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-"),
            "contract-spot/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-"),
            "current-contract-order/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-")
          );
        }
        this.$mqttService.unsubscribe(arr, function() {});
        this.$router.push({
          name: "SwapPair",
          params: {
            pair: currentRow.href,
          },
        });
      }

      this.list_show = false;
    },
    buyPlate(currentRow) {
      this.form.entrustPrice = currentRow.price;
    },
    sellPlate(currentRow) {
      this.form.entrustPrice = currentRow.price;
    },
    showMarginModeModal() {
      if (!this.isLogin) return;
      this.marginModeModal = true;
    },
    showLeverageModal() {
      this.leverageModal = true;
    },
    leverageCancel(val) {
      this.leverageModal = val;
    },
    leverageSubmit(val, val1) {
      this.leverageModal = val;
      this.leverageNumber = val1;
      this.leverageAdjustVal = this.leverageList[val1];
    },
    // 开仓相关操作
    changeEntrustOrderType(value) {
      this.entrustOrderType = value;
      if (value == "MARKET_PRICE") {
        // 市價委托
        this.form.trigglePrice = "";
        this.form.entrustPrice = this.currentCoin.price;
        this.form.volume = "";
        this.form.triggerPriceWin = "";
        this.form.triggerPrice = "";
        this.form.triggerPriceLose = "";
      } else if (value == "LIMIT_PRICE") {
        // 限价委托
        this.form.entrustPrice = this.currentCoin.price;
        this.form.volume = "";
        this.form.triggerPriceWin = "";
        this.form.triggerPriceLose = "";
        this.form.triggerPrice = "";
      } else if (value == "SPOT_LIMIT") {
        // 计划委托
        this.spotPriceType = "LIMIT_SPOT_LIMIT";
        this.form.entrustPrice = this.currentCoin.price;
        this.form.volume = "";
        this.form.triggerPrice = "";
        this.form.triggerPriceWin = "";
        this.form.triggerPriceLose = "";
      }
    },
    // 最优
    handNewPrice() {
      this.form.entrustPrice = this.currentCoin.price;
    },

    // 计划委托 选择市价还是限价
    handleSpotPrice(value) {
      this.spotPriceType = value;
      if (value === "LIMIT_SPOT_LIMIT") {
        // 限价
        this.form.entrustPrice = this.currentCoin.price;
      } else {
        // 市价
        this.form.entrustPrice = "";
      }
    },
    // 买入卖出
    handleBuyAndSell(direction) {
      // 未登录返回
      if (!this.isLogin) return;
      if (
        this.form.triggerPriceWin == "" ||
        this.form.triggerPriceWin == undefined
      ) {
        this.form.triggerPriceWin = null;
      }
      if (
        this.form.triggerPriceLose == "" ||
        this.form.triggerPriceLose == undefined
      ) {
        this.form.triggerPriceLose = null;
      }
      let temVolume = null;
      if (this.form.volume) {
        if (this.swapUnit === "USDT") {
          temVolume = (
            this.form.volume /
            this.currentCoin.shareNumber /
            this.currentCoin.price
          )
            .toFixed(5)
            .split(".")[0];
        } else if (this.swapUnit === this.unitSymbol) {
          temVolume = (this.form.volume / this.currentCoin.shareNumber)
            .toFixed(5)
            .split(".")[0];
        } else {
          temVolume = this.form.volume;
        }
      } else {
        if (direction == "BUY") {
          if (this.swapUnit === "USDT") {
            temVolume = (
              (this.getkk(
                this.swapUnit,
                this.pageInfo.usdtBalance,
                this.currentCoin.shareNumber,
                this.currentCoin.price,
                this.unitSymbol,
                this.leverageAdjustVal,
                this.pageInfo.buyProportion
              ) *
                this.sliderValueNum) /
              this.currentCoin.shareNumber /
              this.currentCoin.price
            )
              .toFixed(5)
              .split(".")[0];
          } else if (this.swapUnit === this.unitSymbol) {
            temVolume = (
              (this.getkk(
                this.swapUnit,
                this.pageInfo.usdtBalance,
                this.currentCoin.shareNumber,
                this.currentCoin.price,
                this.unitSymbol,
                this.leverageAdjustVal,
                this.pageInfo.buyProportion
              ) *
                this.sliderValueNum) /
              this.currentCoin.shareNumber
            )
              .toFixed(5)
              .split(".")[0];
          } else {
            temVolume =
              this.getkk(
                this.swapUnit,
                this.pageInfo.usdtBalance,
                this.currentCoin.shareNumber,
                this.currentCoin.price,
                this.unitSymbol,
                this.leverageAdjustVal,
                this.pageInfo.buyProportion
              ) * this.sliderValueNum;
          }
        } else if (direction == "SELL") {
          if (this.swapUnit === "USDT") {
            temVolume = (
              (this.getkk(
                this.swapUnit,
                this.pageInfo.usdtBalance,
                this.currentCoin.shareNumber,
                this.currentCoin.price,
                this.unitSymbol,
                this.leverageAdjustVal,
                this.pageInfo.sellProportion
              ) *
                this.sliderValueNum) /
              this.currentCoin.shareNumber /
              this.currentCoin.price
            )
              .toFixed(5)
              .split(".")[0];
          } else if (this.swapUnit === this.unitSymbol) {
            temVolume = (
              (this.getkk(
                this.swapUnit,
                this.pageInfo.usdtBalance,
                this.currentCoin.shareNumber,
                this.currentCoin.price,
                this.unitSymbol,
                this.leverageAdjustVal,
                this.pageInfo.sellProportion
              ) *
                this.sliderValueNum) /
              this.currentCoin.shareNumber
            )
              .toFixed(5)
              .split(".")[0];
          } else {
            temVolume =
              this.getkk(
                this.swapUnit,
                this.pageInfo.usdtBalance,
                this.currentCoin.shareNumber,
                this.currentCoin.price,
                this.unitSymbol,
                this.leverageAdjustVal,
                this.pageInfo.sellProportion
              ) * this.sliderValueNum;
          }
        }
      }

      let params = {
        contractCoinId: this.contractCoinInfo.id, // 合约id
        type:
          this.entrustOrderType === "SPOT_LIMIT"
            ? this.spotPriceType
            : this.entrustOrderType, // 价格类型 MARKET_PRICE:市价  LIMIT_PRICE:限价
        openType: this.openType, // 0全仓1逐仓
        direction: direction, //  BUY SELL
        volume: temVolume, //委托数量 開倉數量
        triggerPriceType: this.triggerPriceType ? "1" : "0", // 止盈价格
        triggerPriceWin: this.form.triggerPriceWin, // 止盈价格
        triggerPriceLose: this.form.triggerPriceLose, // 止损价格
        entrustPrice: Number(this.form.entrustPrice), // 委托價
        triggerPrice: this.form.triggerPrice || "0", // 触发价
        leverageBuy: direction == "BUY" ? Number(this.leverageAdjustVal) : "", // 杠杆倍数（多）
        leverageSell: direction == "SELL" ? Number(this.leverageAdjustVal) : "", // 杠杆倍数（空）
        tradeType: this.tradeType === null ? "0" : "1",
        jointType: this.openMerge == 1 ? this.openType1 : this.openType,
        // btype: this.datasource,
      };
      let a =
        this.swapUnit === "USDT"
          ? (
              this.pageInfos.minShare *
              this.currentCoin.shareNumber *
              this.currentCoin.price
            ).toFixed(4)
          : this.swapUnit === this.unitSymbol
          ? (this.pageInfos.minShare * this.currentCoin.shareNumber).toFixed(4)
          : this.pageInfos.minShare;
      if (Number(this.form.volume) < Number(a)) {
        this.$Message.error(
          this.$t("dolphin.text144") +
            `${
              this.swapUnit === "USDT"
                ? (
                    this.pageInfos.minShare *
                    this.currentCoin.shareNumber *
                    this.currentCoin.price
                  ).toFixed(4)
                : this.swapUnit === this.unitSymbol
                ? (
                    this.pageInfos.minShare * this.currentCoin.shareNumber
                  ).toFixed(4)
                : this.pageInfos.minShare
            }` +
            `${this.swapUnit}`
        );
        return;
      }
      var reg = /^(0|[1-9]\d*)(\.\d+)?$/;
      if (!reg.test(params.volume)) {
        this.$Message.error(this.$t("swap.pleaseinputcorrectopenvolume"));
        return;
      }
      if (this.entrustOrderType == "LIMIT_PRICE") {
        // 限价，必须输入价格
        if (this.form.entrustPrice == "" || this.form.entrustPrice == 0) {
          this.$Message.error(this.$t("swap.pleaseinputrightentrustprice"));
          return;
        }
      }
      if (this.triggerPriceType) {
        if (
          !reg.test(this.form.triggerPriceWin) &&
          !reg.test(this.form.triggerPriceLose)
        ) {
          this.$Message.error(this.$t("dolphin.text150"));
          return;
        }
      }

      this.$Spin.show();
      var that = this;
      this.$http
        .post(this.host + this.api.swap.open, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("swap.tip"),
              desc: that.$t("swap.success"),
            });
            // 把一次性的带单 清除掉
            this.tradeType = null;
            localStorage.removeItem("tradeType");
            setTimeout(function() {
              // that.getMemberContractWallet();
              that.form.volume = "";
              that.form.triggerPrice = "";
            }, 1000);
          } else {
            this.$Notice.error({
              title: that.$t("swap.tip"),
              desc: resp.message,
            });
          }
          this.$Spin.hide();
        });
    },
    cancelFollow() {
      this.$Modal.confirm({
        title: this.$t("carouselItem.text47"),
        content: this.$t("carouselItem.text48"),
        okText: this.$t("common.ok"), // 确定按钮的多语言文本
        cancelText: this.$t("common.close"),
        onOk: () => {
          this.tradeType = null;
          localStorage.removeItem("tradeType");
        },
      });
    },
    //合约页面信息
    getWalletPageInfo() {
      this.$http
        .get(this.host + this.api.swap.coinInfo, {
          params: {
            symbol: this.currentCoin.symbol,
          },
        })
        .then((res) => {
          this.pageInfos = res.data.data;
        });
    },
    goPage(addr) {
      this.$router.push(`/${addr}`);
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
    initMqtt() {
      this.$mqttService
        .initMqtts()
        .then((client) => {
          //连接成功
          this.datafeed = new Datafeeds.WebsockFeed(
            this.host + "/swap",
            this.currentCoin,
            client,
            this.baseCoinScale
          );
          this.getKline();
          var that = this;
          //订阅盘口消息
          client.subscribe(
            "contract-plate/" + that.currentCoin.symbol.replace("/", "-"),
            function(err, message) {
              if (!err) {
                client.on("message", (topic, message) => {
                  let parts = topic.split("/");
                  let firstPart = parts.shift();
                  if (firstPart == "contract-plate") {
                    var resp = JSON.parse(message);
                    if (resp.direction == "SELL") {
                      var asks = resp.items;
                      that.plate.askRows = [];
                      let totle = 0;
                      for (var i = that.plate.maxPostion - 1; i >= 0; i--) {
                        var ask = {};
                        if (i < asks.length) {
                          ask = asks[i];
                        } else {
                          ask["price"] = 0;
                          ask["amount"] = 0;
                        }
                        ask.direction = "SELL";
                        ask.position = i + 1;
                        that.plate.askRows.push(ask);
                      }
                      for (var i = that.plate.askRows.length - 1; i >= 0; i--) {
                        if (
                          i == that.plate.askRows.length - 1 ||
                          that.plate.askRows[i].price == 0
                        ) {
                          that.plate.askRows[i].totalAmount =
                            that.plate.askRows[i].amount;
                        } else {
                          that.plate.askRows[i].totalAmount =
                            that.plate.askRows[i + 1].totalAmount +
                            that.plate.askRows[i].amount;
                        }
                        totle += that.plate.askRows[i].amount;
                      }
                      that.plate.askTotle = totle;
                      that.plate.askRows.sort((a, b) => b.price - a.price);
                    } else {
                      var bids = resp.items;
                      that.plate.bidRows = [];
                      let totle = 0;
                      for (var i = 0; i < that.plate.maxPostion; i++) {
                        var bid = {};
                        if (i < bids.length) {
                          bid = bids[i];
                        } else {
                          bid["price"] = 0;
                          bid["amount"] = 0;
                        }
                        bid.direction = "BUY";
                        bid.position = i + 1;
                        that.plate.bidRows.push(bid);
                      }
                      for (var i = 0; i < that.plate.bidRows.length; i++) {
                        if (i == 0 || that.plate.bidRows[i].amount == 0) {
                          that.plate.bidRows[i].totalAmount =
                            that.plate.bidRows[i].amount;
                        } else {
                          that.plate.bidRows[i].totalAmount =
                            that.plate.bidRows[i - 1].totalAmount +
                            that.plate.bidRows[i].amount;
                        }
                        totle += that.plate.bidRows[i].amount;
                      }
                      that.plate.bidTotle = totle;
                      that.plate.bidRows.sort((a, b) => b.price - a.price);
                    }
                    if (that.currentImgTable == "s") {
                      that.getPlateFull();
                    }
                  }
                });
              } else {
                console.log("订阅失败");
              }
            }
          );
          //订阅钱包
          if (this.isLogin) {
            client.subscribe(
              "contract-pageinfo/" +
                that.member.id +
                "/" +
                that.currentCoin.symbol.replace("/", "-"),
              function(err, message) {
                if (!err) {
                  // 向服务端发送 contract/contract-pageinfo 主题消息
                  client.on("message", (topic, message) => {
                    let parts = topic.split("/");
                    let firstPart = parts.shift();
                    if (firstPart == "contract-pageinfo") {
                      var resp = JSON.parse(message);
                      that.pageInfo = resp;
                    }
                  });
                }
              }
            );
            // 当前持仓
            client.subscribe(
              "contract-takeposition/" +
                that.member.id +
                "/" +
                that.currentCoin.symbol.replace("/", "-"),
              function(err, message) {
                if (!err) {
                  client.on("message", (topic, message) => {
                    let parts = topic.split("/");
                    let firstPart = parts.shift();
                    if (firstPart == "contract-takeposition") {
                      var resp = JSON.parse(message);
                      that.positionData = resp;
                      that.joinPositionData = [];
                      if (resp.length > 0) {
                        resp.forEach((item) => {
                          if (item.jointType == 1) {
                            that.joinPositionData.push(item);
                          }
                        });
                      }
                    }
                  });
                }
              }
            );
            // 跟单持仓
            client.subscribe(
              "contract-takeposition-doc/" +
                that.member.id +
                "/" +
                that.currentCoin.symbol.replace("/", "-"),
              function(err, message) {
                if (!err) {
                  // 向服务端发送 contract/contract-pageinfo 主题消息
                  client.on("message", (topic, message) => {
                    let parts = topic.split("/");
                    let firstPart = parts.shift();
                    if (firstPart == "contract-takeposition-doc") {
                      var resp = JSON.parse(message);
                      that.followPositionData = resp;
                    }
                  });
                }
              }
            );
            // 计划委托
            client.subscribe(
              "contract-spot/" +
                that.member.id +
                "/" +
                that.currentCoin.symbol.replace("/", "-"),
              function(err, message) {
                if (!err) {
                  // 向服务端发送 contract/contract-pageinfo 主题消息
                  client.on("message", (topic, message) => {
                    let parts = topic.split("/");
                    let firstPart = parts.shift();
                    if (firstPart == "contract-spot") {
                      var resp = JSON.parse(message);
                      that.planDelegationList = resp;
                    }
                  });
                }
              }
            );
            // 当前委托
            client.subscribe(
              "current-contract-order/" +
                that.member.id +
                "/" +
                that.currentCoin.symbol.replace("/", "-"),
              function(err, message) {
                if (!err) {
                  // 向服务端发送 contract/contract-pageinfo 主题消息
                  client.on("message", (topic, message) => {
                    let parts = topic.split("/");
                    let firstPart = parts.shift();
                    if (firstPart == "current-contract-order") {
                      var resp = JSON.parse(message);
                      // console.log(resp);
                      that.currentEntrustOrderList = resp;
                    }
                  });
                }
              }
            );
            // 钱包 (暂时没用上)
            // client.subscribe("funds-wallet/" + that.member.id, function(
            //   err,
            //   message
            // ) {
            //   if (!err) {
            //     // 向服务端发送 contract/contract-pageinfo 主题消息
            //     client.on("message", (topic, message) => {
            //       let parts = topic.split("/");
            //       let firstPart = parts.shift();
            //       if (firstPart == "funds-wallet") {
            //         var resp = JSON.parse(message);
            //         that.getUsdt = resp.USDT;
            //       }
            //     });
            //   }
            // });
          }
          //订阅价格变化消息
          client.subscribe("contract-thumb/#", function(err, message) {
            if (!err) {
              client.on("message", (topic, message) => {
                let parts = topic.split("/");
                let firstPart = parts.shift();
                if (firstPart == "contract-thumb") {
                  var resp = JSON.parse(message);
                  var coin = that.getCoin(resp.symbol);
                  if (coin != null) {
                    coin.price = resp.close;
                    coin.rose =
                      resp.chg > 0
                        ? "+" + resp.chg.toFixed(2) + "%"
                        : resp.chg.toFixed(2) + "%";
                    coin.close = resp.close;
                    coin.high = resp.high;
                    coin.low = resp.low;
                    coin.turnover = parseInt(resp.volume);
                    coin.volume = resp.volume;
                    coin.usdRate = resp.usdRate;
                    coin.change = resp.change;
                  }
                }
              });
            } else {
              console.log("订阅失败");
            }
          });
          //订阅实时成交信息
          client.subscribe(
            "contract-trade-pc/" + that.currentCoin.symbol.replace("/", "-"),
            function(err, message) {
              if (!err) {
                client.on("message", (topic, message) => {
                  let parts = topic.split("/");
                  let firstPart = parts.shift();
                  if (firstPart == "contract-trade-pc") {
                    var resp = JSON.parse(message.toString());
                    var allList = [];
                    for (var i = 0; i < resp.length; i++) {
                      allList.push(resp[i]);
                    }
                    if (allList.length > 0) {
                      for (var j = 0; j < allList.length; j++) {
                        that.trade.rows.unshift(allList[j]);
                      }
                    }
                    if (that.trade.rows.length > 30) {
                      that.trade.rows = that.trade.rows.slice(0, 30);
                    }
                  }
                });
              }
            }
          );
        })
        .catch((error) => {
          console.error("Failed to initialize MQTT:", error);
        });
    },
    // 合约精度
    getCoinAllList() {
      this.$http.get(this.host + this.api.swap.coinAll, {}).then((res) => {
        this.coinAllList = res.body.data;
        let allList = this.getSymboyAccuracy(
          this.coinAllList,
          this.currentCoin.symbol
        );
        this.select_type = allList.split(",");
      });
    },
    // 判断权限
    getAuto() {
      this.$http
        .post(this.host + this.api.login.configQuery, {})
        .then((res) => {
          this.v_auto = res.body.data[0];
          this.v_auto.forEach((item) => {
            if (item.alia == "IS_merge") {
              this.openMerge = item.val;
            }
          });
        });
    },
    // 信息图表切换
    changeKlineTabs(num) {
      this.KlineTabs = num;
    },
    // 收益
    getIncome(item) {
      var price = this.currentCoin.price;
      if (item.direction === "BUY") {
        return this.buyIncome(
          price,
          item.tradedPrice,
          item.shareNumber,
          item.volume
        );
      } else {
        return this.sellIncome(
          price,
          item.tradedPrice,
          item.shareNumber,
          item.volume
        );
      }
    },
    //
    link_to(url) {
      if (url) {
        this.$router.push(url);
      } else {
        this.$Message.error(this.$t("common.expect"));
      }
    },
  },
  beforeDestroy() {
    //断开连接
    this.$mqttService.disconnect();
  },
};
</script>
<style lang="less">
.tabBar {
  a {
    color: #03c59e;
  }

  .ivu-tabs-nav-scroll {
    padding-left: 12px;
  }

  .ivu-tabs-nav .ivu-tabs-tab-active {
    color: #efa70b;
  }

  .ivu-tabs-ink-bar {
    background-color: #efa70b;
  }

  .exchange .symbol .item .coin {
    font-size: 12px;
  }

  .trade_bd {
    padding: 0 15px;
  }

  .trade_menu {
    margin-left: 10px;
  }

  .ivu-tooltip-content {
    position: absolute;
    left: 12px;
    top: -20px;
  }

  // .trade_wrap .ivu-form-item-content input {
  //   padding-left: 25px;
  // }

  .imgtable .handler {
    margin-left: 10px;
  }
  .imgtable .mflag {
    z-index: 100;
  }
  .item {
    .price-cny {
      font-weight: 700;
      font-size: 9px;
      color: rgba(0, 0, 0, 0.87);
    }

    .coin {
      font-size: 14px !important;
    }
  }
}
</style>
<style scoped lang="less">
@import "../../assets/css/swap.css";
.swap {
  color: #161616;
  background-color: #f8f8f8;

  .main {
    width: 100%;
    margin: 0 auto;
    padding-top: 50px;
    .all_content {
      width: 85%;
      .Kline_part {
        width: 100%;
        display: flex;
        margin-top: 2px;
        .top {
          border-radius: 5px;
          height: 636px;
          display: flex;
          width: 83% !important;
          .Kline_content {
            width: 100%;
            .box_kline {
              height: 130px;
              background-color: #fff;
              border-bottom: 1px solid #f8f8f8;
              .kline_tabs {
                height: 32px;
                border-top: 2px solid #f5f5f5;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .kline_tabs_left {
                  padding: 0 18px;
                  display: flex;
                  align-items: center;
                  .tab {
                    font-family: Source Han Sans, Source Han Sans;
                    font-weight: 700;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.54);
                    margin-right: 26px;
                    height: 25px;
                    line-height: 17px;
                    cursor: pointer;
                  }
                  .tabActive {
                    font-weight: 700;
                    font-size: 12px;
                    color: #03c59e;
                    line-height: 17px;
                    margin-right: 26px;
                    height: 23px;
                    border-bottom: 2px solid #03c59e;
                    cursor: pointer;
                  }
                }
                .handler {
                  width: 120px;
                  height: 30px;
                  line-height: 30px;
                  border-radius: 3px;
                  padding: 0 5px;
                  margin-right: 20px;
                  z-index: 10;
                  > span {
                    color: #000000;
                    padding: 4px 8px;
                    cursor: pointer;
                    font-size: 13px;
                    opacity: 0.5;
                    &.active {
                      opacity: 1;
                      border-radius: 3px;
                    }
                  }
                }
              }
            }
            .imgtable {
              position: relative;
              overflow: hidden;
              background-color: #fff;
              .kline_logo {
                width: 200px;
                height: 50px;
                position: absolute;
                bottom: 100px;
                left: 50px;
                z-index: 9999;
                pointer-events: none;
              }
            }
            .trade_wrap {
              .trade_menu {
                position: relative;
                background-color: #ffffff;
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
                border-bottom: 1px solid #27313e;
                font-size: 0;
                height: 40px;
                line-height: 40px;

                > span {
                  font-size: 16px;
                  padding: 11px 20px;
                  cursor: pointer;

                  &.active {
                    color: #1b1a1a;
                    border-bottom: 2px solid #03c59e;
                  }

                  &:first-child {
                    border-top-left-radius: 0px;
                  }
                }

                .fee-wrap {
                  position: absolute;
                  top: 0;
                  right: 20px;
                  font-size: 12px;
                  > span {
                    margin-right: 10px;
                    color: #7c7f82;
                  }
                  > a {
                    vertical-align: middle;
                  }
                }
              }
              .trade_panel {
                position: relative;
                .mask {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  background-color: rgb(255, 255, 255);
                  justify-content: center;
                  align-items: center;
                  z-index: 100;
                  font-size: 24px;
                  border-radius: 0px;
                }
                .publish-mask {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  background-color: rgb(255, 255, 255);
                  justify-content: center;
                  align-items: center;
                  z-index: 101;
                  font-size: 24px;
                  border-radius: 0px;
                }
              }
              .trade_panel .panel .hd {
                border-bottom: none;
                b {
                  color: #707070;
                }
                a {
                  color: #03c59e;
                }
              }
            }
          }
        }
        .bottom {
          width: 68%;
        }
      }
    }
    .m_l5 {
      margin-left: 4px;
    }
    .m_t5 {
      margin-top: 3px;
    }
    .center {
      width: 324px;
      margin-right: 5px;
      border-radius: 0px;
      overflow: hidden;
      .plateAllTitle {
        background-color: #fff;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
        border-bottom: 1px solid #f0f0f0;
      }
    }
    .right {
      width: 20%;
      border-radius: 0px;
      overflow: hidden;
      .handlers {
        font-size: 0;
        padding: 10px 20px;
        background-color: #ffffff;
        border-top-left-radius: 0px;
        border-top-right-radius: 0px;
      }
      .plate-nowprice {
        text-align: center;
        background-color: #ffffff;
        line-height: 1;
        display: flex;
        align-items: center;
        height: 40px;
        justify-content: center;
        font-size: 14px;
        font-weight: 500;
        .price {
          font-size: 18px;
          margin-right: 10px;
        }
        .price-cny {
          font-size: 12px;
          margin-left: 10px;
          font-weight: 400;
          color: rgb(126, 126, 126);
        }
      }
    }
  }
}

.exchange.day {
  color: #333;
  background-color: #fff;

  .main {
    .left {
      background-color: #fff;
      box-shadow: 0 0 2px #ccc;

      .handlers {
        background-color: #fff;
      }

      .plate-nowprice {
        background-color: #fff;
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
      }
    }

    .imgtable {
      background-color: #fff;
      border-radius: 6px;
      box-shadow: 0 0 2px #ccc;

      .handler {
        > span {
          border: 1px solid #333;
        }
      }
    }

    .trade_wrap {
      box-shadow: 0 0 2px #ccc;

      .trade_menu {
        background-color: #fafafa;

        > span {
          background-color: #fafafa;
          border-right: 1px solid #f0f0f0;

          &.active {
            background-color: #fff;
            color: #03c59e;
          }

          &:last-child {
            border-top-right-radius: 6px;
          }
        }

        .ivu-icon {
          color: #333 !important;
        }
      }

      .trade_panel {
        box-shadow: 0 0 2px #ccc;

        .mask {
          background-color: rgba(0, 52, 77, 0.8);
          color: #fff;
        }
      }

      .trade_panel .panel .hd {
        border-bottom: none;

        b {
          color: #333;
        }

        a {
          color: #03c59e;
        }
      }
    }
  }

  .order {
    box-shadow: 0 2px 2px #ccc;
    min-height: 227px;
    position: relative;

    .order-handler {
      background-color: #fff;
      z-index: 9;
      > span {
        color: rgba(0, 0, 0, 0.54);
        background-color: #fafafa;
        box-shadow: 0 0 2px #ccc;

        &.active {
          color: #03c59e;
          background-color: #fff;
        }
      }
    }
  }
}

#kline_container {
  background: #fff;
}

.coin-info {
  color: #8f9ca5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  padding-top: 15px;
}

.mask_phone {
  background: rgba(0, 52, 77, 0.8);
  height: 344px;
  width: 100%;
  line-height: 344px;
  text-align: center;
  position: absolute;
  top: 0;
  font-size: 20px;
  margin: 0 auto;
  z-index: 99;
}
.modalFormItemRight {
  width: 100%;
  text-align: right;
}
.open_btn {
  width: 48%;
}
.btn_two {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  .btn_two_price {
    font-weight: 400;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.87);
    line-height: 25px;
    text-align: center;
    width: 75px;
    height: 25px;
    border-radius: 5px 5px 5px 5px;
    border: 1px solid #f2f2f2;
    margin-right: 14px;
  }
}
.tabs_group {
  width: 286px;
  height: 27px;
  border-radius: 5px 5px 5px 5px;
  border: 1px solid #e9e8e8;
  display: flex;
  align-items: center;
  cursor: pointer;
  .tabs_group_btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 143px;
    font-weight: 400;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.87);
  }
  .tabActive {
    width: 143px;
    height: 27px;
    background: #e9e8e8;
    border-radius: 5px 5px 5px 5px;
  }
}
.entrustOrderTabs {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 9px;
  color: rgba(0, 0, 0, 0.54);
  margin-top: 11px;
  .tab {
    font-family: Source Han Sans, Source Han Sans;
    font-weight: 700;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.54);
    height: 25px;
    line-height: 17px;
    cursor: pointer;
  }
  .tabActive {
    font-weight: 700;
    font-size: 12px;
    color: #03c59e;
    line-height: 17px;
    height: 23px;
    border-bottom: 2px solid #03c59e;
    cursor: pointer;
  }
}
.m_t20 {
  margin-top: 20px;
}
.getUsdt_list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
  .getUsdt_list_left {
    display: flex;
    align-items: center;
    .left_title {
      font-weight: 400;
      font-size: 11px;
      color: rgba(0, 0, 0, 0.87);
      margin-right: 5px;
    }
    .routlink {
      font-weight: 400;
      font-size: 11px;
      color: #009dff;
    }
  }
}
.btnBuy {
  margin-top: 30px;
}
.account-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.54);
  color: rgba(85, 85, 85, 1);
  span {
    font-weight: 400;
    font-size: 11px;
    color: rgba(0, 0, 0, 0.87);
  }
}
.login_register {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
}
.login_btn {
  width: 220px;
  height: 40px;
  background-color: #03c59e;
  color: #fff;
  text-align: center;
  line-height: 40px;
  margin: 0 auto;
  border-radius: 20px;
  cursor: pointer;
}
.register_btn {
  height: 40px;
  color: #03c59e;
  text-align: center;
  line-height: 40px;
  margin: 20px auto;
  cursor: pointer;
}
.btn_all {
  background-color: #fff;
  color: #03c59e;
  position: absolute;
  top: 40px;
  left: 20px;
}
.input_volume {
  width: 296px;
  height: 30px;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #e2e1e1;
  text-indent: 5px;
}
.input_volume::placeholder {
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
}
.red {
  color: #f6465d;
}
.green {
  color: #03c59e;
}
.container {
  display: flex;
}
/deep/.ivu-table-header {
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54) !important;
}

/deep/.ivu-table {
  font-weight: 700;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.87);
}
.smallLine {
  background-color: #fff;
  position: sticky;
  bottom: 0;
  left: 0;
}
.DropdownUnit {
  margin-bottom: 10px;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.87);
}
.cp {
  cursor: pointer;
}
.cn {
  cursor: not-allowed;
}
/deep/.ivu-form .ivu-form-item-label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-weight: 400;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.87);
  line-height: 1;
  padding: 0px 12px 10px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
/deep/ .ivu-slider-wrap {
  height: 4px;
}
/deep/ .ivu-slider-stop {
  width: 4px;
  height: 4px;
  background: #f8f8f8;
  // border: 1px solid #e3e3e3;
  position: absolute;
  color: #fa5252;
}
.swapUnitstyle {
  position: absolute;
  top: 0px;
  right: 10px;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
}
.triggerPriceStyle {
  position: absolute;
  top: 22px;
  right: 10px;
  cursor: pointer;
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
}
.silder_openNumber {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  margin-bottom: 11px;
  font-weight: 400;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.87);
  padding-bottom: 16px;
  border-bottom: 1px solid #f6f6f6;
}
.row_list {
  margin-top: 12px;
  .row_one {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.87);
  }
}
.limit_price_title {
  font-weight: 400;
  font-size: 11px;
  color: rgba(0, 0, 0, 0.87);
  margin-bottom: 10px;
}
.limit_price_style {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .limit_price_left {
    .limit_price_input {
      width: 220px;
      height: 30px;
      border-radius: 2px 2px 2px 2px;
      border: 1px solid #e2e1e1;
      text-indent: 5px;
    }
  }

  .good_num {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 28px;
    border-radius: 2px 2px 2px 2px;
    border: 1px solid #e2e1e1;
    font-weight: 400;
    font-size: 12px;
    color: #1e1e1e;
    cursor: pointer;
  }
}

.open-close {
  width: 324px;
  height: 636px;
  overflow-y: auto;
  padding: 0px 15px 0 13px;
  background-color: #fff;
}
.open-close::-webkit-scrollbar {
  display: none;
}
.open_bottom {
  margin-top: 2px;
  height: 532px;
  width: 324px;
  overflow-y: auto;
  // padding: 0px 15px 0 13px;
  background-color: #fff;
  .open_bottom_title {
    height: 40px;
    line-height: 40px;
    font-weight: 500;
    font-size: 12px;
    color: rgba(0, 0, 0, 0.87);
    border: 1px solid #f6f6f6;
    text-indent: 13px;
  }
  .open_bottom_center {
    padding: 10px 15px 24px 13px;
    border-bottom: 1px solid #f6f6f6;
    .bottom_center_title {
      font-weight: 400;
      font-size: 11px;
      color: rgba(0, 0, 0, 0.87);
    }
    .bottom_center_row {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 400;
      font-size: 11px;
      color: rgba(0, 0, 0, 0.54);
    }
    .bottom_center_row1 {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 400;
      font-size: 11px;
      color: #757575;
      .bottom_row1_btn {
        width: 63px;
        height: 27px;
        background: #e9e8e8;
        border-radius: 5px 5px 5px 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }
}
.open_bottom::-webkit-scrollbar {
  display: none;
}
</style>
