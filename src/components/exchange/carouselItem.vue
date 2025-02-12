<template>
  <div class="trader_part">
    <div class="trader_part_left">
      <div class="trader_part_left_title">
        <p class="left_title_one">{{ $t("carouselItem.text1") }}</p>
        <p class="left_title_two">{{ $t("carouselItem.text2") }}</p>
      </div>
      <div class="trader_part_left_title_two">
        <p>{{ $t("carouselItem.text3") }}</p>
        <p>90%</p>
        <p>{{ $t("carouselItem.text4") }}</p>
        <p>20%+</p>
      </div>
      <div class="trader_part_left_title_three">
        <div class="title_three_blone">
          <div>90%</div>
          <div>{{ $t("carouselItem.text5") }}</div>
        </div>
        <div class="title_three_blone">
          <div>20%</div>
          <div>{{ $t("carouselItem.text6") }}</div>
        </div>
      </div>
      <div class="trader_part_left_title_btn" @click="go_allPage()">
        {{ $t("carouselItem.text7") }}
      </div>
    </div>
    <div class="container">
      <div class="card-box">
        <div
          class="card"
          v-for="(item, index) in allval"
          :key="index"
          v-show="index == fieldOne"
          @click="go_page(item.memberId)"
        >
          <div class="card_head_logo">
            <img :src="$imgUrl + '/index/1.svg'" alt="" class="my9_img" />
            <div class="card_head_logo_title">
              {{ $t("carouselItem.text8") }}
            </div>
            <img
              :src="$imgUrl + '/index/1.svg'"
              alt=""
              class="my9_img_rotate"
            />
          </div>
          <div class="card_head_box">
            <div class="head_img">
              <div>
                <img
                  :src="item.headUrl"
                  style="width: 44px;height: 44px;border-radius: 50%;"
                />
              </div>
              <div class="head_img_title">
                <div class="head_img_title_name">{{ item.nickName }}</div>
                <div class="head_img_title_two">
                  <img
                    :src="$imgUrl + '/index/icon1.jpg'"
                    alt=""
                    style="width: 16px;height: 16px;"
                  />
                  <div>{{ item.ddPeopleSz }}/{{ item.ddPeople }}</div>
                </div>
              </div>
            </div>
            <div class="head_averter">
              <div class="head_averter_one">
                <div
                  class="head_averter_one_left"
                  :class="[item.ninetyEarningPer > 0 ? 'green' : 'red']"
                >
                  {{ Number(item.ninetyEarningPer).toFixed(2) }}%
                </div>
                <div class="head_averter_one_right">
                  <div class="one_right_avter">
                    <img
                      :src="$imgUrl + '/index/head2.png'"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      :src="$imgUrl + '/index/head3.png'"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      :src="$imgUrl + '/index/head4.png'"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      :src="$imgUrl + '/index/head5.png'"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">{{ item.ddPeopleSz }}</div>
                </div>
              </div>
              <div class="head_averter_two">{{ $t("carouselItem.text9") }}</div>
            </div>
            <div
              :id="'chart' + index"
              style="width:284px; height:78px;margin-top: 20px;margin-bottom:10px;margin-left: -10px;"
            ></div>
            <div class="bottom_container">
              <div>{{ $t("carouselItem.text10") }}</div>
              <div>${{ Number(item.ddSyUsdt).toFixed(4) }}</div>
            </div>
            <div class="bottom_container">
              <div>{{ $t("carouselItem.text11") }}</div>
              <div>{{ Number(item.ddYlSz / item.ddTransSz).toFixed(2) }}%</div>
            </div>
          </div>
        </div>
        <!-- <div class="card" :style="boxStyle(fieldTwo)">
          <div class="card_head_logo">
            <img src="../../assets/images/1.svg" alt="" class="my9_img" />
            <div class="card_head_logo_title">熱門交易員</div>
            <img
              src="../../assets/images/1.svg"
              alt=""
              class="my9_img_rotate"
            />
          </div>
          <div class="card_head_box">
            <div class="head_img" v-show="fieldTwo == 1">
              <div>
                <img
                  :src="allval[1].headUrl"
                  style="width: 44px;height: 44px;border-radius: 50%;"
                />
              </div>
              <div class="head_img_title">
                <div class="head_img_title_name">{{ allval[1].nickName }}</div>
                <div class="head_img_title_two">
                  <img
                    src="../../assets/images/icon1.jpg"
                    alt=""
                    style="width: 16px;height: 16px;"
                  />
                  <div>{{ allval[1].ddPeopleSz }}/{{ allval[1].ddPeople }}</div>
                </div>
              </div>
            </div>
            <div class="head_averter">
              <div class="head_averter_one">
                <div
                  class="head_averter_one_left"
                  :class="[allval[1].ninetyEarningPer > 0 ? 'green' : 'red']"
                >
                  {{ allval[0].ninetyEarningPer }}%
                </div>
                <div class="head_averter_one_right">
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head2.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head3.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head4.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head5.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">{{ allval[1].ddPeopleSz }}</div>
                </div>
              </div>
              <div class="head_averter_two">90日收益率</div>
            </div>
            <div
              id="curve1"
              style="width:284px; height:78px;margin-top: 20px;margin-bottom:10px;"
            ></div>
            <div class="bottom_container">
              <div>近三週收益</div>
              <div>${{ allval[1].ddSyUsdt }}</div>
            </div>
            <div class="bottom_container">
              <div>近三周勝率</div>
              <div>{{ allval[1].ddYlSz / allval[1].ddTransSz }}%</div>
            </div>
          </div>
        </div> -->
        <!-- <div class="card" :style="boxStyle(fieldThree)">
          <div class="card_head_logo">
            <img src="../../assets/images/1.svg" alt="" class="my9_img" />
            <div class="card_head_logo_title">熱門交易員</div>
            <img
              src="../../assets/images/1.svg"
              alt=""
              class="my9_img_rotate"
            />
          </div>
          <div class="card_head_box">
            <div class="head_img" v-show="fieldThree == 1">
              <div>
                <img
                  :src="allval[2].headUrl"
                  style="width: 44px;height: 44px;border-radius: 50%;"
                />
              </div>
              <div class="head_img_title">
                <div class="head_img_title_name">{{ allval[2].nickName }}</div>
                <div class="head_img_title_two">
                  <img
                    src="../../assets/images/icon1.jpg"
                    alt=""
                    style="width: 16px;height: 16px;"
                  />
                  <div>{{ allval[2].ddPeopleSz }}/{{ allval[2].ddPeople }}</div>
                </div>
              </div>
            </div>
            <div class="head_averter">
              <div class="head_averter_one">
                <div
                  class="head_averter_one_left"
                  :class="[allval[2].ninetyEarningPer > 0 ? 'green' : 'red']"
                >
                  {{ allval[0].ninetyEarningPer }}%
                </div>
                <div class="head_averter_one_right">
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head2.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head3.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head4.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">
                    <img
                      src="../../assets/images/head5.png"
                      style=" width: 16px;height: 16px;border-radius: 50%;"
                      alt=""
                    />
                  </div>
                  <div class="one_right_avter">{{ allval[2].ddPeopleSz }}</div>
                </div>
              </div>
              <div class="head_averter_two">90日收益率</div>
            </div>
            <div
              id="curve2"
              style="width:284px; height:78px;margin-top: 6%;margin-bottom:10px;"
            ></div>
            <div class="bottom_container">
              <div>近三週收益</div>
              <div>${{ allval[2].ddSyUsdt }}</div>
            </div>
            <div class="bottom_container">
              <div>近三周勝率</div>
              <div>{{ allval[2].ddYlSz / allval[2].ddTransSz }}%</div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div @click="translateCard" class="container_btn">
      <img :src="$imgUrl + '/index/home_more.png'" alt="" class="next_img" />
    </div>
  </div>      
</template>

<script>
import * as echarts from "echarts";
import $ from "@js/jquery.min.js";
export default {
  data() {
    return {
      // 3d
      MEMBER: {},
      transformValue1: ["1", "2", "3"],
      currentIndex: 0,
      allval: {},
      // 折线图配置
      chartConfig: {
        color: ["#03C59E"],
        xAxis: {
          type: "category",
          boundaryGap: false,
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
          splitLine: { show: false },
        },
        grid: {
          show: false,
        },
        series: [
          {
            type: "line",
            data: [], // 自定义数据点
            // smooth: true,
            symbol: "none",
            areaStyle: {
              opacity: 0.8,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#03C59E50",
                },
                {
                  offset: 1,
                  color: "#03C59E00",
                },
              ]),
            },
          },
        ],
      },
    };
  },
  created() {
    // this.MEMBER = JSON.parse(localStorage.getItem("MEMBER"));
    this.getTraderListval();
  },
  mounted() {},
  methods: {
    getTraderListval() {
      // if(this.isLogin){
      // console.log("顶级交易员")
      var paramTraderList = {
        // loginMemberId: this.MEMBER.id,
        type: "0",
      };
      this.$http
        .get(this.host + this.api.index.getTraderList, paramTraderList)
        .then((res) => {
          // console.log("顶级交易员", res)
          this.allval = res.data.data;
          res.data.data.map((item, index) => {
            // if (index < 5) {
            //   this.allval.push(item);
            this.$nextTick(() => {
              this.drawLines(item, index);
            });
            // }
          });
        }).catch(error => {
        })
      // }
    },
    // 点击切换
    // boxStyle(index) {
    //   // 假设每个盒子在 Z 轴上的距离是 100px
    //   const translateZ = -(index * 400) + "px";
    //   const translateX = index * 80 + "px";
    //   const translateY = index * 10 + "px";
    //   const indexs = 10 - index;
    //   const heights = 370 - index * 30 + "px";
    //   return {
    //     transform: `translate3d(${translateX}, ${translateY}, ${translateZ})`,
    //     transition: "transform 0.3s ease-in-out", // 可选的过渡效果
    //     // 其他可能的样式，如宽度、高度、背景色等...
    //     width: "332px",
    //     height: `${heights}`,
    //     backgroundColor: "rgba(255, 255, 255, " + 1.8 / index + ")", // 不同的透明度以增加层次感
    //     zIndex: `${indexs}`,
    //   };
    // },
    //点击切换
    translateCard() {
      this.currentIndex++;
    },
    drawLines(chartData, index) {
      let myChart = echarts.init(document.getElementById("chart" + index));
      this.chartConfig.series[0].data = chartData.syPer;
      myChart.setOption(this.chartConfig);
    },
    go_page(id) {
      this.$router.push(`/follow/leaderDetail?id=${id}`);
    },
    go_allPage() {
      this.$router.push("/follow");
    },
  },
  computed: {
    // 3d
    fieldOne() {
      return this.currentIndex % this.allval.length;
    },
    isLogin: function () {
      return this.$store.getters.isLogin;
    },
    // fieldOne() {
    //   return this.transformValue1[
    //     this.currentIndex % this.transformValue1.length
    //   ];
    // },
    // fieldTwo() {
    //   return this.transformValue1[
    //     (this.currentIndex + 1) % this.transformValue1.length
    //   ];
    // },
    // fieldThree() {
    //   return this.transformValue1[
    //     (this.currentIndex + 2) % this.transformValue1.length
    //   ];
    // },
  },
};
</script>

<style scoped lang="less">
.trader_part {
  margin-top: 32px;
  height: 450px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .trader_part_left {
    height: 540px;
    .trader_part_left_title {
      display: flex;
      align-items: center;
      .left_title_one {
        font-size: 30px;
        font-weight: 700;
      }
      .left_title_two {
        font-size: 30px;
        font-weight: 700;
        color: #03C59E;
      }
    }
    .trader_part_left_title_two {
      margin-top: 8px;
      display: flex;
      align-items: center;
      p:nth-child(1) {
        color: #6f6f6f;
        font-size: 14px;
      }
      p:nth-child(2) {
        color: #03C59E;
        font-size: 14px;
      }
      p:nth-child(3) {
        color: #6f6f6f;
        font-size: 14px;
      }
      p:nth-child(4) {
        color: #03C59E;
        font-size: 14px;
      }
    }
    .trader_part_left_title_three {
      margin: 24px 0 32px;
      display: flex;
      align-items: center;
      .title_three_blone {
        height: 60px;
        margin-right: 32px;
        div:nth-child(1) {
          font-size: 24px;
          color: #1c1c1c;
          font-weight: 700;
        }
      }
    }
    .trader_part_left_title_btn {
      width: 168px;
      height: 48px;
      border-radius: 24px;
      background-color: #03C59E;
      color: #fff;
      text-align: center;
      line-height: 48px;
      font-size: 16px;
    }
  }
  .container {
    // width: 500px;
    height: 450px;
    margin-top: -60px;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .card-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .card {
    position: absolute;
    left: 0;
    top: 0;
    width: 286px;
    height: 350px;
    box-shadow: 0 0 30px 0 rgba(172, 172, 172, 0.4);
    border-radius: 5px;
    .card_head_logo {
      display: flex;
      justify-content: center;
      margin-top: -7px;
      .my9_img {
        height: 24px;
      }
      .my9_img_rotate {
        height: 24px;
        transform: rotateY(180deg);
      }
      .card_head_logo_title {
        width: 84px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        background-color: #03C59E;
        color: #fff;
        font-size: 12px;
      }
    }
    .card_head_box {
      padding: 24px;
      box-sizing: border-box;
      .head_img {
        display: flex;
        align-items: center;
        .head_img_title {
          margin-left: 20px;
          .head_img_title_name {
            font-size: 18px;
            color: #1c1c1c;
          }
          .head_img_title_two {
            display: flex;
            align-items: center;
            font-size: 12px;
            color: #6f6f6f;
          }
        }
      }
      .head_averter {
        margin-top: 24px;
        .head_averter_one {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .head_averter_one_left {
            font-size: 20px;
          }
          .green {
            color: #03C59E;
          }
          .red {
            color: #fa4a3e;
          }
          .head_averter_one_right {
            width: 60px;
            display: flex;
            .one_right_avter {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background-color: #f5f5f5;
              color: #1c1c1c;
              font-size: 12px;
              text-align: center;
              line-height: 16px;
              margin-left: -4px;
            }
          }
        }
        .head_averter_two {
          margin-top: 4px;
          font-size: 12px;
          color: #6f6f6f;
        }
      }
      .bottom_container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;
        div:nth-child(1) {
          font-size: 12px;
          color: #6f6f6f;
        }
        div:nth-child(2) {
          font-size: 12px;
          color: #1c1c1c;
        }
      }
    }
  }
}
.container_btn {
  cursor: pointer;
  margin-top: -120px;
  .next_img {
    width: 20px;
    height: 20px;
    margin-left: -50px;
  }
}
</style>
