<template>
  <div class="container exchange" :class="skin" style="padding-top: 50px">
    <div class="main_top">
      <div class="symbol">
        <div @click="currentCoinFavorChange">
          <Icon
            v-if="currentCoinIsFavor"
            type="ios-star"
            color="#C0C0C0"
            size="24"
          />
          <Icon v-else type="ios-star-outline" color="#C0C0C0" size="24" />
        </div>
        <div class="item" @click="show_list()" style="cursor: pointer">
          <span class="coin"
            >{{ currentCoin.coin }}/{{ currentCoin.base }}</span
          >
          <Poptip
            trigger="hover"
            :title="coinInfo.name"
            content="content"
            placement="bottom-start"
            word-wrap
            width="300"
          >
            <Icon
              type="md-arrow-dropup"
              color="#3D3D3D"
              size="24"
              v-if="list_show"
            />
            <Icon type="md-arrow-dropdown" color="#3D3D3D" size="24" v-else />
            <Icon
              type="md-information-circle"
              style="color: #546886; margin-left: 5px"
            />
            <div class="api" slot="content">
              <div class="coin-info">{{ coinInfo.information }}</div>
              <p style="text-align: right; margin-top: -10px">
                <a :href="coinInfo.infolink" target="_blank">{{
                  $t("exchange.moredetail")
                }}</a>
              </p>
            </div>
          </Poptip>
        </div>
        <div style="height: 40px; border-right: 1px solid #EEEEEE"></div>
        <div class="item">
          <span style="font-size: 18px;font-weight: 700;" class="num">{{
            currentCoin.close | toFixed(baseCoinScale)
          }}</span>
        </div>
        <div class="item">
          <span class="text">{{ $t("carouselItem.text12") }}</span>
          <span class="price-cny"
            >≈ {{ pricingStatus
            }}{{ (currentCoin.close * CNYRate) | toFixed(2) }}</span
          >
        </div>
        <div class="item">
          <span class="text">{{ $t("service.Change") }}</span>
          <span
            class="num"
            :class="{
              buy: currentCoin.change > 0,
              sell: currentCoin.change < 0,
            }"
            >{{ currentCoin.rose }}</span
          >
        </div>
        <div class="item">
          <span class="text">{{ $t("service.high") }}</span>
          <span class="num">{{
            currentCoin.high | toFixed(baseCoinScale)
          }}</span>
        </div>
        <div class="item">
          <span class="text">{{ $t("service.low") }}</span>
          <span class="num">{{
            currentCoin.low | toFixed(baseCoinScale)
          }}</span>
        </div>
        <div class="item">
          <span class="text">{{ $t("service.ExchangeNum") }}</span>
          <span class="num"
            >{{ currentCoin.volume }} {{ currentCoin.coin }}</span
          >
        </div>
      </div>
      <!-- 中心K线图 -->
      <div style="display: flex; width: 100%">
        <div class="all_content">
          <div class="Kline_part">
            <div class="top">
              <!-- 切换深度图 -->
              <div class="center">
                <div class="box_kline">
                  <headCoin
                    :currentPageName="currentCoin.symbol"
                    @linkTo="linkTo"
                    :dynamic_height="dynamic_height"
                  />
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
                <!-- <div class="box_kline">
                  <div class="box_kline_title">{{ currentCoin.symbol }}</div>
                  <div class="handler">
                    <span
                      @click="changeImgTable('k')"
                      :class="{ active: currentImgTable === 'k' }"
                      >{{ $t("exchange.kline") }}</span
                    >
                    <span
                      @click="changeImgTable('s')"
                      :class="{ active: currentImgTable === 's' }"
                      >{{ $t("exchange.depth") }}</span
                    >
                  </div>
                </div> -->
                <div class="imgtable" style="height: 594px">
                  <div
                    id="kline_container"
                    :class="{ hidden: currentImgTable === 's' }"
                  ></div>
                  <DepthGraph
                    :class="{ hidden: currentImgTable === 'k' }"
                    ref="depthGraph"
                  ></DepthGraph>
                </div>
              </div>
              <!-- 左侧交易对 -->
              <div class="left" v-show="list_show">
                <div class="coin-menu">
                  <div style="padding: 8px 10px; height: 48px">
                    <Input
                      search
                      :placeholder="$t('common.searchplaceholder')"
                      @on-change="seachInputChange"
                      v-model="searchKey"
                    />
                  </div>
                  <Tabs value="usdt" type="card" @on-click="changeBaseCion">
                    <TabPane :label="$t('service.CUSTOM')" name="favor">
                      <Table
                        @on-current-change="gohref"
                        highlight-row
                        :columns="coins.columns"
                        :data="dataIndex"
                        :no-data-text="$t('common.nodata')"
                      ></Table>
                    </TabPane>
                    <TabPane label="USDT" name="usdt">
                      <Table
                        @on-current-change="gohref"
                        highlight-row
                        :columns="coins.columns"
                        :data="dataIndex"
                        :no-data-text="$t('common.nodata')"
                      ></Table>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
            <!-- 盘口+最新交易-->
            <div class="tabs-container">
              <div
                class="center_right plate-wrap"
                style="position: relative; height: 636px; margin-left: 4px"
              >
                <div class="plateAllTitle">
                  订单簿
                </div>
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
                <div class="plateAllTitle">
                  {{ $t("swap.latestdeal") }}
                </div>
                <tradeAll
                  :dataList="trade.rows"
                  :baseTitle="currentCoin"
                ></tradeAll>
              </div>
            </div>
          </div>
          <!-- 最下面的数据 -->
          <div class="order" style="margin-top: 4px;">
            <div class="order-handler">
              <span
                @click="changeOrder('current')"
                :class="{ active: selectedOrder === 'current' }"
                >{{ $t("exchange.curdelegation") }}</span
              >
              <span
                @click="changeOrder('planLimit')"
                :class="{ active: selectedOrder === 'planLimit' }"
                >{{ $t("carouselItem.text17") }}</span
              >
              <span
                @click="changeOrder('history')"
                :class="{ active: selectedOrder === 'history' }"
                >{{ $t("exchange.hisdelegation") }}</span
              >
              <router-link
                v-show="selectedOrder === 'current'"
                class="linkmore"
                to="/orders/spot/open"
                >{{ $t("common.more") }}</router-link
              >
              <router-link
                v-show="selectedOrder === 'history'"
                class="linkmore"
                to="/orders/spot/close"
                >{{ $t("common.more") }}</router-link
              >
            </div>
            <div class="table">
              <Table
                height="500"
                v-if="selectedOrder === 'current'"
                :columns="currentOrder.columns"
                :data="currentOrder.rows"
                :no-data-text="$t('common.nodata')"
              ></Table>
              <Table
                height="500"
                v-if="selectedOrder === 'planLimit'"
                :columns="currentOrder.columns1"
                :data="sportList"
                :no-data-text="$t('common.nodata')"
              ></Table>
              <Table
                height="500"
                v-if="selectedOrder === 'history'"
                :columns="historyOrder.columns"
                :no-data-text="$t('common.nodata')"
                :data="historyOrder.rows"
              ></Table>
            </div>
            <div
              v-if="
                (selectedOrder == 'history' || selectedOrder == 'current') &&
                  total > 10
              "
              style="text-align: center; width: 100%; padding:0 0 20px;background-color: #fff;"
            >
              <Page
                class="pages"
                :total="total"
                :current="pageNo"
                :page-size="pageSize"
                @on-change="pageChange"
              />
            </div>
          </div>
        </div>
        <div
          class="main_bottom"
          style="
            width: 330px;
            overflow: hidden;
            background-color: #fff;
          "
        >
          <!-- 委托记录 历史记录 -->
          <!-- 交易区 -->
          <div class="trade_wrap">
            <div class="trade_panel trade_panel_logout">
              <!-- 标题 -->
              <div class="trade_menu_title">
                {{ $t("new.universal.spotTrading") }}
              </div>
              <!-- 买入卖出切换 -->
              <div class="btn_sellBuy">
                <div
                  @click="change_color(false)"
                  :class="[
                    btn_show == false ? 'sellBuy_btn_green' : 'sellBuy_btn',
                  ]"
                >
                  {{ $t("exchange.buy") }}
                </div>
                <div
                  @click="change_color(true)"
                  :class="[
                    btn_show == true ? 'sellBuy_btn_red' : 'sellBuy_btn',
                  ]"
                >
                  {{ $t("exchange.sell") }}
                </div>
              </div>
              <!-- 市价 限价 -->
              <div class="trade_menu">
                <span
                  style="margin-left: 20px; cursor: pointer"
                  @click="market_price('MARKET_PRICE')"
                  :class="{ active: showMarket == 'MARKET_PRICE' }"
                  >{{ $t("exchange.market_price") }}</span
                >
                <span
                  style="cursor: pointer; margin-left: 12px"
                  @click="market_price('LIMIT_PRICE')"
                  :class="{ active: showMarket == 'LIMIT_PRICE' }"
                  >{{ $t("exchange.limited_price") }}</span
                >
                <span
                  style="margin-left: 20px; cursor: pointer"
                  @click="market_price('SPOT_LIMIT')"
                  :class="{ active: showMarket == 'SPOT_LIMIT' }"
                  >{{ $t("carouselItem.text17") }}</span
                >
              </div>
              <div class="trade_bd">
                <div class="panel panel_buy" v-show="btn_show == false">
                  <div
                    class="bd bd_limited"
                    v-show="showMarket == 'LIMIT_PRICE'"
                  >
                    <Form ref="formValidate">
                      <FormItem style="margin-top: 20px">
                        <label class="before">{{
                          $t("exchange.buyprice")
                        }}</label>
                        <Input
                          @on-keyup="keyEvent"
                          v-model="form.buy.limitPrice"
                          :placeholder="$t('exchange.buyprice')"
                          style="border-radius: 10px;"
                        ></Input>
                        <label class="after">{{ currentCoin.base }}</label>
                      </FormItem>
                      <FormItem>
                        <label class="before">{{
                          $t("exchange.buynum")
                        }}</label>
                        <Input
                          @on-keyup="keyEvent"
                          v-model="form.buy.limitAmount"
                          :placeholder="$t('exchange.buynum')"
                        ></Input>
                        <label class="after">{{ currentCoin.coin }}</label>
                      </FormItem>
                      <div class="slider-wrap">
                        <Slider
                          class="silder-buy"
                          v-model="sliderBuyLimitPercent"
                          :step="25"
                          show-tip="never"
                          :disabled="sliderBuyDisabled"
                          :marks="marks"
                        ></Slider>
                      </div>
                      <div class="total sell_total">
                        <div>
                          {{ $t("exchange.amount") }}
                          <span style="margin-left: 20px;">{{
                            form.buy.limitTurnover | toFloor(baseCoinScale)
                          }}</span>
                        </div>
                        <div>
                          {{ currentCoin.base }}
                        </div>
                      </div>
                      <div v-if="isLogin" class="hd hd_login">
                        <div>{{ $t("exchange.canuse") }}</div>
                        <div>
                          <!-- 幣種 -->
                          <span>{{ currentCoin.base }}</span>
                          <!-- 可用金額USDT -->
                          <span>{{
                            walletNew.usdtBalance | toFloor(baseCoinScale)
                          }}</span>
                        </div>
                      </div>
                      <div class="hd" v-else></div>
                      <div v-if="isLogin">
                        <Button
                          v-if="exchangeable == 1"
                          class="bg-green"
                          @click="buyWithLimitPrice"
                          >{{ $t("exchange.buyin") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                        <Button v-else class="bg-gray"
                          >{{ $t("exchange.buyin") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                      </div>
                    </Form>
                  </div>
                  <div
                    class="bd bd_market"
                    v-show="showMarket == 'MARKET_PRICE'"
                  >
                    <Form ref="formValidate">
                      <FormItem style="margin-top: 20px">
                        <label class="before">{{
                          $t("exchange.buyprice")
                        }}</label>
                        <Input
                          disabled
                          :placeholder="$t('exchange.buytip')"
                        ></Input>
                      </FormItem>
                      <FormItem>
                        <label class="before">{{
                          $t("exchange.amount")
                        }}</label>
                        <Input
                          @on-keyup="keyEvent"
                          v-model="form.buy.marketAmount"
                          :placeholder="$t('exchange.amount')"
                        ></Input>
                        <label class="after">USDT</label>
                      </FormItem>
                      <div class="slider-wrap">
                        <Slider
                          class="silder-buy"
                          v-model="sliderBuyMarketPercent"
                          :step="25"
                          show-tip="never"
                          :disabled="sliderBuyDisabled"
                          :marks="marks"
                        ></Slider>
                      </div>
                      <div v-if="isLogin" class="hd hd_login">
                        <div>{{ $t("exchange.canuse") }}</div>
                        <div>
                          <!-- 幣種 -->
                          <span>{{ currentCoin.base }}</span>
                          <!-- 可用金額USDT -->
                          <span>{{
                            walletNew.usdtBalance | toFloor(baseCoinScale)
                          }}</span>
                        </div>
                      </div>
                      <div class="hd" v-else></div>
                      <div v-if="isLogin">
                        <Button
                          v-if="enableMarketBuy == 1 && exchangeable == 1"
                          class="bg-green"
                          @click="buyWithMarketPrice"
                          >{{ $t("exchange.buyin") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                        <Button v-else class="bg-gray"
                          >{{ $t("exchange.buyin") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                      </div>
                    </Form>
                  </div>
                  <div class="bd bd_market" v-show="showMarket == 'SPOT_LIMIT'">
                    <Form ref="formValidate">
                      <FormItem style="margin-top: 20px">
                        <label class="before">{{
                          $t("swap.triggleprice")
                        }}</label>
                        <Input
                          v-model="form.buy.limitTurnovers"
                          :placeholder="$t('swap.triggleprice')"
                        ></Input>
                      </FormItem>
                      <FormItem style="margin-top: 20px">
                        <label class="before" style="z-index: 99">{{
                          $t("exchange.buyprice")
                        }}</label>
                        <Input
                          v-model="form.buy.limitPrice"
                          type="text"
                          :disabled="spotPriceType === 'MARKET_SPOT_PRICE'"
                          :placeholder="
                            spotPriceType === 'MARKET_SPOT_PRICE'
                              ? $t('carouselItem.text252')
                              : ''
                          "
                        >
                        </Input>
                        <label class="after" style="z-index: 99">
                          <Select
                            v-model="spotPriceType"
                            @on-change="handleSpotPrice"
                            style="width: 70px;"
                          >
                            <Option value="LIMIT_SPOT_PRICE">{{
                              $t("carouselItem.text19")
                            }}</Option>
                            <Option value="MARKET_SPOT_PRICE">{{
                              $t("carouselItem.text20")
                            }}</Option>
                          </Select>
                        </label>
                      </FormItem>
                      <FormItem>
                        <label class="before">{{
                          spotPriceType === "MARKET_SPOT_PRICE"
                            ? $t("exchange.amount")
                            : $t("exchange.buynum")
                        }}</label>
                        <Input
                          v-model="form.buy.marketAmount"
                          :placeholder="
                            spotPriceType === 'MARKET_SPOT_PRICE'
                              ? $t('exchange.amount')
                              : $t('exchange.buynum')
                          "
                        ></Input>
                        <label
                          v-if="spotPriceType === 'MARKET_SPOT_PRICE'"
                          class="after"
                          >{{ currentCoin.base }}</label
                        >
                        <label v-else class="after">{{
                          currentCoin.coin
                        }}</label>
                      </FormItem>
                      <div v-if="isLogin" class="hd hd_login">
                        <div>{{ $t("exchange.canuse") }}</div>
                        <div>
                          <span>{{ currentCoin.base }}</span>
                          <span>{{
                            walletNew.usdtBalance | toFloor(baseCoinScale)
                          }}</span>
                        </div>
                      </div>
                      <div class="hd" v-else></div>
                      <div v-if="isLogin">
                        <Button
                          v-if="enableMarketBuy == 1 && exchangeable == 1"
                          class="bg-green"
                          @click="buyWithSportPrice"
                          >{{ $t("exchange.buyin") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                        <Button v-else class="bg-gray"
                          >{{ $t("exchange.buyin") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                      </div>
                    </Form>
                  </div>
                </div>
                <div class="panel panel_sell" v-show="btn_show == true">
                  <div
                    class="bd bd_limited"
                    v-show="showMarket == 'LIMIT_PRICE'"
                  >
                    <Form ref="formValidate">
                      <FormItem style="margin-top: 20px">
                        <label class="before">{{
                          $t("exchange.buyprice")
                        }}</label>
                        <Input
                          @on-keyup="keyEvent"
                          v-model="form.sell.limitPrice"
                          :placeholder="$t('exchange.sellprice')"
                        ></Input>
                        <label class="after">{{ currentCoin.base }}</label>
                      </FormItem>
                      <FormItem>
                        <label class="before">{{
                          $t("exchange.buynum")
                        }}</label>
                        <Input
                          @on-keyup="keyEvent"
                          v-model="form.sell.limitAmount"
                          :placeholder="$t('exchange.sellnum')"
                        ></Input>
                        <label class="after">{{ currentCoin.coin }}</label>
                      </FormItem>
                      <div class="slider-wrap">
                        <Slider
                          class="silder-sell"
                          v-model="sliderSellLimitPercent"
                          :step="25"
                          show-tip="never"
                          :disabled="sliderSellDisabled"
                          :marks="marks"
                        ></Slider>
                        <!-- <div
                          class="slider-stop"
                          v-for="item in sliderStep"
                          :style="'left: ' + item + '%;'"
                          @click="silderGo('sliderSellLimitPercent', item)"
                          :key="item.id"
                        >
                          <div class="slider-block"></div>
                        </div> -->
                      </div>
                      <div class="total sell_total">
                        <div>
                          {{ $t("exchange.amount") }}
                          <span style="margin-left: 20px">{{
                            form.sell.limitTurnover | toFloor(coinScale)
                          }}</span>
                        </div>
                        <div>
                          {{ currentCoin.base }}
                        </div>
                      </div>
                      <div v-if="isLogin" class="hd hd_login">
                        <div>{{ $t("exchange.canuse") }}</div>
                        <div>
                          <span>{{ currentCoin.coin }}</span>
                          <span>{{
                            walletNew.mvUseBalance | toFloor(coinScale)
                          }}</span>
                        </div>
                      </div>
                      <div class="hd" v-else></div>
                      <div v-if="isLogin">
                        <Button
                          v-if="exchangeable == 1"
                          class="bg-red"
                          @click="sellLimitPrice"
                          >{{ $t("exchange.sellout") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                        <Button v-else class="bg-gray"
                          >{{ $t("exchange.sellout") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                      </div>
                    </Form>
                  </div>
                  <div
                    class="bd bd_market"
                    v-show="showMarket == 'MARKET_PRICE'"
                  >
                    <Form ref="formValidate">
                      <FormItem style="margin-top: 20px">
                        <label class="before">{{
                          $t("exchange.buyprice")
                        }}</label>
                        <Input
                          disabled
                          :placeholder="$t('exchange.selltip')"
                        ></Input>
                      </FormItem>
                      <FormItem>
                        <label class="before">{{
                          $t("exchange.buynum")
                        }}</label>
                        <Input
                          @on-keyup="keyEvent"
                          v-model="form.sell.marketAmount"
                          :placeholder="$t('exchange.sellnum')"
                        ></Input>
                        <label class="after">{{ currentCoin.coin }}</label>
                      </FormItem>
                      <div class="slider-wrap">
                        <Slider
                          class="silder-sell"
                          v-model="sliderSellMarketPercent"
                          :step="25"
                          show-tip="never"
                          :disabled="sliderSellDisabled"
                          :marks="marks"
                        ></Slider>
                      </div>
                      <div v-if="isLogin" class="hd hd_login">
                        <div>{{ $t("exchange.canuse") }}</div>
                        <div>
                          <span>{{ currentCoin.coin }}</span>
                          <span>{{
                            walletNew.mvUseBalance | toFloor(coinScale)
                          }}</span>
                        </div>
                      </div>
                      <div class="hd" v-else></div>
                      <div v-if="isLogin">
                        <Button
                          v-if="enableMarketSell == 1 && exchangeable == 1"
                          class="bg-red"
                          @click="sellMarketPrice"
                          >{{ $t("exchange.sellout") }} ({{
                            currentCoin.coin
                          }})</Button
                        >
                        <Button v-else class="bg-gray"
                          >{{ $t("exchange.sellout") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                      </div>
                    </Form>
                  </div>
                  <div class="bd bd_market" v-show="showMarket == 'SPOT_LIMIT'">
                    <Form ref="formValidate">
                      <FormItem style="margin-top: 20px">
                        <label class="before">{{
                          $t("swap.triggleprice")
                        }}</label>
                        <Input
                          v-model="form.sell.limitTurnovers"
                          :placeholder="$t('swap.triggleprice')"
                        ></Input>
                      </FormItem>
                      <FormItem style="margin-top: 20px">
                        <label class="before" style="z-index: 99">{{
                          $t("exchange.buyprice")
                        }}</label>
                        <Input
                          v-model="form.sell.limitPrice"
                          type="text"
                          :disabled="spotPriceType === 'MARKET_SPOT_PRICE'"
                          :placeholder="
                            spotPriceType === 'MARKET_SPOT_PRICE'
                              ? $t('carouselItem.text252')
                              : ''
                          "
                        >
                        </Input>
                        <label class="after" style="z-index: 99">
                          <Select
                            slot="append"
                            style="width: 70px"
                            v-model="spotPriceType"
                            @on-change="handleSpotPrice"
                          >
                            <Option value="LIMIT_SPOT_PRICE">{{
                              $t("carouselItem.text19")
                            }}</Option>
                            <Option value="MARKET_SPOT_PRICE">{{
                              $t("carouselItem.text20")
                            }}</Option>
                          </Select>
                        </label>
                      </FormItem>
                      <FormItem>
                        <label class="before">{{
                          $t("exchange.buynum")
                        }}</label>
                        <Input
                          v-model="form.sell.marketAmount"
                          :placeholder="$t('exchange.buynum')"
                        ></Input>
                        <label class="after">{{ currentCoin.coin }}</label>
                      </FormItem>
                      <div v-if="isLogin" class="hd hd_login">
                        <div>{{ $t("exchange.canuse") }}</div>
                        <div>
                          <span>{{ currentCoin.coin }}</span>
                          <span>{{
                            walletNew.mvUseBalance | toFloor(coinScale)
                          }}</span>
                        </div>
                      </div>
                      <div class="hd" v-else></div>
                      <div v-if="isLogin">
                        <Button
                          v-if="enableMarketSell == 1 && exchangeable == 1"
                          class="bg-red"
                          @click="sellSportPrice"
                          >{{ $t("exchange.sellout") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                        <Button v-else class="bg-gray"
                          >{{ $t("exchange.sellout") }}({{
                            currentCoin.coin
                          }})</Button
                        >
                      </div>
                    </Form>
                  </div>
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
            <div v-show="isLogin" class="my_coin">
              <div class="my_coin_row">
                <div class="my_coin_row_title">
                  {{ $t("exchange.balance") }}
                </div>
                <div>
                  <router-link
                    to="/finance/all"
                    style="color: #03C59E; font-size: 18px"
                    >{{ $t("new.finance.transfer") }}</router-link
                  >
                </div>
              </div>
              <div class="my_coin_row">
                <div>
                  <span style=" color: rgba(0, 0, 0, 0.54);">{{
                    currentCoin.coin
                  }}</span>
                  <!-- 可用金額其他 -->
                </div>
                <div>
                  <span style="color: rgba(0, 0, 0, 0.87);">{{
                    walletNew.mvUseBalance | toFloor(coinScale)
                  }}</span>
                  <!-- 充幣可用 -->
                  <router-link :to="rechargeCoinUrl" style="color: #03C59E">{{
                    $t("exchange.recharge")
                  }}</router-link>
                </div>
              </div>
              <div class="my_coin_row">
                <div>
                  <!-- 幣種 -->
                  <span style=" color: rgba(0, 0, 0, 0.54);">{{
                    currentCoin.base
                  }}</span>
                </div>
                <div>
                  <!-- 可用金額USDT -->
                  <span style="color: rgba(0, 0, 0, 0.87);">{{
                    walletNew.usdtBalance | toFloor(baseCoinScale)
                  }}</span>
                  <!-- 充幣可用 -->
                  <router-link :to="rechargeUSDTUrl" style="color: #03C59E">{{
                    $t("exchange.recharge")
                  }}</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="smallLine">
        <LineCarousel :tableList="lineCurrentCoin"></LineCarousel>
      </div>
    </div>
  </div>
</template>
<script>
import expandRow from "@components/exchange/expand.vue";
import Datafeeds from "@js/charting_library/datafeed/bitrade.js";
import LineCarousel from "@components/exchange/carousel3.vue";
import DepthGraph from "@components/exchange/DepthGraph.vue";
import $ from "@js/jquery.min.js";
import tradeAll from "../swap/component/tradeAll.vue";
import plateAll from "../swap/component/plateAll.vue";
import headCoin from "./component/head_coin.vue";
export default {
  components: {
    expandRow,
    DepthGraph,
    tradeAll,
    plateAll,
    LineCarousel,
    headCoin,
  },
  data() {
    let self = this;
    return {
      dynamic_height: 0,
      // 计价方式
      pricingStatus: localStorage.getItem("pricingStatus"),
      lineCurrentCoin: [],
      Mflag: false,
      sliderStep: [25, 50, 75, 100],
      sliderBuyLimitPercent: 0,
      sliderSellLimitPercent: 0,
      sliderBuyMarketPercent: 0,
      sliderSellMarketPercent: 0,
      memberRate: 0,
      xsShow: false, //手机显示
      // userRealVerified: false, //是否实名认证
      collecRequesting: false,
      currentCoinIsFavor: false,
      isUseBHB: false,
      skin: "day", //皮肤样式day&night
      currentImgTable: "k",
      selectedOrder: "current", //当前显示的委托记录
      selectedPlate: "all", //当前显示的买卖盘
      CNYRate: null,
      datafeed: null,
      defaultPath: "btc_usdt",
      basecion: "usdt",
      coinScale: 6,
      baseCoinScale: 6,
      symbolFee: 0.001,
      dataIndex: [],
      dataIndex2: [],
      searchKey: "",
      coinInfo: {},
      activeWidth: window.innerWidth,
      currentCoin: {
        base: "",
        coin: "",
        symbol: "",
      },
      enableMarketBuy: 1, // 0:禁用  1:启用
      enableMarketSell: 1,
      exchangeable: 1, // 0:可交易   1:不可交易
      publishType: "NONE",
      currentTime: 0,
      publishAmount: 0,
      publishPrice: 0,
      startTime: "2000-01-01 00:00:00",
      endTime: "2000-01-01 00:00:00",
      clearTime: "2000-01-01 00:00:00",
      // showPublish: false,
      // showCountDown: false,
      countDownBgColor:
        "linear-gradient(135deg, rgb(0 199 144 / 63%) 10%, rgb(18 33 41) 100%)",
      publishState: 0,
      //当前市场上的交易币种，按交易对分
      list_show: false,
      btn_show: false, //买入卖出区分
      tabs_nexts: 0,
      total: 0,
      pageNo: 1,
      pageSize: 10,
      select_type: [],
      marks: {
        0: " ",
        25: "",
        50: "",
        75: "",
        100: "",
      },
      favorColumns: [
        {
          title: this.$t("exchange.coin"),
          key: "coin",
          sortable: false,
          width: 80,
          className: "coin-menu-symbol",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  // color:"red",
                  type: params.row.isFavor ? "ios-star" : "ios-star-outline",
                },
                nativeOn: {
                  click: () => {
                    event.stopPropagation(); //阻止事件冒泡
                    if (this.isLogin) {
                      if (
                        event.currentTarget.className ==
                        "ivu-icon ivu-icon-ios-star"
                      ) {
                        this.cancelCollect(params.index, params.row);
                        event.currentTarget.className ==
                          "ivu-icon ivu-icon-ios-star-outline";
                      } else {
                        this.collect(params.index, params.row);
                        event.currentTarget.className =
                          "ivu-icon ivu-icon-ios-star";
                      }
                    } else {
                      this.$Message.warning(this.$t("common.logintip"));
                    }
                  },
                },
              }),
              h("span", params.row.symbol),
            ]);
          },
        },
        {
          title: this.$t("exchange.lastprice"),
          key: "close",
          sortable: true,
          sortMethod: function(a, b, type) {
            let a1 = parseFloat(a);
            let b1 = parseFloat(b);
            if (type == "asc") {
              return a1 - b1;
            } else {
              return b1 - a1;
            }
          },
        },
        {
          title: this.$t("exchange.daychange"),
          key: "rose",
          sortable: true,
          sortMethod: function(a, b, type) {
            let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
            let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
            if (type == "asc") {
              return a1 - b1;
            } else {
              return b1 - a1;
            }
          },
          render: (h, params) => {
            const row = params.row;
            const className = parseFloat(row.rose) < 0 ? "sell" : "buy";
            return h(
              "span",
              {
                attrs: {
                  class: className,
                },
              },
              row.rose
            );
          },
        },
      ],
      //当前市场上的交易币种，按交易对分
      coins: {
        _map: [],
        USDT: [],
        BTC: [],
        ETH: [],
        USDT2: [],
        BTC2: [],
        ETH2: [],
        favor: [],
        columns: [
          {
            title: this.$t("exchange.coin"),
            key: "coin",
            sortable: false,
            className: "coin-menu-symbol",
            render: (h, params) => {
              if (params.row.coin == "FLOW") {
                return h("div", [
                  h("Icon", {
                    props: {
                      // color:"red",
                      type: params.row.isFavor
                        ? "ios-star"
                        : "ios-star-outline",
                    },
                    nativeOn: {
                      click: () => {
                        event.stopPropagation(); //阻止事件冒泡
                        if (this.isLogin) {
                          if (
                            event.currentTarget.className ==
                            "ivu-icon ivu-icon-ios-star"
                          ) {
                            this.cancelCollect(params.index, params.row);
                            event.currentTarget.className ==
                              "ivu-icon ivu-icon-ios-star-outline";
                          } else {
                            this.collect(params.index, params.row);
                            event.currentTarget.className =
                              "ivu-icon ivu-icon-ios-star";
                          }
                        } else {
                          this.$Message.warning(this.$t("common.logintip"));
                        }
                      },
                    },
                  }),
                  h("span", params.row.coin),
                  h(
                    "Tooltip",
                    {
                      props: {
                        placement: "top-start",
                        content: "价格跟随演示，价格为BTC价格的0.92%",
                      },
                    },
                    [
                      h(
                        "span",
                        {
                          style: {
                            fontSize: "8px",
                            padding: "2px 2px 1px 2px",
                            color: "#FFF",
                            marginLeft: "5px",
                            background: "#F30",
                            borderRadius: "8px",
                            display: "inline-block",
                            height: "8px",
                            width: "8px",
                          },
                        },
                        ""
                      ),
                    ]
                  ),
                ]);
              } else if (params.row.coin == "FDC") {
                return h("div", [
                  h("Icon", {
                    props: {
                      // color:"red",
                      type: params.row.isFavor
                        ? "ios-star"
                        : "ios-star-outline",
                    },
                    nativeOn: {
                      click: () => {
                        event.stopPropagation(); //阻止事件冒泡
                        if (this.isLogin) {
                          if (
                            event.currentTarget.className ==
                            "ivu-icon ivu-icon-ios-star"
                          ) {
                            this.cancelCollect(params.index, params.row);
                            event.currentTarget.className ==
                              "ivu-icon ivu-icon-ios-star-outline";
                          } else {
                            this.collect(params.index, params.row);
                            event.currentTarget.className =
                              "ivu-icon ivu-icon-ios-star";
                          }
                        } else {
                          this.$Message.warning(this.$t("common.logintip"));
                        }
                      },
                    },
                  }),
                  h("span", params.row.coin),
                  h(
                    "Tooltip",
                    {
                      props: {
                        placement: "right",
                        content: "首发抢购活动演示",
                      },
                    },
                    [
                      h(
                        "span",
                        {
                          style: {
                            fontSize: "8px",
                            padding: "2px 2px 1px 2px",
                            color: "#FFF",
                            marginLeft: "5px",
                            background: "#F30",
                            borderRadius: "8px",
                            display: "inline-block",
                            height: "8px",
                            width: "8px",
                          },
                        },
                        ""
                      ),
                    ]
                  ),
                ]);
              } else if (params.row.coin == "FDB") {
                return h("div", [
                  h("Icon", {
                    props: {
                      // color:"red",
                      type: params.row.isFavor
                        ? "ios-star"
                        : "ios-star-outline",
                    },
                    nativeOn: {
                      click: () => {
                        event.stopPropagation(); //阻止事件冒泡
                        if (this.isLogin) {
                          if (
                            event.currentTarget.className ==
                            "ivu-icon ivu-icon-ios-star"
                          ) {
                            this.cancelCollect(params.index, params.row);
                            event.currentTarget.className ==
                              "ivu-icon ivu-icon-ios-star-outline";
                          } else {
                            this.collect(params.index, params.row);
                            event.currentTarget.className =
                              "ivu-icon ivu-icon-ios-star";
                          }
                        } else {
                          this.$Message.warning(this.$t("common.logintip"));
                        }
                      },
                    },
                  }),
                  h("span", params.row.coin),
                  h(
                    "Tooltip",
                    {
                      props: {
                        placement: "right",
                        content: "首发分摊活动演示",
                      },
                    },
                    [
                      h(
                        "span",
                        {
                          style: {
                            fontSize: "8px",
                            padding: "2px 2px 1px 2px",
                            color: "#FFF",
                            marginLeft: "5px",
                            background: "#F30",
                            borderRadius: "8px",
                            display: "inline-block",
                            height: "8px",
                            width: "8px",
                          },
                        },
                        ""
                      ),
                    ]
                  ),
                ]);
              }
              return h("div", [
                h("Icon", {
                  props: {
                    // color:"red",
                    type: params.row.isFavor ? "ios-star" : "ios-star-outline",
                  },
                  nativeOn: {
                    click: () => {
                      event.stopPropagation(); //阻止事件冒泡
                      if (this.isLogin) {
                        if (
                          event.currentTarget.className ==
                          "ivu-icon ivu-icon-ios-star"
                        ) {
                          this.cancelCollect(params.index, params.row);
                          event.currentTarget.className ==
                            "ivu-icon ivu-icon-ios-star-outline";
                        } else {
                          this.collect(params.index, params.row);
                          event.currentTarget.className =
                            "ivu-icon ivu-icon-ios-star";
                        }
                      } else {
                        this.$Message.warning(this.$t("common.logintip"));
                      }
                    },
                  },
                }),
                h("span", params.row.coin),
              ]);
            },
          },
          {
            title: this.$t("exchange.lastprice"),
            key: "close",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = parseFloat(a);
              let b1 = parseFloat(b);
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
          },
          // 24小時漲跌
          {
            title: this.$t("exchange.daychange"),
            key: "rose",
            sortable: true,
            sortMethod: function(a, b, type) {
              let a1 = a.replace(/[^\d|.|-]/g, "") - 0;
              let b1 = b.replace(/[^\d|.|-]/g, "") - 0;
              if (type == "asc") {
                return a1 - b1;
              } else {
                return b1 - a1;
              }
            },
            render: (h, params) => {
              const row = params.row;
              const className = parseFloat(row.rose) < 0 ? "sell" : "buy";
              return h(
                "span",
                {
                  attrs: {
                    class: className,
                  },
                },
                row.rose
              );
            },
          },
        ],
      },
      wallet: {
        usdtBalance: 0.0,
        mvUseBalance: 0.0,
      },
      walletNew: {
        usdtBalance: 0.0,
        mvUseBalance: 0.0,
      },
      showMarket: "MARKET_PRICE",
      fixHistoryHeight: 295,
      spotPriceType: "LIMIT_SPOT_PRICE",
      form: {
        buy: {
          limitPrice: "",
          limitAmount: "",
          marketAmount: "",
          limitTurnover: "",
          limitTurnovers: "",
        },
        sell: {
          limitPrice: "",
          limitAmount: "",
          marketAmount: "",
          limitTurnover: "",
          limitTurnovers: "",
        },
      },
      trade: {
        rows: [],
      },
      //   最新价的 table 数据;
      plate: {
        maxPostion: 7,
        askRows: [],
        bidRows: [],
      },
      currentOrder: {
        columns: [
          {
            type: "index",
            height: 40,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  skin: params.row.skin,
                  rows: params.row.detail,
                },
              });
            },
          },
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              return h("span", {}, this.time_filter(params.row.time));
            },
          },
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          {
            title: self.$t("exchange.type"),
            render(h, params) {
              return [
                h(
                  "span",
                  params.row.type == "LIMIT_PRICE"
                    ? self.$t("exchange.limited_price")
                    : self.$t("exchange.market_price")
                ),
              ];
            },
          },
          {
            title: self.$t("exchange.direction"),
            key: "direction",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction.toLowerCase();
              return h(
                "span",
                {
                  attrs: {
                    class: className,
                  },
                },
                row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout")
              );
            },
          },
          {
            title: self.$t("exchange.price"),
            key: "price",
            render(h, params) {
              return h("span", self.toFloor(params.row.price));
            },
          },
          {
            title: self.$t("exchange.delegationnum"),
            key: "amount",
            render(h, params) {
              if (
                params.row.type === "MARKET_PRICE" &&
                params.row.direction == "BUY"
              ) {
                return [
                  h("span", self.toFloor(params.row.amount)),
                  h(
                    "span",
                    {
                      style: {
                        color: "#03C59E",
                        marginLeft: "5px",
                      },
                    },
                    "USDT"
                  ),
                ];
              } else {
                return [
                  h("span", self.toFloor(params.row.amount)),
                  h(
                    "span",
                    {
                      style: {
                        color: "#03C59E",
                        marginLeft: "5px",
                      },
                    },
                    params.row.coinSymbol
                  ),
                ];
              }
            },
          },
          {
            title: self.$t("exchange.traded"),
            key: "tradedAmount",
            render(h, params) {
              return h("span", self.toFloor(params.row.tradedAmount));
            },
          },
          {
            title: self.$t("exchange.dealamount"),
            key: "turnover",
            render(h, params) {
              return h("span", self.toFloor(params.row.turnover));
            },
          },
          {
            title: self.$t("exchange.action"),
            key: "operate",
            render: (h, params) => {
              return [
                this.selectedOrder === "planLimit"
                  ? h(
                      "Button",
                      {
                        props: {
                          size: "small",
                        },
                        style: {
                          border: "1px solid #f0ac19",
                          color: "#f1ac19",
                          "line-height": "1.2",
                          "border-radius": "10px",
                        },
                        on: {
                          click: () => {
                            this.cancels(params.row.orderId);
                          },
                        },
                      },
                      self.$t("exchange.undo")
                    )
                  : h(
                      "Button",
                      {
                        props: {
                          size: "small",
                        },
                        style: {
                          border: "1px solid #f0ac19",
                          color: "#f1ac19",
                          "line-height": "1.2",
                          "border-radius": "10px",
                        },
                        on: {
                          click: () => {
                            this.cancel(params.index);
                          },
                        },
                      },
                      self.$t("exchange.undo")
                    ),
              ];
            },
          },
        ],
        columns1: [
          {
            type: "index",
            height: 40,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  skin: params.row.skin,
                  rows: params.row.detail,
                },
              });
            },
          },
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              return h("span", {}, this.time_filter(params.row.time));
            },
          },
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          {
            title: self.$t("exchange.type"),
            render(h, params) {
              return [
                this.selectedOrder === "planLimit"
                  ? h(
                      "span",
                      params.row.type === "LIMIT_PRICE"
                        ? self.$t("exchange.limited_price")
                        : self.$t("exchange.market_price")
                    )
                  : h(
                      "span",
                      params.row.type === "LIMIT_SPOT_PRICE"
                        ? self.$t("exchange.limited_price")
                        : self.$t("exchange.market_price")
                    ),
              ];
            },
          },
          {
            title: self.$t("swap.ent_trigglePrice"),
            key: "triggerPrice",
          },
          {
            title: self.$t("exchange.direction"),
            key: "direction",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction.toLowerCase();
              return h(
                "span",
                {
                  attrs: {
                    class: className,
                  },
                },
                row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout")
              );
            },
          },
          {
            title: self.$t("exchange.price"),
            key: "price",
            render(h, params) {
              return h("span", self.toFloor(params.row.price));
            },
          },
          {
            title: self.$t("exchange.delegationnum"),
            key: "amount",
            render(h, params) {
              if (
                params.row.type === "MARKET_SPOT_PRICE" &&
                params.row.direction == "BUY"
              ) {
                return [
                  h("span", self.toFloor(params.row.amount)),
                  h(
                    "span",
                    {
                      style: {
                        color: "#03C59E",
                        marginLeft: "5px",
                      },
                    },
                    "USDT"
                  ),
                ];
              } else {
                return [
                  h("span", self.toFloor(params.row.amount)),
                  h(
                    "span",
                    {
                      style: {
                        color: "#03C59E",
                        marginLeft: "5px",
                      },
                    },
                    params.row.coinSymbol
                  ),
                ];
              }
            },
          },
          {
            title: self.$t("exchange.traded"),
            key: "tradedAmount",
            render(h, params) {
              return h("span", self.toFloor(params.row.tradedAmount));
            },
          },
          {
            title: self.$t("exchange.dealamount"),
            key: "turnover",
            render(h, params) {
              return h("span", self.toFloor(params.row.turnover));
            },
          },
          {
            title: self.$t("exchange.action"),
            key: "operate",
            render: (h, params) => {
              return [
                this.selectedOrder === "planLimit"
                  ? h(
                      "Button",
                      {
                        props: {
                          size: "small",
                        },
                        style: {
                          border: "1px solid #f0ac19",
                          color: "#f1ac19",
                          "line-height": "1.2",
                          "border-radius": "10px",
                        },
                        on: {
                          click: () => {
                            this.cancels(params.row.orderId);
                          },
                        },
                      },
                      self.$t("exchange.undo")
                    )
                  : h(
                      "Button",
                      {
                        props: {
                          size: "small",
                        },
                        style: {
                          border: "1px solid #f0ac19",
                          color: "#f1ac19",
                          "line-height": "1.2",
                          "border-radius": "10px",
                        },
                        on: {
                          click: () => {
                            this.cancel(params.index);
                          },
                        },
                      },
                      self.$t("exchange.undo")
                    ),
              ];
            },
          },
        ],
        rows: [],
      },
      historyOrder: {
        pageSize: 10,
        total: 10,
        page: 1,
        columns: [
          {
            type: "index",
            width: 40,
            render: (h, params) => {
              return h(expandRow, {
                props: {
                  skin: params.row.skin,
                  rows: params.row.detail,
                },
              });
            },
          },
          {
            title: self.$t("exchange.time"),
            key: "time",
            render: (h, params) => {
              return h("span", {}, this.time_filter(params.row.time));
            },
          },
          {
            title: self.$t("exchange.symbol"),
            key: "symbol",
          },
          {
            title: self.$t("exchange.type"),
            render(h, params) {
              return h(
                "span",
                params.row.type === "LIMIT_PRICE"
                  ? self.$t("exchange.limited_price")
                  : params.row.type === "LIMIT_SPOT_PRICE"
                  ? self.$t("exchange.limited_price")
                  : self.$t("exchange.market_price")
              );
            },
          },
          {
            title: self.$t("exchange.direction"),
            key: "direction",
            render: (h, params) => {
              const row = params.row;
              const className = row.direction.toLowerCase();
              return h(
                "span",
                {
                  attrs: {
                    class: className,
                  },
                },
                row.direction == "BUY"
                  ? self.$t("exchange.buyin")
                  : self.$t("exchange.sellout")
              );
            },
          },
          {
            title: self.$t("exchange.price"),
            key: "price",
            render(h, params) {
              return h("span", self.toFloor(params.row.price));
            },
          },
          {
            title: self.$t("exchange.num"),
            key: "amount",
            render(h, params) {
              return h("span", self.toFloor(params.row.amount));
            },
          },
          {
            title: self.$t("exchange.done"),
            key: "tradedAmount",
            render(h, params) {
              return h("span", self.toFloor(params.row.tradedAmount));
            },
          },
          {
            title: self.$t("exchange.dealamount"),
            key: "turnover",
            render(h, params) {
              return h("span", self.toFloor(params.row.turnover));
            },
          },
          {
            title: self.$t("exchange.status"),
            key: "status",
            render: (h, params) => {
              const status = params.row.status;
              if (status == "COMPLETED") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#03C59E",
                    },
                  },
                  self.$t("exchange.finished")
                );
              } else if (status == "CANCELED") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#7c7f82",
                    },
                  },
                  self.$t("exchange.canceled")
                );
              } else if (status == "TRADING") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#7c7f82",
                    },
                  },
                  self.$t("carouselItem.text159")
                );
              } else if (status == "OVERTIMED") {
                return h(
                  "span",
                  {
                    style: {
                      color: "#7c7f82",
                    },
                  },
                  self.$t("carouselItem.text261")
                );
              } else {
                return h("span", {}, "--");
              }
            },
          },
        ],
        rows: [],
      },
      fullTrade: {},
      langLocale: this.$i18n.locale,
      sportList: [],
    };
  },
  filters: {
    ellipsis(value) {
      if (!value) return "";
      if (value.length >= 18) {
        return value.slice(0, 12) + "...";
      }
      return value;
    },
    toFixedPublishAmount: function(value) {
      var tem = value.toFixed(7);
      if (value >= 10) {
        tem = value.toFixed(6);
      }
      if (value >= 100) {
        tem = value.toFixed(5);
      }
      if (value >= 1000) {
        tem = value.toFixed(4);
      }
      if (value >= 10000) {
        tem = value.toFixed(3);
      }
      if (value >= 100000) {
        tem = value.toFixed(2);
      }
      if (value >= 1000000) {
        tem = value.toFixed(1);
      }
      if (value >= 10000000) {
        tem = value.toFixed(0);
      }
      return tem;
    },
    toFixedPublishPrice: function(value) {
      var tem = value.toFixed(5).replace(/0+$/g, "");
      if (value >= 1) {
        tem = value.toFixed(4);
      }
      if (value >= 10) {
        tem = value.toFixed(3);
      }
      if (value >= 100) {
        tem = value.toFixed(2);
      }
      if (value >= 1000) {
        tem = value.toFixed(1);
      }
      if (value >= 10000) {
        tem = value.toFixed(1);
      }
      return tem;
    },
  },
  computed: {
    // 1015
    rechargeUSDTUrl: function() {
      // return "/uc/recharge?name=" + this.currentCoin.base;
      return "/finance/deposit";
      // return "#/finance/recharge?name=" + this.currentCoin.base;
    },
    rechargeCoinUrl: function() {
      // return "/uc/recharge?name=" + this.currentCoin.coin;
      return "/finance/deposit";
      // return "#/finance/recharge?name=" + this.currentCoin.coin;
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
    sliderBuyDisabled() {
      let account = this.walletNew.usdtBalance,
        min = this.toFloor(1 / Math.pow(10, this.baseCoinScale));
      return account < min;
    },
    sliderSellDisabled() {
      let account = this.walletNew.mvUseBalance,
        min = this.toFloor(1 / Math.pow(10, this.coinScale));
      return account < min;
    },
    // 汇率相关
    allRate() {
      return this.$store.state.allRate;
    },
    pricingStatusRate() {
      return this.$store.state.pricingStatusRate;
    },
  },
  watch: {
    "form.buy.limitPrice": function(val) {
      let price = this.form.buy.limitPrice,
        account = this.walletNew.usdtBalance,
        amount = 0;
      if (val > 0) {
        amount = this.toFloor(
          account
            .div(price)
            .mul(this.sliderBuyLimitPercent)
            .mul(0.01),
          this.coinScale
        );
      }
      this.form.buy.limitAmount = amount;
      this.form.buy.limitTurnover = this.toFloor(
        val.mul(amount),
        this.baseCoinScale
      );
    },
    "form.buy.limitAmount": function(val) {
      this.form.buy.limitTurnover = this.toFloor(
        val.mul(this.form.buy.limitPrice),
        this.baseCoinScale
      );
    },
    "form.sell.limitPrice": function(val) {
      this.form.sell.limitTurnover = this.toFloor(
        val.mul(this.form.sell.limitAmount),
        this.coinScale
      );
    },
    "form.sell.limitAmount": function(val) {
      this.form.sell.limitTurnover = this.toFloor(
        val.mul(this.form.sell.limitPrice),
        this.coinScale
      );
    },
    lang: function() {
      this.updateLangData();
    },
    $route(to, from) {
      this.init();
    },
    sliderBuyLimitPercent() {
      let price = this.form.buy.limitPrice,
        account = this.walletNew.usdtBalance,
        amount = 0;
      if (price > 0) {
        amount = this.toFloor(
          account
            .div(price)
            .mul(this.sliderBuyLimitPercent)
            .mul(0.01),
          this.coinScale
        );
      }
      this.form.buy.limitAmount = amount;
    },
    sliderSellLimitPercent() {
      let account = this.walletNew.mvUseBalance;
      this.form.sell.limitAmount = this.toFloor(
        account.mul(this.sliderSellLimitPercent).mul(0.01),
        this.coinScale
      );
    },
    sliderBuyMarketPercent() {
      let account = this.walletNew.usdtBalance;
      this.form.buy.marketAmount = this.toFloor(
        account.mul(this.sliderBuyMarketPercent).mul(0.01),
        this.baseCoinScale
      );
    },
    sliderSellMarketPercent() {
      let account = this.walletNew.mvUseBalance;
      this.form.sell.marketAmount = this.toFloor(
        account.mul(this.sliderSellMarketPercent).mul(0.01),
        this.coinScale
      );
    },
    activeWidth: {
      handler(val, oldVal) {
        if (val <= 416) {
          this.xsShow = true;
        } else {
          this.xsShow = false;
        }
      },
      deep: true, //true 深度监听
      immediate: true,
    },
  },
  created: function() {
    this.init();
  },
  mounted() {
    this.dynamic();
  },
  methods: {
    dynamic() {
      // this.$nextTick(() => {
      let search = this.$el.querySelector(".box_kline");
      this.dynamic_height = search.offsetWidth - 165;
      // });
    },
    // 切换显示内容
    tabs_next(id) {
      this.tabs_nexts = id;
    },
    getCNYRate() {
      // 获取汇率
      this.CNYRate = this.pricingStatusRate;
      // 更新汇率
      this.$store.dispatch("getAllRateActions");
    },
    getSymbol() {
      this.$http
        .post(this.host + this.api.market.thumb, {})
        .then((response) => {
          var resp = response.body;
          //先清空已有数据
          for (var i = 0; i < resp.length; i++) {
            var coin = resp[i];
            coin.base = resp[i].symbol.split("/")[1];
            this.coins[coin.base] = [];
            this.coins[coin.base + "2"] = [];
            this.coins._map = [];
            this.coins.favor = [];
          }
          for (var i = 0; i < resp.length; i++) {
            var coin = resp[i];
            coin.price = resp[i].close = resp[i].close.toFixed(
              this.baseCoinScale
            );
            // coin.rose =
            //   resp[i].chg > 0
            //     ? "+" + (resp[i].chg * 100).toFixed(2) + "%"
            //     : (resp[i].chg * 100).toFixed(2) + "%";
            // 20231026 不乘100了
            coin.rose =
              resp[i].chg > 0
                ? "+" + resp[i].chg.toFixed(2) + "%"
                : resp[i].chg.toFixed(2) + "%";
            coin.coin = resp[i].symbol.split("/")[0];
            coin.base = resp[i].symbol.split("/")[1];
            coin.href = (coin.coin + "_" + coin.base).toLowerCase();
            coin.isFavor = false;
            this.coins._map[coin.symbol] = coin;
            if (coin.zone == 0) {
              this.coins[coin.base].push(coin);
            } else {
              this.coins[coin.base + "2"].push(coin);
            }
            if (coin.symbol == this.currentCoin.symbol) {
              this.currentCoin = coin;
              this.form.buy.limitPrice = this.form.sell.limitPrice = coin.price;
            }
          }
          if (this.isLogin) {
            this.getFavor();
          }
          require(["../../assets/js/exchange.js"], function(e) {
            e.clickScTab();
          });
          this.initMqtt();
          this.changeBaseCion(this.basecion);
        });
    },
    //查询自选(收藏)
    getFavor() {
      this.$http
        .post(this.host + this.api.exchange.favorFind, {})
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
          if (this.basecion == "favor") {
            this.dataIndex = this.coins.favor;
            this.lineCurrentCoin = this.dataIndex;
          }
        });
    },
    // 左上角选择币种或者收藏
    changeBaseCion(str) {
      this.basecion = str;
      this.lineCurrentCoin = this.coins.USDT;
      // console.log(this.coins.USDT);
      if (str == "usdt") {
        this.dataIndex = this.coins.USDT;
        this.dataIndex2 = this.coins.USDT2;
      } else if (str == "favor") {
        this.dataIndex = this.coins.favor;
      }
    },

    // 搜索
    seachInputChange() {
      this.searchKey = this.searchKey.toUpperCase();
      this.lineCurrentCoin = this.coins.USDT;
      if (this.basecion == "favor") {
        this.dataIndex = this.coins.favor.filter(
          (item) => item["coin"].indexOf(this.searchKey) == 0
        );
      } else if (this.basecion == "usdt") {
        this.dataIndex = this.coins.USDT.filter(
          (item) => item["coin"].indexOf(this.searchKey) == 0
        );
      } else if (this.basecion == "btc") {
        this.dataIndex = this.coins.BTC.filter(
          (item) => item["coin"].indexOf(this.searchKey) == 0
        );
      } else if (this.basecion == "eth") {
        this.dataIndex = this.coins.ETH.filter(
          (item) => item["coin"].indexOf(this.searchKey) == 0
        );
      }
    },
    silderGo(silder, val) {
      this[silder] = val;
    },
    init() {
      var params = this.$route.params.pair;
      if (params == undefined) {
        // 现货
        this.$http
          .post(this.host + this.api.markets.marketThumb, {})
          .then((res) => {
            this.$store.commit("getexchangeCoin", res.data.data[0].symbol);
            this.$router.push(
              "/exchange/" +
                res.data.data[0].symbol.toLowerCase().replace("/", "_")
            );
            params = res.data.data[0].symbol.toLowerCase().replace("/", "_");
          });
        return;
      } else {
        this.$store.commit("getexchangeCoin", params);
      }
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
      this.currentCoin.symbol = coin + "/" + base;
      this.$store.commit("addExchangePage", this.currentCoin.symbol);
      this.currentCoin.coin = coin;
      this.currentCoin.base = base;
      this.$store.commit("setSkin", this.skin);
      this.getCNYRate();
      this.getSymbolScale();
      this.getCoinInfo();
      this.getSymbol(); //包含 K线图、getFavor、startWebsock等
      this.getPlate(); //买卖盘
      this.getPlateFull();
      this.getTrade();
      this.getCoinAllList(); //精度
      if (this.isLogin) {
        this.getWallet(); //账户资产信息
        // this.getCurrentOrder(); //当前委托
        // this.getspotOrder(); //计划委托
        this.getHistoryOrder(); //历史委托
      }
      this.sliderBuyLimitPercent = 0;
      this.sliderSellLimitPercent = 0;
      this.sliderBuyMarketPercent = 0;
    },
    tipFormat(val) {
      return val + "%";
    },

    changePlate(str) {
      if (str != "all") {
        this.plate.maxPostion = 14;
      } else {
        this.plate.maxPostion = 7;
      }
      this.getPlate(str);
    },
    changeImgTable(str) {
      if (str == "k") {
        this.Mflag = false;
      } else if (str == "s") {
        this.Mflag = true;
      }
      this.currentImgTable = str;
    },
    changeOrder(str) {
      this.selectedOrder = str;
      this.total = 0;
      this.pageNo = 1;
      this.pageSize = 10;
      if (str == "planLimit") {
        // this.getspotOrder();
      } else if (str == "current") {
        // this.getCurrentOrder();
      } else if (str == "history") {
        this.getHistoryOrder();
      }
    },
    setback() {
      var obk = document.getElementsByClassName("container")[0];
      var height = 0;
      var doc = document;
      window.innerHeight && (height = window.innerHeight);
      !window.innerHeight &&
        doc.body.clientHeight &&
        (height = doc.body.clientHeight);
      !window.innerHeight &&
        !doc.body.clientHeight &&
        doc.documentElement.clientHeight &&
        (height = doc.documentElement.clientHeight);
      obk.style.minHeight = height - 100 + "px";
    },
    updateLangData() {
      this.favorColumns[0].title = this.$t("exchange.coin");
      this.favorColumns[1].title = this.$t("exchange.lastprice");
      this.favorColumns[2].title = this.$t("exchange.daychange");

      this.coins.columns[0].title = this.$t("exchange.coin");
      this.coins.columns[1].title = this.$t("exchange.lastprice");
      this.coins.columns[2].title = this.$t("exchange.daychange");

      this.trade.columns[0].title = this.$t("exchange.num");
      this.trade.columns[1].title = this.$t("exchange.price");
      this.trade.columns[2].title = this.$t("exchange.time");

      this.plate.columns[0].title = this.$t("exchange.stall");
      this.plate.columns[1].title = this.$t("exchange.price");
      this.plate.columns[2].title = this.$t("exchange.num");
      this.plate.columns[3].title = this.$t("exchange.total");

      this.currentOrder.columns[1].title = this.$t("exchange.time");
      this.currentOrder.columns[2].title = this.$t("exchange.symbol");
      this.currentOrder.columns[3].title = this.$t("exchange.type");
      this.currentOrder.columns[4].title = this.$t("exchange.direction");
      this.currentOrder.columns[5].title = this.$t("exchange.price");
      this.currentOrder.columns[6].title = this.$t("exchange.num");
      this.currentOrder.columns[7].title = this.$t("exchange.traded");
      this.currentOrder.columns[8].title = this.$t("exchange.dealamount");
      this.currentOrder.columns[9].title = this.$t("exchange.action");

      this.historyOrder.columns[1].title = this.$t("exchange.time");
      this.historyOrder.columns[2].title = this.$t("exchange.symbol");
      this.historyOrder.columns[3].title = this.$t("exchange.type");
      this.historyOrder.columns[4].title = this.$t("exchange.direction");
      this.historyOrder.columns[5].title = this.$t("exchange.price");
      this.historyOrder.columns[6].title = this.$t("exchange.num");
      this.historyOrder.columns[7].title = this.$t("exchange.done");
      this.historyOrder.columns[8].title = this.$t("exchange.dealamount");
      this.historyOrder.columns[9].title = this.$t("exchange.status");
    },
    getCoin(symbol) {
      return this.coins._map[symbol];
    },
    getKline() {
      var that = this;
      let config = {
        autosize: true,
        height: 320,
        // fullscreen: window.innerWidth > 767 ? true : false,
        symbol: that.symbol,
        interval: "5", // 默认K线周期
        timezone: this.getTimezone4K(),
        toolbar_bg: "#18202a",
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
          "hide_left_toolbar_by_default",
          "left_toolbar",
          "same_data_requery",
          "header_in_fullscreen_mode",
          "show_right_widgets_panel_by_default",
        ],
        //成交量样式
        studies_overrides: {
          "volume.volume.color.0": "#fa5252",
          "volume.volume.color.1": "#12b886",
          "volume.volume.transparency": 25,
        },
        custom_css_url: "bundles/common.css",
        supported_resolutions: ["1", "5", "15", "30", "60", "1D", "1W", "1M"],
        charts_storage_url: "http://saveload.tradingview.com",
        charts_storage_api_version: "1.1",
        client_id: "tradingview.com",
        user_id: "public_user_id",
        overrides: {
          "paneProperties.background": "#1B1E2E",
          "paneProperties.vertGridProperties.color": "rgba(0,0,0,.1)",
          "paneProperties.horzGridProperties.color": "rgba(0,0,0,.1)",
          //"scalesProperties.textColor" : "#AAA",
          "scalesProperties.textColor": "#000000",
          "mainSeriesProperties.candleStyle.upColor": "#12b886",
          "mainSeriesProperties.candleStyle.downColor": "#fa5252",
          "mainSeriesProperties.candleStyle.drawBorder": false,
          "mainSeriesProperties.candleStyle.wickUpColor": "#589065",
          "mainSeriesProperties.candleStyle.wickDownColor": "#AE4E54",
          "paneProperties.legendProperties.showLegend": true,

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
            title: this.$t("exchange.realtime"),
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
          /*{
      text: "4hour",
      resolution: "240",
      description: "4hour",
      title: "4hour"
      },*/
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
          {
            text: "1mon",
            resolution: "1M",
            description: "1mon",
          },
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
                widget.chart().setChartType(1);
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
    getCoinInfo() {
      //获取精度
      this.$http
        .post(this.host + this.api.market.coinInfo, {
          unit: this.currentCoin.coin,
        })
        .then((response) => {
          var resp = response.body;
          if (resp != null) {
            this.coinInfo = resp;
          }
        });
    },
    getSymbolScale() {
      //获取精度
      this.$http
        .post(this.host + this.api.market.symbolInfo, {
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

            this.enableMarketBuy = resp.enableMarketBuy;
            this.enableMarketSell = resp.enableMarketSell;

            this.exchangeable = resp.exchangeable;

            // this.publishType = resp.publishType;
            this.startTime = resp.startTime;
            this.endTime = resp.endTime;
            this.clearTime = resp.clearTime;
            this.currentTime = parseInt(resp.currentTime / 1000);
            this.publishAmount = resp.publishAmount;
            this.publishPrice = resp.publishPrice;
          }
        });
    },
    getPlate(str = "") {
      //买卖盘
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      this.$http
        .post(this.host + this.api.market.platemini, params)
        .then((response) => {
          this.plate.askRows = [];
          this.plate.bidRows = [];
          let resp = response.body;
          if (resp.ask && resp.ask.items) {
            for (var i = 0; i < resp.ask.items.length; i++) {
              if (i == 0) {
                resp.ask.items[i].totalAmount = resp.ask.items[i].amount;
              } else {
                resp.ask.items[i].totalAmount =
                  resp.ask.items[i - 1].totalAmount + resp.ask.items[i].amount;
              }
            }
            if (resp.ask.items.length >= this.plate.maxPostion) {
              for (var i = this.plate.maxPostion; i > 0; i--) {
                var ask = resp.ask.items[i - 1];
                ask.direction = "SELL";
                ask.position = i;
                this.plate.askRows.push(ask);
              }
              const rows = this.plate.askRows,
                len = rows.length,
                totle = rows[0].totalAmount;
              this.plate.askTotle = totle;
            } else {
              for (
                var i = this.plate.maxPostion;
                i > resp.ask.items.length;
                i--
              ) {
                var ask = { price: 0, amount: 0 };
                ask.direction = "SELL";
                ask.position = i;
                ask.totalAmount = ask.amount;
                this.plate.askRows.push(ask);
              }
              for (var i = resp.ask.items.length; i > 0; i--) {
                var ask = resp.ask.items[i - 1];
                ask.direction = "SELL";
                ask.position = i;
                this.plate.askRows.push(ask);
              }
              var askItemIndex =
                resp.ask.items.length - 1 > 0 ? resp.ask.items.length - 1 : 0;
              const rows = this.plate.askRows,
                len = rows.length,
                totle = rows[askItemIndex].totalAmount;
              this.plate.askTotle = totle;
            }
            this.plate.askRows.sort((a, b) => b.price - a.price);
          }
          if (resp.bid && resp.bid.items) {
            for (var i = 0; i < resp.bid.items.length; i++) {
              if (i == 0)
                resp.bid.items[i].totalAmount = resp.bid.items[i].amount;
              else
                resp.bid.items[i].totalAmount =
                  resp.bid.items[i - 1].totalAmount + resp.bid.items[i].amount;
            }
            for (var i = 0; i < resp.bid.items.length; i++) {
              var bid = resp.bid.items[i];
              bid.direction = "BUY";
              bid.position = i + 1;
              this.plate.bidRows.push(bid);
              if (i == this.plate.maxPostion - 1) break;
            }
            if (resp.bid.items.length < this.plate.maxPostion) {
              for (
                var i = resp.bid.items.length;
                i < this.plate.maxPostion;
                i++
              ) {
                var bid = { price: 0, amount: 0 };
                bid.direction = "BUY";
                bid.position = i + 1;
                bid.totalAmount = 0;
                this.plate.bidRows.push(bid);
              }
              var bidItemIndex =
                resp.bid.items.length - 1 > 0 ? resp.bid.items.length - 1 : 0;
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
        .post(this.host + this.api.market.platefull, params)
        .then((response) => {
          if (typeof response.body === "string") {
            try {
              var resp = JSON.parse(response.body);
              resp.skin = this.skin;
              this.fullTrade = resp;
              this.$refs.depthGraph.draw(resp);
            } catch (error) {}
          } else if (
            typeof response.body === "object" &&
            response.body !== null
          ) {
            try {
              var resp = response.body;
              resp.skin = this.skin;
              this.fullTrade = resp;
              this.$refs.depthGraph.draw(resp);
            } catch (error) {}
          } else {
          }
        });
    },
    getTrade() {
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["size"] = 20;
      this.$http
        .post(this.host + this.api.market.trade, params)
        .then((response) => {
          this.trade.rows = [];
          var resp = response.body;
          for (var i = 0; i < resp.length; i++) {
            this.trade.rows.push(resp[i]);
          }
        });
    },
    market_price(e) {
      this.showMarket = e;
      this.form.buy.marketAmount = "";
      this.form.sell.marketAmount = "";
    },
    // 現貨收藏
    currentCoinFavorChange() {
      if (!this.isLogin) {
        this.$Message.warning(this.$t("common.logintip"));
        return;
      }
      if (this.collecRequesting) {
        return;
      }
      const symbol = this.currentCoin.symbol;
      this.collecRequesting = true;
      if (this.currentCoinIsFavor) {
        //已收藏,去取消收藏
        this.$http
          .post(this.host + this.api.exchange.favorDelete, {
            symbol,
          })
          .then((response) => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.info(this.$t("exchange.cancel_favorite"));
              this.getSymbol(); //刷新状态
              this.currentCoinIsFavor = false;
            }
            this.collecRequesting = false;
          });
      } else {
        //去添加收藏
        this.$http
          .post(this.host + this.api.exchange.favorAdd, { symbol })
          .then((response) => {
            var resp = response.body;
            if (resp.code == 0) {
              this.$Message.info(this.$t("exchange.do_favorite"));
              this.getSymbol(); //刷新状态
              this.currentCoinIsFavor = true;
            }
            this.collecRequesting = false;
          });
      }
    },
    collect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.exchange.favorAdd, params)
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
        });
    },
    cancelCollect(index, row) {
      if (!this.isLogin) {
        this.$Message.info(this.$t("common.logintip"));
        return;
      }
      var params = {};
      params["symbol"] = row.symbol;
      this.$http
        .post(this.host + this.api.exchange.favorDelete, params)
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
        });
    },
    gohref(currentRow, oldCurrentRow) {
      if (
        currentRow.href !=
        this.currentCoin.symbol.replace("/", "_").toLowerCase()
      ) {
        let arr = [
          "exchange-trade-pc/" + this.currentCoin.symbol.replace("/", "-"),
          "exchange-plate/" + this.currentCoin.symbol.replace("/", "-"),
        ];
        if (this.isLogin) {
          arr.push(
            "exchange-spot/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-"),
            "current-exchange-order/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-")
          );
        }
        this.$mqttService
          .unsubscribe(arr)
          .then(() => {
            console.log("Successfully unsubscribed from contract-thumb/#");
          })
          .catch((error) => {
            console.error("Failed to unsubscribe:", error);
          });
        // this.client.unsubscribe(arr, function() {});
        this.$router.push({
          name: "exchangePair",
          params: {
            pair: currentRow.href,
          },
        });
      }
      this.list_show = false;
    },
    buyWithLimitPrice() {
      if (this.form.buy.limitAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.buyamounttip"),
        });
        return;
      }
      var maxAmount = this.walletNew.usdtBalance / this.form.buy.limitPrice;
      if (this.form.buy.limitAmount > maxAmount) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc:
            this.$t("exchange.buyamounttipwarning") + this.toFloor(maxAmount),
        });
        return;
      }
      var that = this;
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] = this.form.buy.limitPrice;
      params["amount"] = this.form.buy.limitAmount;
      params["direction"] = "BUY";
      params["type"] = "LIMIT_PRICE";
      params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
      this.$Spin.show();
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success"),
            });
            this.getWallet();
            // this.getCurrentOrder();
            // this.getspotOrder();
            this.getHistoryOrder();
            this.form.buy.limitAmount = 0;
            this.sliderBuyLimitPercent = 0;
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message,
            });
          }
          this.$Spin.hide();
        });
    },
    buyWithMarketPrice() {
      if (this.form.buy.marketAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.pricetip"),
        });
        return;
      }
      if (this.form.buy.marketAmount > parseFloat(this.walletNew.usdtBalance)) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc:
            this.$t("exchange.pricetipwarning") + this.walletNew.usdtBalance,
        });
        return;
      }
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] = 0;
      params["amount"] = this.form.buy.marketAmount;
      params["direction"] = "BUY";
      params["type"] = "MARKET_PRICE";
      params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
      var that = this;
      this.$Spin.show();
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success"),
            });
            this.refreshAccount();
            this.sliderBuyMarketPercent = 0;
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message,
            });
          }
          this.$Spin.hide();
        });
    },
    sellLimitPrice() {
      if (this.form.sell.limitAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellamounttip"),
        });
        return;
      }
      if (this.form.sell.limitPrice == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellpricetip"),
        });
        return;
      }
      if (
        this.form.sell.limitAmount > parseFloat(this.walletNew.mvUseBalance)
      ) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc:
            this.$t("carouselItem.text253") +
            this.walletNew.mvUseBalance +
            this.$t("carouselItem.text254"),
        });
        return;
      }
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] = this.form.sell.limitPrice;
      params["amount"] = this.form.sell.limitAmount;
      params["direction"] = "SELL";
      params["type"] = "LIMIT_PRICE";
      params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
      var that = this;
      this.$Spin.show();
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then((response) => {
          var resp = response.body;

          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success"),
            });
            this.refreshAccount();
            this.form.sell.limitAmount = 0;
            this.sliderSellLimitPercent = 0;
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message,
            });
          }
          this.$Spin.hide();
        });
    },
    sellMarketPrice() {
      if (this.form.sell.marketAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellamounttip"),
        });
        return;
      }
      if (
        this.form.sell.marketAmount > parseFloat(this.walletNew.mvUseBalance)
      ) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc:
            this.$t("carouselItem.text253") +
            this.walletNew.mvUseBalance +
            this.$t("carouselItem.text254"),
        });
        return;
      }
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] = 0;
      params["amount"] = this.form.sell.marketAmount;
      params["direction"] = "SELL";
      params["type"] = "MARKET_PRICE";
      params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
      var that = this;
      this.$Spin.show();
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success"),
            });
            this.refreshAccount();
            this.sliderSellMarketPercent = 0;
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message,
            });
          }
          this.$Spin.hide();
        });
    },
    buyWithSportPrice() {
      if (this.form.buy.marketAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.buyamounttip"),
        });
        return;
      }
      if (this.form.buy.limitTurnovers == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("dolphin.text15") + this.$t("swap.triggleprice"),
        });
        return;
      }
      if (this.spotPriceType === "MARKET_SPOT_PRICE") {
        if (
          this.form.buy.marketAmount > parseFloat(this.walletNew.usdtBalance)
        ) {
          this.$Notice.error({
            title: this.$t("exchange.tip"),
            desc:
              this.$t("carouselItem.text275") +
              this.walletNew.usdtBalance +
              "USDT",
          });
          return;
        }
      } else {
        if (
          this.form.buy.marketAmount * this.form.buy.limitPrice >
          parseFloat(this.walletNew.usdtBalance)
        ) {
          this.$Notice.error({
            title: this.$t("exchange.tip"),
            desc:
              this.$t("carouselItem.text275") +
              this.walletNew.usdtBalance / this.form.buy.limitPrice +
              this.$t("carouselItem.text254"),
          });
          return;
        }
      }
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] =
        this.spotPriceType === "LIMIT_SPOT_PRICE"
          ? this.form.buy.limitPrice
          : this.currentCoin.close;
      params["amount"] = this.form.buy.marketAmount;
      params["direction"] = "BUY";
      params["type"] = this.spotPriceType;
      params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
      params["triggerPrice"] = this.form.buy.limitTurnovers;
      var that = this;
      this.$Spin.show();
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success"),
            });
            this.refreshAccount();
            this.sliderSellMarketPercent = 0;
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message,
            });
          }
          this.$Spin.hide();
        });
    },
    sellSportPrice() {
      if (this.form.sell.marketAmount == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("exchange.sellamounttip"),
        });
        return;
      }
      if (this.form.sell.limitTurnovers == "") {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc: this.$t("dolphin.text15") + this.$t("swap.triggleprice"),
        });
        return;
      }

      if (
        this.form.sell.marketAmount > parseFloat(this.walletNew.mvUseBalance)
      ) {
        this.$Notice.error({
          title: this.$t("exchange.tip"),
          desc:
            this.$t("carouselItem.text253") +
            this.walletNew.mvUseBalance +
            this.$t("carouselItem.text254"),
        });
        return;
      }
      var params = {};
      params["symbol"] = this.currentCoin.symbol;
      params["price"] =
        this.spotPriceType === "LIMIT_SPOT_PRICE"
          ? this.form.sell.limitPrice
          : this.currentCoin.close;
      params["amount"] = this.form.sell.marketAmount;
      params["direction"] = "SELL";
      params["type"] = this.spotPriceType;
      params["useDiscount"] = this.isUseBHB ? "1" : "0"; //是否试用手续费抵扣,0 不使用 1使用
      params["triggerPrice"] = this.form.sell.limitTurnovers;
      var that = this;
      this.$Spin.show();
      this.$http
        .post(this.host + this.api.exchange.orderAdd, params)
        .then((response) => {
          var resp = response.body;
          if (resp.code == 0) {
            this.$Notice.success({
              title: that.$t("exchange.tip"),
              desc: that.$t("exchange.success"),
            });
            this.refreshAccount();
            this.sliderSellMarketPercent = 0;
          } else {
            this.$Notice.error({
              title: that.$t("exchange.tip"),
              desc: resp.message,
            });
          }
          this.$Spin.hide();
        });
    },
    handleSpotPrice(value) {
      this.spotPriceType = value;
      if (value === "LIMIT_SPOT_PRICE") {
        // 限价
        this.form.buy.limitPrice = this.currentCoin.price;
        this.form.sell.limitPrice = this.currentCoin.price;
      } else {
        // 市价
        this.form.buy.limitPrice = "";
        this.form.sell.limitPrice = "";
      }
    },
    buyPlate(currentRow) {
      this.form.buy.limitPrice = currentRow.price;
      this.form.sell.limitPrice = currentRow.price;
    },
    sellPlate(currentRow) {
      this.form.buy.limitPrice = currentRow.price;
      this.form.sell.limitPrice = currentRow.price;
    },
    // 获取钱包信息
    getWallet() {
      this.$http
        .get(this.host + this.api.uc.walletNew, {
          params: {
            symbol: this.currentCoin.symbol,
          },
        })
        .then((response) => {
          var resp = response.body;
          this.walletNew.mvUseBalance = resp.data.mvUseBalance;
          this.walletNew.usdtBalance = resp.data.usdtBalance || "";
        });
    },
    // getCurrentOrder() {
    //   //查询当前委托
    //   var params = {};
    //   params["pageNo"] = 1;
    //   params["pageSize"] = 100;
    //   params["symbol"] = this.currentCoin.symbol;
    //   this.currentOrder.rows = [];
    //   var that = this;
    //   this.$http
    //     .post(this.host + this.api.exchange.current, params)
    //     .then((response) => {
    //       var resp = response.body;
    //       if (this.selectedOrder == "current") {
    //         this.total = resp.totalElements;
    //       }
    //       if (resp.content.length > 0) {
    //         this.currentOrder.rows = resp.content;
    //         this.currentOrder.rows.forEach((row, index) => {
    //           row.skin = that.skin;
    //           row.price =
    //             row.type == "MARKET_PRICE"
    //               ? that.$t("exchange.marketprice")
    //               : row.price;
    //         });
    //       }
    //     });
    // },
    // getspotOrder() {
    //   //查询计划委托
    //   var params = {};
    //   params["pageNo"] = 1;
    //   params["pageSize"] = 100;
    //   params["symbol"] = this.currentCoin.symbol;
    //   this.sportList = [];
    //   var that = this;
    //   this.$http
    //     .get(
    //       this.host +
    //         this.api.exchange.spotOrderAll, {
    //         params: {
    //           symbol: this.currentCoin.symbol,
    //           pageNo: "1",
    //           pageSize: "100",
    //         },
    //       }
    //     )
    //     .then((response) => {
    //       var resp = response.body;
    //       if (resp.data.length > 0) {
    //         this.sportList = resp.data;
    //         this.sportList.forEach((row, index) => {
    //           row.skin = that.skin;
    //           row.price =
    //             row.type == "MARKET_PRICE"
    //               ? that.$t("exchange.marketprice")
    //               : row.price;
    //         });
    //       }
    //     });
    // },
    getHistoryOrder() {
      //查询历史委托
      this.historyOrder.rows = []; //清空数据
      var params = {};
      params["pageNo"] = this.pageNo - 1;
      params["pageSize"] = this.pageSize;
      params["symbol"] = this.currentCoin.symbol;
      var that = this;
      this.$http
        .post(this.host + this.api.exchange.orderhistory, params)
        .then((response) => {
          var resp = response.body;
          let rows = [];
          if (this.selectedOrder == "history") {
            this.total = resp.totalElements;
          }
          if (resp.content.length > 0) {
            for (var i = 0; i < resp.content.length; i++) {
              var row = resp.content[i];
              if (row) {
                row.skin = that.skin;
                row.price =
                  row.type == "MARKET_PRICE"
                    ? that.$t("exchange.marketprice")
                    : row.price;
                rows.push(row);
              }
            }
            this.historyOrder.rows = rows;
          }
        });
    },
    cancel(index) {
      var order = this.currentOrder.rows[index];
      this.$Modal.confirm({
        title: this.$t("carouselItem.text46"),
        content: this.$t("exchange.undotip"),
        onOk: () => {
          this.$http
            .post(
              this.host + this.api.exchange.orderCancel + "/" + order.orderId,
              {}
            )
            .then((response) => {
              var resp = response.body;
              if (resp.code == 0) {
                if ((this.pageNo - 1) * 10 + 1 == this.total) {
                  this.pageNo -= 1;
                  this.refreshAccount();
                } else {
                  this.refreshAccount();
                }
                this.$Notice.success({
                  title: this.$t("exchange.tip"),
                  desc: this.$t("exchange.cancelsuccess"),
                });
              } else {
                this.$Notice.error({
                  title: this.$t("exchange.tip"),
                  desc: resp.message,
                });
              }
            });
        },
      });
    },
    cancels(index) {
      var order = index;
      this.$Modal.confirm({
        title: this.$t("carouselItem.text46"),
        content: this.$t("exchange.undotip"),
        onOk: () => {
          this.$http
            .post(this.host + this.api.exchange.orderCancelPlan, {
              orderId: order,
            })
            .then((response) => {
              var resp = response.body;
              if (resp.code == 0) {
                if ((this.pageNo - 1) * 10 + 1 == this.total) {
                  this.pageNo -= 1;
                  this.refreshAccount();
                } else {
                  this.refreshAccount();
                }
                this.$Notice.success({
                  title: this.$t("exchange.tip"),
                  desc: this.$t("exchange.cancelsuccess"),
                });
              } else {
                this.$Notice.error({
                  title: this.$t("exchange.tip"),
                  desc: resp.message,
                });
              }
            });
        },
      });
    },
    refreshAccount: function() {
      // this.getCurrentOrder();
      // this.getspotOrder();
      this.getHistoryOrder();
      this.getWallet();
    },
    keyEvent(event) {
      var re1 = new RegExp(
        "([0-9]+.[0-9]{" + this.baseCoinScale + "})[0-9]*",
        ""
      );
      this.form.buy.limitPrice = this.form.buy.limitPrice
        .toString()
        .replace(re1, "$1");
      this.form.sell.limitPrice = this.form.sell.limitPrice
        .toString()
        .replace(re1, "$1");
      this.form.buy.marketAmount = this.form.buy.marketAmount
        .toString()
        .replace(re1, "$1");

      var re2 = new RegExp("([0-9]+.[0-9]{" + this.coinScale + "})[0-9]*", "");
      this.form.buy.limitAmount = this.form.buy.limitAmount
        .toString()
        .replace(re2, "$1");
      this.form.sell.limitAmount = this.form.sell.limitAmount
        .toString()
        .replace(re2, "$1");
      this.form.sell.marketAmount = this.form.sell.marketAmount
        .toString()
        .replace(re2, "$1");
    },
    setPublishProgress() {},
    // 显示隐藏 币种的下拉
    show_list() {
      this.list_show = !this.list_show;
    },
    // 切换买入卖出
    change_color(bool) {
      this.btn_show = bool;
      this.form.buy.marketAmount = "";
      this.form.sell.marketAmount = "";
    },
    // 跳转登录注册页
    goPage(addr) {
      this.$router.push(`/${addr}`);
    },
    initMqtt() {
      // 连接配置选项
      this.$mqttService.initMqtts().then((client) => {
        this.datafeed = new Datafeeds.WebsockFeed(
          this.host + "/market",
          this.currentCoin,
          client
        );
        this.getKline();
        var that = this;
        //订阅深度
        client.subscribe(
          "exchange-depth/" + that.currentCoin.symbol.replace("/", "-"),
          function(err, message) {
            if (!err) {
              client.on("message", (topic, message) => {
                let parts = topic.split("/");
                let firstPart = parts.shift();
                if (firstPart == "exchange-depth") {
                  try {
                    var resp = JSON.parse(message);
                    resp.skin = that.skin;
                    that.fullTrade = resp;
                    that.$refs.depthGraph.draw(resp);
                  } catch (error) {}
                }
              });
            } else {
              console.log("订阅失败");
            }
          }
        );
        //订阅价格变化消息
        client.subscribe("exchange-thumb/#", function(err, message) {
          if (!err) {
            client.on("message", (topic, message) => {
              let parts = topic.split("/");
              let firstPart = parts.shift();
              if (firstPart == "exchange-thumb") {
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
                }
              }
            });
          } else {
            console.log("订阅失败");
          }
        });
        //订阅实时成交信息
        client.subscribe(
          "exchange-trade-pc/" + that.currentCoin.symbol.replace("/", "-"),
          function(err, message) {
            if (!err) {
              client.on("message", (topic, message) => {
                let parts = topic.split("/");
                let firstPart = parts.shift();
                if (firstPart == "exchange-trade-pc") {
                  var resp = JSON.parse(message);
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
        if (that.isLogin) {
          //订阅委托取消信息
          client.subscribe(
            "exchange-order-cancel/" +
              that.member.id +
              "/" +
              that.currentCoin.symbol.replace("/", "-"),
            function(err, message) {
              if (!err) {
                client.on("message", (topic, message) => {
                  let parts = topic.split("/");
                  let firstPart = parts.shift();
                  if (firstPart == "exchange-order-cancel") {
                    var resp = JSON.parse(message);
                    that.refreshAccount();
                  }
                });
              }
            }
          );
          //订阅委托交易完成
          client.subscribe(
            "exchange-order-complete/" +
              that.member.id +
              "/" +
              that.currentCoin.symbol.replace("/", "-"),
            function(err, message) {
              if (!err) {
                client.on("message", (topic, message) => {
                  let parts = topic.split("/");
                  let firstPart = parts.shift();
                  if (firstPart == "exchange-order-complete") {
                    var resp = JSON.parse(message);
                    that.refreshAccount();
                  }
                });
              }
            }
          );
          //订阅委托部分交易
          client.subscribe(
            "exchange-order-trade/" +
              that.member.id +
              "/" +
              that.currentCoin.symbol.replace("/", "-"),
            function(err, message) {
              if (!err) {
                client.on("message", (topic, message) => {
                  let parts = topic.split("/");
                  let firstPart = parts.shift();
                  if (firstPart == "exchange-order-trade") {
                    var resp = JSON.parse(message);
                    that.refreshAccount();
                  }
                });
              }
            }
          );
          //计划委托
          client.subscribe(
            "exchange-spot/" +
              that.member.id +
              "/" +
              that.currentCoin.symbol.replace("/", "-"),
            function(err, message) {
              if (!err) {
                client.on("message", (topic, message) => {
                  let parts = topic.split("/");
                  let firstPart = parts.shift();
                  if (firstPart == "exchange-spot") {
                    var resp = JSON.parse(message);
                    that.sportList = resp;
                  }
                });
              }
            }
          );
          //当前委托
          client.subscribe(
            "current-exchange-order/" +
              that.member.id +
              "/" +
              that.currentCoin.symbol.replace("/", "-"),
            function(err, message) {
              if (!err) {
                client.on("message", (topic, message) => {
                  let parts = topic.split("/");
                  let firstPart = parts.shift();
                  if (firstPart == "current-exchange-order") {
                    var resp = JSON.parse(message);
                    that.currentOrder.rows = resp;
                  }
                });
              }
            }
          );
        }
        //订阅盘口消息
        client.subscribe(
          "exchange-plate/" + that.currentCoin.symbol.replace("/", "-"),
          function(err, message) {
            if (!err) {
              client.on("message", (topic, message) => {
                let parts = topic.split("/");
                let firstPart = parts.shift();
                if (firstPart == "exchange-plate") {
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
                    that.plate.askRows.sort((a, b) => b.price - a.price);
                    that.plate.askTotle = totle;
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
            }
          }
        );
      });
    },
    // 分页
    pageChange(page) {
      this.pageNo = page;
      if (this.selectedOrder == "history") {
        this.getHistoryOrder();
      } else if (this.selectedOrder == "current") {
        // this.getCurrentOrder();
      }
    },
    // 合约精度
    getCoinAllList() {
      this.$http.get(this.host + this.api.exchange.coinAll, {}).then((res) => {
        this.coinAllList = res.body.data;
        let allList = this.getSymboyAccuracy(
          this.coinAllList,
          this.currentCoin.symbol
        );
        this.select_type = allList.split(",");
      });
    },
    linkTo(item) {
      if (item != this.currentCoin.symbol.replace("/", "_").toLowerCase()) {
        let arr = [
          "exchange-trade-pc/" + this.currentCoin.symbol.replace("/", "-"),
          "exchange-plate/" + this.currentCoin.symbol.replace("/", "-"),
        ];
        if (this.isLogin) {
          arr.push(
            "exchange-spot/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-"),
            "current-exchange-order/" +
              this.member.id +
              "/" +
              this.currentCoin.symbol.replace("/", "-")
          );
        }
        this.$mqttService.unsubscribe(arr, function() {});

        this.$router
          .push({
            name: "exchangePair",
            params: {
              pair: item.replace("/", "_").toLowerCase(),
            },
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
  // 在组件销毁之前与mqtt断开连接
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
    // padding: 0 15px;
    width: 100%;
  }

  .trade_menu {
    margin-left: 10px;
  }

  .ivu-tooltip-content {
    position: absolute;
    left: 12px;
    top: -20px;
  }

  .trade_wrap .ivu-form-item-content input {
    padding-left: 25px;
  }

  .symbol {
    padding: 2px 10px !important;
    margin-bottom: 2px !important;
  }

  .imgtable .handler {
    margin-left: 10px;
  }

  .imgtable .mflag {
    z-index: 100;
  }

  .item {
    .price-cny {
      font-size: 12px;
      color: #535353;
    }

    .coin {
      font-size: 14px !important;
    }
  }
}
.xs_table {
  width: 100%;
  overflow-x: scroll;

  &::-webkit-scrollbar {
    height: 2px;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }
}
</style>
<style scoped lang="less">
@import "../../assets/css/exchange.css";
.exchange .ivu-tooltip-inner {
  padding: 2px 5px !important;
  min-height: 24px !important;
}

.exchange {
  color: #161616;
  background-color: #f8f8f8;
  .main_top {
    width: 100%;
    margin-bottom: 4px;
    .all_content {
      width: 100%;
      .Kline_part {
        width: 100%;
        display: flex;
        justify-content: space-between;
        // margin-top: 4px;
        .top {
          width: 85% !important;
          height: 636px;
          display: flex;
          width: 70%;
          .center {
            width: 100%;
            // flex: 0 0 50.8%;
            .box_kline {
              height: 40px;
              background-color: #fff;
              // margin-bottom: 5px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              border-bottom: 1px solid #f8f8f8;
              .box_kline_title {
                font-size: 12px;
                width: 120px;
                background-color: #f8f8f8;
                padding: 0 24px;
                text-align: center;
                line-height: 40px;
              }
              .handler {
                width: 120px;
                height: 30px;
                background-color: #f8f8f8;
                line-height: 30px;
                border-radius: 3px;
                padding: 0 5px;
                margin-right: 20px;
                z-index: 1;
                > span {
                  // background-color: #2c3b59;
                  color: #000000;
                  padding: 4px 8px;
                  cursor: pointer;
                  font-size: 12px;
                  opacity: 0.5;

                  &.active {
                    opacity: 1;
                    background-color: #fff;
                    border-radius: 3px;
                  }
                }
              }
            }
            .imgtable {
              // height: 439px;
              position: relative;
              overflow: hidden;
            }
            .trade_wrap {
              width: 100%;
              .trade_menu {
                position: relative;
                background-color: #ffffff;
                border-top-left-radius: 0px;
                border-top-right-radius: 0px;
                // border-bottom: 1px solid #27313e;
                font-size: 0;
                height: 40px;
                line-height: 40px;
                margin-bottom: 20px;
                > span {
                  font-size: 16px;
                  padding: 11px 20px;
                  cursor: pointer;
                  &.active {
                    color: #fff;
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
                  top: 550;
                  left: 10px;
                  z-index: 100;
                  font-size: 24px;
                  .login_btn {
                    width: 251px;
                    height: 40px;
                    background-color: #03c59e;
                    color: #fff;
                    text-align: center;
                    line-height: 40px;
                    margin: 0 auto;
                  }
                }
                .publish-mask {
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  // background-color: rgba(0, 37, 64, 0.93);
                  justify-content: center;
                  align-items: center;
                  z-index: 101;
                  font-size: 24px;
                  border-radius: 0px;
                  // color: #bcd7e6;
                }
              }
              .trade_panel .panel .hd {
                border-bottom: none;
                b {
                  color: #fff;
                }
                a {
                  color: #03c59e;
                }
              }
            }
          }
        }
      }
    }
    .center_right {
      width: 313px;
      margin-right: 5px;
      border-radius: 0px;
      overflow: hidden;
      background-color: #ffffff;
      .plateAllTitle {
        background-color: #fff;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.87);
        border-bottom: 1px solid #f0f0f0;
      }
      .plate-nowprice {
        text-align: center;
        background-color: #27313e;
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
          color: rgb(80, 80, 80);
        }
      }
    }

    .right {
      height: 500px;
      width: 20%;
    }
  }

  .symbol {
    display: flex;
    padding: 15px 30px;
    margin-bottom: 5px;
    height: 61px;
    align-items: center;
    background-color: #ffffff;
    line-height: 1;
    border-radius: 0px;
    box-sizing: border-box;

    .item {
      margin: 0 20px;
      .price-cny {
        font-size: 12px;
        color: #000000;
      }

      .coin {
        font-size: 20px;
      }

      .text {
        width: 100%;
        display: block;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.54);
        margin-bottom: 5px;
      }

      .num {
        font-size: 12px;
        color: #000000;
      }

      > img {
        display: block;
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
    }
  }

  .order {
    min-height: 227px;
    margin-top: 10px;
    margin-right: 5px;
    color: #666666;
    background-color: #fff;
    .order-handler {
      background-color: #fff;
      font-size: 0;
      > span {
        padding: 0 20px;
        font-size: 14px;
        display: inline-block;
        color: #1d1c1c;
        cursor: pointer;
        line-height: 30px;
        background-color: #fff;

        &.active {
          color: #03c59e;
          background-color: #fff;
          border-bottom: 2px solid #03c59e;
        }

        &:first-child {
          border-top-left-radius: 0px;
        }

        &:last-child {
          border-top-right-radius: 0px;
        }
      }
    }
  }
}

.exchange.day {
  color: #333;
  background-color: #f8f8f8;

  .main_top {
    .left {
      position: absolute;
      top: 112px;
      left: 0px;
      width: 360px;
      height: 532px;
      background-color: #ffffff;
      // box-shadow: 0 0 2px #ccc;
      z-index: 99;
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
      // border-radius: 6px;
      box-shadow: 0 0 2px #ccc;

      .handler {
        > span {
          border: 1px solid #333;
        }
      }
    }

    .trade_wrap {
      position: relative;
      // box-shadow: 0 0 2px #ccc;
      .trade_menu_title {
        background-color: #ffff;
        height: 40px;
        line-height: 40px;
        padding-left: 5px;
        color: #000000;
        font-size: 13px;
        border-bottom: 1px solid #f0f0f0;
      }
      .btn_sellBuy {
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin-top: 20px;
        margin-bottom: 20px;
        cursor: pointer;
        .sellBuy_btn {
          width: 126px;
          height: 36px;
          background-color: #f2f2f2;
          line-height: 36px;
          text-align: center;
          color: #000000;
          border-radius: 3px;
        }
        .sellBuy_btn_green {
          width: 126px;
          height: 36px;
          background-color: #03c59e;
          line-height: 36px;
          text-align: center;
          color: #fff;
          border-radius: 3px;
        }
        .sellBuy_btn_red {
          width: 126px;
          height: 36px;
          background-color: #f14a3e;
          line-height: 36px;
          text-align: center;
          color: #fff;
          border-radius: 3px;
        }
      }
      .trade_menu {
        background-color: #fff;
        padding: 5px;
        box-sizing: border-box;
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
        .panel {
          width: 100%;
          .bd {
            width: 100%;
          }
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

    .handlers {
      background-color: #fff;
    }

    .plate-nowprice {
      background-color: #fff;
      border-top: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
    }
    .center_right {
      border: 1px solid #f0f0f0;
      .coin-menu {
        background-color: #fff;
      }
    }
  }

  .symbol {
    background-color: #fff;
    box-shadow: 0 0 2px #ccc;

    .item {
      .text {
        color: #999;
      }

      .num {
        color: #000000;
      }
    }
  }

  .order {
    // box-shadow: 0 2px 2px #ccc;
    min-height: 227px;

    .order-handler {
      // margin-right: -2px;
      background-color: #fff;

      > span {
        color: #1d1c1c;
        background-color: #fff;
        // box-shadow: 0 0 2px #ccc;

        &.active {
          color: #03c59e;
          background-color: #fff;
        }
      }
    }
  }
}

#kline_container {
  background: #ffffff;
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
.sell_total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid #cccccc;
  margin: 20px 0;
  border-radius: 10px;
}
.hd_login {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.login_register {
  width: 100%;
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
.my_coin {
  width: 100%;
  border-top: 1px solid #f0f0f0;
}
.my_coin_row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  padding: 0 10px;
  box-sizing: border-box;
  font-size: 12px;
}
.my_coin_row_title {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
}
.container {
  display: flex;
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
/deep/.ivu-table-header {
  font-weight: 400;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.54);
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
</style>
