<template>
  <div class="user_content">
    <div class="user_auth_title flex_1200">
      <div style="padding-right: 16px;">
        <h1 style="color: #1C1C1C;font-weight: 500;" class="text-2xl">
          {{$t('buyCoin.pages.userCenter.txt3')}}
        </h1>
        <p class="text-t2" style="margin: 16px 0">
          {{$t('carouselItem.text175')}}
        </p>
        <a class="flex text_c" href="" target="_blank">{{$t('carouselItem.text176')}} ></a>
      </div>
    </div>

    <div class="user_auth_part flex_1200">
      <div style="padding: 0 48px;width: 400px;">
        <div class="user_auth_part_title">{{$t('carouselItem.text177')}}</div>
        <div class="user_auth_part_tips">
          <ul>
            <li>
              <!-- <img src="https://www.BIKA.pro/assets/icon-card-1-c2c35697.svg" class="w-5 h-5"> -->
              <span>{{$t('carouselItem.text178')}}</span>
            </li>
          </ul>
          <div style="margin-top:28px"></div>
        </div>
        <div class="user_auth_part_button">
          <Button disabled type="primary" class="btn_success">
            <Icon size="20" type="ios-checkmark-circle" />
            {{$t('new.user.certified')}}
          </Button>
        </div>
        <h2 class="user_auth_part_title" style="margin: 88px 0 32px">
          {{$t('carouselItem.text179')}}
        </h2>
        <ul class="user_auth_part_list">
          <li class="mb-8 last">
            <div class="text-t2">{{$t('carouselItem.text180')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>2,000 USDT 每日</p>
            </div>
          </li>
          <li class="mb-8 last">
            <div class="text-t2">{{$t('new.universal.contractTrading')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>{{$t('carouselItem.text181')}}</p>
            </div>
          </li>
          <li class="mb-8 last">
            <div class="text-t2">{{$t('new.universal.spotTrading')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>{{$t('carouselItem.text181')}}</p>
            </div>
          </li>
        </ul>
      </div>

      <div style="padding: 0 48px;width: 400px;">
        <div class="user_auth_part_title">{{$t('carouselItem.text182')}}</div>
        <div class="user_auth_part_tips">
          <ul>
            <li>
              <!-- <img src="https://www.BIKA.pro/assets/icon-card-1-c2c35697.svg" class="w-5 h-5"> -->
              <span>{{ $t('carouselItem.text183') }}</span>
            </li>
            <li style="margin: 16px 0;">
              <!-- <img src="https://www.BIKA.pro/assets/icon-card-2-d1a4107d.svg" class="w-5 h-5"> -->
              <span>{{$t("new.user.IDCard")}}&amp;{{$t("new.user.passport")}}</span>
            </li>
            <li>
              <!-- <img src="https://www.BIKA.pro/assets/icon-card-3-e57a666a.svg" class="w-5 h-5"> -->
              <span>{{$t('carouselItem.text184')}}</span>
            </li>
          </ul>
          <div style="margin-top:28px"></div>
        </div>
        <div class="user_auth_part_button">
          <Button class="" type="primary">{{$t('carouselItem.text185')}}</Button>
        </div>
        <h2 class="user_auth_part_title" style="margin: 88px 0 32px">
          {{$t('carouselItem.text186')}}
        </h2>
        <ul class="user_auth_part_list">
          <li class="mb-8 last">
            <div class="text-t2">{{$t('carouselItem.text180')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>800,000 USDT {{$t('carouselItem.text187')}}</p>
            </div>
          </li>
          <li class="mb-8 last">
            <div class="text-t2">{{$t('new.universal.contractTrading')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>{{$t('carouselItem.text181')}}</p>
            </div>
          </li>
          <li class="mb-8 last">
            <div class="text-t2">{{$t('new.universal.spotTrading')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>{{$t('carouselItem.text181')}}</p>
            </div>
          </li>
        </ul>
      </div>

      <div style="padding: 0 48px;width: 400px;">
        <div class="user_auth_part_title">{{$t('carouselItem.text190')}}</div>
        <div class="user_auth_part_tips">
          <ul class="space-y-4 min-h-[96px]">
            <li class="flex items-center space-x-2">
              <!-- <img src="https://www.BIKA.pro/assets/icon-card-1-c2c35697.svg" class="w-5 h-5"> -->
              <span> {{$t('carouselItem.text188')}}</span>
            </li>
          </ul>
          <div style="margin-top:28px"></div>
        </div>
        <div class="user_auth_part_button">
          <Button disabled class="" type="primary">{{$t('carouselItem.text189')}}</Button>
        </div>
        <h2 class="user_auth_part_title" style="margin: 88px 0 32px">
          {{$t('carouselItem.text186')}}
        </h2>
        <ul class="user_auth_part_list">
          <li class="mb-8 last">
            <div class="text-t2">{{$t('carouselItem.text180')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>1,500,000 USDT {{$t('carouselItem.text187')}}</p>
            </div>
          </li>
          <li class="mb-8 last">
            <div class="text-t2">{{$t('new.universal.contractTrading')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>{{$t('carouselItem.text181')}}</p>
            </div>
          </li>
          <li class="mb-8 last">
            <div class="text-t2">{{$t('new.universal.spotTrading')}}</div>
            <div class="mt-2 text-xs text-t1">
              <p>{{$t('carouselItem.text181')}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <FooterPart></FooterPart>
  </div>
</template>

<script>
import FooterPart from "../../components/footerPart.vue";
export default {
  components: {
    FooterPart,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
@import url("../../assets/css/common.less");
.user_content {
  padding-top: 50px;
  background-color: #f8f8f8;
  .user_auth_title {
    padding: 48px;
    position: relative;
    display: flex;
    justify-content: space-between;
    border-radius: 4px;
    background-color: #ffffff;
    margin-top: 16px;
  }
  .user_auth_part {
    display: flex;
    padding: 48px 0;
    border-radius: 4px;
    background-color: #ffffff;
    margin-top: 16px;
    .user_auth_part_title {
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }
    .user_auth_part_tips {
      height: 160px;
      margin-top: 24px;
      li {
        display: flex;
        align-items: center;
        span {
          margin-left: 8px;
        }
      }
    }
    .user_auth_part_button {
      height: 48px;
      button {
        height: 48px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .user_auth_part_list {
      li {
        margin-bottom: 32px;
      }
    }
  }
}

.btn_success {
  color: #03C59E;
  background-color: #e5f9f0;
}
.btn_success:hover {
  color: #03C59E;
  background-color: #e5f9f0;
}
.last:last-child {
  margin-bottom: 0px !important;
}
</style>
