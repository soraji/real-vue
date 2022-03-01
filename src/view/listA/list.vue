<template>
	<div class="content">
		<form ref="form1">
			<table class="content_table">
				<tr>
					<td>
						<table class="content_table_title">
							<tr>
								<th class="title num">No</th>
								<th class="title name">제목</th>
								<th class="title author">기자</th>
								<th class="title source">출처</th>
								<th class="title date">날짜</th>
								<th class="title url">이동</th>
								<th class="title trash">삭제</th>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<div class="spinner" v-if="loading">
							<!--로딩이 true일때-->
							<fade-loader :loading="loading" :color="color"></fade-loader>
						</div>
						<div v-else>
							<!--로딩이 false일때-->
							<div v-if="totalCount == 0">
								<table class="datanone">
									<tr>
										<td class="noDataScrollBlind">
											<div>검색된 데이터가 없습니다</div>
										</td>
									</tr>
								</table>
							</div>
							<div v-else class="list_div">
								<!-- totalCount가 0이 아니면 -->
								<table
									class="main_list"
									v-for="(item, i) in listArray"
									:key="i"
								>
									<tr>
										<td class="num txt_center">{{ i + 1 }}</td>
										<td class="name">
											<span
												class="txt_pointer"
												v-on="
													i >= 0 && i < 5
														? { click: () => {} }
														: {
																click: () => {
																	detailGo(item);
																},
														  }
												"
												>{{ item.title }}</span
											>
										</td>
										<td class="author">{{ item.author }}</td>
										<td class="source">{{ item.source.name }}</td>
										<td class="date txt_center">
											{{ item.publishedAt.replace('T', ' ').replace('Z', ' ') }}
										</td>
										<td class="url txt_center txt_pointer">
											<font-awesome-icon
												icon="fa-solid fa-share"
												size="lg"
												@click="move(item.url)"
											/>
										</td>
										<td class="trash txt_center txt_pointer">
											<font-awesome-icon
												icon="fa-solid fa-trash"
												size="lg"
												@click="goTrash(i)"
											/>
										</td>
									</tr>
								</table>
							</div>
						</div>
					</td>
				</tr>
			</table>
			<div style="text-align: center; margin: 20px 0">
				<pagination
					v-if="totalCount != 0"
					:items="totalCount"
					@changePage="changePage"
					:disableDefaultStyles="false"
					:pageSize="parseInt(countview)"
					:initialPage="currentpage"
				></pagination>
			</div>
			<div class="floating"></div>
		</form>
	</div>
</template>

<script>
import variable from './listA.js';
import axios from 'axios';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
import pagination from './pagination.vue';
export default {
	name: 'newsList',
	mixins: [variable],
	components: {
		FadeLoader,
		pagination,
	},
	created() {
		this.callingList();
	},
	methods: {
		async callingList() {
			this.loading = true;
			let url = '';
			try {
				if (window.location.href.startsWith('http://localhost')) {
					url = `https://newsapi.org/v2/everything?apiKey=7aff7bd09d1f41f69fd147911c552134&language=en&q=${
						this.category
					}&from=${this.date1.toISOString()}&to=${this.date2.toISOString()}&sortBy=${
						this.sort
					}&pageSize=${this.countview}&page=${this.currentpage}`;
				} else {
					url = 'https://soraji.github.io/dummyAPI/news.json';
				}

				const res = await axios.get(url);
				this.listArray = res.data.articles;
				this.totalCount = res.data.totalResults;
			} catch (e) {
				this.slackMsg(e);
			} finally {
				this.loading = false;
			}
		},
		slackMsg(text) {
			const url =
				'https://hooks.slack.com/services/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';
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
			var payload = {
				text: text + ' 에서 에러 발생',
			};
			xhr.send(JSON.stringify(payload));
		},
		changePage(page) {
			this.currentpage = page.currentPage;
			window.scrollTo(0, 0);
		},
		move(url) {
			window.open(url);
		},
		goTrash(idx) {
			this.$delete(this.listArray, idx);
			this.totalCount--;
		},
		detailGo(payload) {
			this.$router.push({ name: '/detail', params: { foo: payload } });
		},
	},
};
</script>

<style scoped>
@import '../../lib/style.css';
@import '../../lib/bootstrap.css';
@import '../../lib/bootstrap-select.css';
.img {
	background-color: #56c15c;
	border: 1px solid #56c15c;
	background-image: url('../../assets/check.png');
	background-size: 20px 20px;
	background-position: center center;
}
.imgred {
	background-color: #ff0000;
	border: 1px solid #ff0000;
	background-image: url('../../assets/check.png');
	background-size: 20px 20px;
	background-position: center center;
}
.perfect_btn {
	width: 35px;
	line-height: 12px;
	border: none;
	background-color: #e2efd9;
	font-size: 11px;
	border: 1px solid #2c7a4f;
	border-radius: 25px;
	margin: 0;
	padding: 0 0 2px 0;
	color: #15482c;
}
.result_btn {
	color: #000000;
	border: 1px solid #9da1aa;
	border-radius: 2px;
	padding: 2px 3px;
	background: rgb(226, 227, 228);
	background: linear-gradient(
		180deg,
		rgba(226, 227, 228, 1) 0%,
		rgba(205, 209, 226, 1) 100%
	);
}
.pagenation {
	list-style: none;
	width: 100%;
}
.pagenation li {
	width: 20px;
}
.v-spinner {
	/*돌아가는 스피너 이미지*/
	width: 50px;
	left: 50%;
	top: 200px;
}
.spinner {
	margin: -1px auto;
	width: inherit;
	height: 486px;
	border: 1px solid #a5a5a5;
	background-color: #ffffff;
}
.tableclassnon {
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;
}
.tableclassnon tr td {
	border: #ccccca 0px solid;
	padding: 0px;
	margin: 0px;
}
.noDataScrollBlind {
	height: 488px;
	padding: 0;
	margin: 0;
	text-align: center;
}
.content {
	width: 98%;
	margin: 0 auto;
}
.content_table {
	width: 100%;
	padding: 0;
	margin: 0;
	border-collapse: collapse;
}
.content_table td {
	padding: 0;
	margin: 0;
}
.content_table_title {
	margin: 0 auto;
	table-layout: fixed;
	width: 100%;
	text-align: center;
	background-color: #f7f7f8;
	border-collapse: collapse;
	padding: 0;
	height: 41px;
}
.content_table_title th {
	border: 1px solid #919191;
	font-weight: normal;
	padding: 4px 5px;
}
.main_list {
	margin: 0 auto;
	table-layout: fixed;
	word-break: break-all;
	width: 100%;
	background-color: #ffffff;
	border-collapse: collapse;
	border-bottom: 1px solid #e1e1e2;
	height: 21px;
}
.main_list td {
	border-collapse: collapse;
	padding: 4px 5px;
	cursor: default;
	border-right: 1px solid #e1e1e2;
	border-left: 1px solid #e1e1e2;
}
.main_list tr:hover {
	background-color: #d9f1f4;
}
.datanone {
	margin: -1px auto;
	table-layout: fixed;
	width: 100%;
	background-color: #fff;
	border: 1px solid #a5a5a5;
}
.title {
	text-align: center !important;
	color: #000000 !important;
	cursor: default !important;
}
.num {
	width: 2%;
}
.name {
	width: 23%;
}
.author {
	width: 5%;
}
.source {
	width: 5%;
}
.date {
	width: 5%;
}
.url {
	width: 2%;
}
.trash {
	width: 2%;
}
/* 관리td */
.subject1_td {
	width: 85%;
	float: left;
}
.pencil_td {
	vertical-align: top;
	text-align: right;
	margin-right: -4px;
	width: 15px;
	float: right;
}
label {
	text-align: center;
}
input[type='checkbox'] {
	display: none;
}
input[type='checkbox'] + label span {
	display: inline-block;
	width: 11px;
	height: 11px;
	border-radius: 2px;
	border: 1px solid #3c3c3c;
	cursor: pointer;
	position: relative;
	background-color: #fff;
	z-index: 1;
	margin: 3px 5px -3px 5px;
}
input[type='checkbox']:checked + label span {
	background-color: #56c15c;
	border: 1px solid #56c15c;
	background-image: url('../../assets/check.png');
	background-size: 20px 20px;
	background-position: center center;
}
</style>
