<template>
	<div class="main">
		<div class="main_content">

			<div class="header_part">
				<p class="header_part_title">
					<span style="color: #8aff61;">5,440 USDT</span>等您領取
				</p>
				<p class="header_part_detail">新人專屬福利，海量USDT派送中</p>
				<p class="header_part_detail" style="color: #8aff61;">可使用体验金余额: 0USDT</p>
				<div class="header_part_btns">
					<button @click="$router.push('/markets')" class="header_part_use">
						待使用 ---
					</button>
					<!-- <Icon size="23" style="margin-left: 18px;" type="ios-open-outline" /> -->
				</div>
				<div class="header_part_bg">
					<img  :src="$imgUrl + '/rewards/header_bg.png'" class="" alt="">
				</div>
			</div>

			<div class="task basic_task">
				<div class="task_title">
					<div style="font-weight: 600;">基礎任務</div>
					<img style="width: 34px; margin-left: 24px;" :src="$imgUrl + '/rewards/arrow.png'">
				</div>
				<div class="task_content">
					<div class="grid">
						<div class="grid_content" v-for="item in list">
							<div class="ticket">
								<p class="point" style="left: 0px;"></p>
								<p class="point" style="right: 0px;"></p>
								<div class="ticket_bg">
									<p style="justify-content: center;display: flex;">
										<img class="" :src="$imgUrl + '/rewards/line_star.svg'" alt="">
										<span class="">Bonus</span>
										<img style="transform: rotateY(180deg)" :src="$imgUrl + '/rewards/line_star.svg'" alt="">
									</p>
									<p class="ticket_num">40 USDT</p>
								</div>
							</div>
							<div style="height: 135px"></div>
							<div class="ticket_bottom">
								<div style="flex: 1 1 0%;">
									<p style="font-size: 14px;line-height: 20px;">首次入金≥10 USDT</p>
								</div>
								<button class="ticket_btn">充值</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="task nex_task">
				<div class="task_title" style="margin-top: 40px;">
					<div style="font-weight: 600;">進階任務</div>
					<img style="width: 34px; margin-left: 24px;" :src="$imgUrl + '/rewards/arrow.png'">
				</div>
				<div class="task_content">
					<div class="grid">
						<div class="grid_content" v-for="item in list2">
							<div class="ticket">
								<p class="point" style="left: 0px;"></p>
								<p class="point" style="right: 0px;"></p>
								<div class="ticket_bg" style="background-color: #8aff61;">
									<p style="justify-content: center;display: flex;">
										<img class="" :src="$imgUrl + '/rewards/line_star.svg'" alt="">
										<span class="">Bonus</span>
										<img style="transform: rotateY(180deg)" :src="$imgUrl + '/rewards/line_star.svg'" alt="">
									</p>
									<p class="ticket_num">40 USDT</p>
								</div>
							</div>
							<div style="height: 135px"></div>
							<div class="ticket_bottom">
								<div style="flex: 1 1 0%;">
									<p style="font-size: 14px;line-height: 20px;">首次入金≥10 USDT</p>
								</div>
								<button class="ticket_btn" style="color: #8aff61; border-color: #8aff61;">充值</button>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="task question_task">
				<div class="task_title" style="margin-top: 40px;">
					<div style="font-weight: 600;">常見問題</div>
					<img style="width: 34px; margin-left: 24px;" :src="$imgUrl + '/rewards/arrow.png'">
				</div>
				<div class="question_content part_content">
					<Collapse simple>
						<Panel name="1">
							1.誰有資格獲得新人獎勵？
								<p slot="content">自2023年8月9日08:00 (UTC) 起所有新註冊的用戶均可通過完成任務獲取獎金。</p>
						</Panel>
						<Panel name="2">
							2.如何使用體驗金？
								<p slot="content">
									<ul class="">
										<li>1) SE 體驗金優勢：無需充值即可使用；盈利部分可以隨時取出；優先抵扣虧損和手續費。</li>
										<li>2) 進入合約交易頁面，選擇 BTCUSDT 或者 ETHUSDT 交易對，設置槓桿倍數，選擇開多或者開空，成交後即可完成體驗金開倉。</li>
										<li>3) 用戶可在“個人中心”的“卡券中心”查看並使用體驗金。</li>
									</ul>
								</p>
						</Panel>
						<Panel name="3">
							3.如何充值和交易？
								<p slot="content">
									<ul class="">
										<li>1) 如何充值？登錄SE後，進入資產頁面，點擊“充值”按鈕，選擇USDT和充值的鏈，複製充幣地址或者掃描二維碼，即可完成充值。</li>
										<li>請注意選擇充幣的網絡和提幣平臺網絡保持一致，否則會資產丟失。充幣金額需大於本平臺最小充幣額度，否則會影響到賬。</li>
										<li>2) 如何現貨交易? 登錄SE後，進入現貨交易頁面，選擇您想交易的幣種，輸入價格後，選擇買入或者賣出，即可完成現貨交易。</li>
										<li>3) 如何合約交易？登錄SE後，進入合約交易頁面，將資產劃轉至合約賬戶，選擇您想交易的幣種，調整槓桿倍數和開倉比例，選擇開多或開空，即可完成合約交易。</li>
									</ul>
								</p>
						</Panel>
					</Collapse>
				</div>
			</div>

			<!-- 了解更多 -->
			<div class="flex justify-center" style="margin-top: 40px;text-align: center;">
				<a class="flex items-center justify-center" target="_blank" href="https://support.BIKA.pro/hc/zh-tw/articles/7617340384015">
					<span style="color: #8aff61;">了解更多</span>
					<Icon color="#ffffff" type="md-arrow-dropright" />
				</a>
			</div>

		</div>

  
		<!-- 底部 -->
    <FooterPart></FooterPart>

	</div>
</template>

<script>
import FooterPart from '../../components/footerPart.vue'
export default {
	name: 'rewards',
	components: {
		FooterPart,
	},
	data() {
		return {
			list: [{}, {}, {}],
			list2: [{}, {}, {}, {}, {}, {}],
		}
	},
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/common.less');
.main {
	padding-top: 50px;
	background-color: #111417;
	color: #ffffff;
	.main_content {
		padding-bottom: 80px;
		width: 1200px;
		margin: 0 auto;
		.header_part {
			padding-top: 66px;
			position: relative;
			.header_part_title {
				line-height: 52px;
				font-weight: 700;
				font-size: 44px;
			}
			.header_part_detail {
				color: #99a1a8;
				font-size: 16px;
    		line-height: 24px;
				margin-top: 16px;
			}
			.header_part_btns {
				display: flex;
				align-items: center;
				margin-top: 46px;
				margin-bottom: 96px;
				.header_part_use {
					color: #8aff61;
					line-height: 20px;
					padding: 10px 40px;
					background-color: rgb(21, 21, 21);
					border: 1px solid #8aff61;
					border-radius: 34px;
					cursor: pointer;
					outline: none;
				}
			}
			.header_part_bg {
				overflow: hidden;
				width: 764px;
				height: 362px;
				top: 0px;
				right: -165px;
				position: absolute;
				img {
					width: 764px;
					height: 456px;
					margin-top: -94px;
					display: block;
				}
			}
		}
		.task {
			.task_title {
				margin-bottom: 28px;
				font-size: 24px;
				line-height: 32px;
				justify-content: flex-start;
				align-items: center;
				width: 100%;
				display: flex;
			}
			.task_content {
				width: 100%;
				min-height: 240px;
				.grid {
					display: grid;
					grid-template-columns: repeat(3,minmax(0,1fr));
					.grid_content {
						width: 390px;
						margin-bottom: 30px;
						background-color: #000000;
						border: 1px solid #272828;
						border-radius: 12px;
						flex-direction: column;
						transform-origin: center;
						display: flex;
						position: relative;
						.ticket {
							padding: 0px 10px;
							width: 100%;
							height: calc(100% - 20px);
							top: 10px;
							left: 0px;
							position: absolute;
							.point {
								width: 18px;
								height: 18px;
								top: 40px;
								background-color: #111417;
								border-radius: 9999px;
								position: absolute;
							}
							.ticket_bg {
								padding-top: 32px;
								text-align: center;
								background-color: #ffd705;
								border-radius: 12px;
								width: 100%;
								height: 100%;
								img {
									width: 71px;
									max-width: 100%;
									height: auto;
								}
								span {
									color: #000;
									line-height: 18px;
									font-weight: 500;
									font-size: 16px;
									margin: 0 20px;
								}
								.ticket_num {
									line-height: 56px;
									font-size: 48px;
									margin-top: 12px;
									color: #000;
									font-weight: 700;
								}
							}
						}
						.ticket_bottom {
							z-index: 999;
							padding: 16px 20px;
							background-color: rgba(34, 34, 34, 0.94);
							border-bottom-right-radius: 8px;
    					border-bottom-left-radius: 8px;
							justify-content: space-between;
							align-items: center;
							flex: 1 1 0%;
							width: 100%;
							display: flex;
							.ticket_btn {
								margin-left: 16px;
								padding: 11px 4px;
								width: 108px;
								color: #ffd705;
								line-height: 18px;
								font-size: 14px;
								text-align: center;
								background-color: #000000;
								border: 1px solid #ffd705;
								border-radius: 32px;
								outline: none;
								cursor: pointer;
							}
						}
					}
				}
			}
		}
	}
}
</style>