<template>
	<div>
		<table class="rowspan_table">
			<tr>
				<td>
					<div class="rowspan_table_div">
						<table>
							<tr>
								<td>
									<table class="cp_search_bar">
										<tr>
											<td>참가 : {{ this.listArray.length }} 인</td>
											<td>|</td>
											<td>
												<div>
													<select
														id="keyfield"
														name="keyfield"
														v-model="keyfield"
													>
														<option value="1">제출과일</option>
														<option value="2">이름</option>
													</select>
												</div>
												<div>
													<input
														type="text"
														name="keyword"
														id="keyword"
														:value="keyword"
														@input="changeText"
													/>
													<span class="search_btn"
														><font-awesome-icon
															icon="fa-solid fa-magnifying-glass"
															size="lg"
															style="color: #5cbfd1"
													/></span>
												</div>
											</td>
										</tr>
									</table>
								</td>
								<td></td>
							</tr>
						</table>
					</div>
				</td>
			</tr>
		</table>

		<div class="spinner" v-if="loading">
			<fade-loader :loading="loading" :color="color"></fade-loader>
		</div>
		<div v-else class="no_spinner">
			<table class="result_detail_table sticky">
				<colgroup>
					<col style="width: 8%" />
					<col style="width: 10%" />
					<col style="width: 8%" />
					<col style="width: 10%" />
					<col style="width: 15%" />
					<col style="width: 10%" />
				</colgroup>
				<tr>
					<th class="chamga">그룹</th>
					<th class="fruits">제출과일</th>
					<th class="search">상세</th>
					<th class="name">이름</th>
					<th class="jiyuk">지역</th>
					<th class="rank">순위</th>
				</tr>
			</table>
			<table class="chamgaja_table">
				<tr>
					<td style="padding: 0">
						<!-- 반응형rowspan넣으려면 tr에 v-for넣어야함 -->
						<table class="main_list">
							<colgroup>
								<col style="width: 8%" />
								<col style="width: 10%" />
								<col style="width: 8%" />
								<col style="width: 10%" />
								<col style="width: 15%" />
								<col style="width: 10%" />
							</colgroup>
							<tr v-for="(item, i) in newArray" :key="i">
								<td
									class="txt_center"
									v-if="item.var7 != ''"
									:rowspan="item.var7"
								>
									{{ item.var7 }}
								</td>

								<td
									class="fruits txt_left"
									:style="[
										keyfield == '1' &&
										keyword != '' &&
										item.fruits.includes(keyword)
											? { backgroundColor: '#cfecf1' }
											: {},
									]"
								>
									<div>{{ item.fruits }}</div>
								</td>

								<td class="txt_center">
									<font-awesome-icon
										icon="fa-solid fa-magnifying-glass"
										size="lg"
										style="color: #9d9d9d"
									/>
								</td>
								<td
									class="name txt_center"
									:style="[
										keyfield == '2' &&
										keyword != '' &&
										item.name.includes(keyword)
											? { backgroundColor: '#cfecf1' }
											: {},
									]"
								>
									<div>{{ item.name }}</div>
								</td>

								<td class="jiyuk txt_center">
									<div>{{ item.jiyuk }}</div>
								</td>
								<td class="txt_right">
									<span v-if="item.pm == '0'">-</span>
									<span>{{ item.rank }}</span>
								</td>
							</tr>
							<tr>
								<td colspan="6">참가자 : {{ this.listArray.length }}인</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
import FadeLoader from 'vue-spinner/src/FadeLoader.vue';
export default {
	name: 'rowspanList',
	components: {
		FadeLoader,
	},
	data() {
		return {
			loading: true,
			color: '#5cbfd1',
			keyfield: '1',
			keyword: '',
			listArray: [],
			newArray: [],
		};
	},
	created() {
		this.callingList();
	},
	methods: {
		async callingList() {
			this.loading = true;
			try {
				const res = await axios.get(
					'https://soraji.github.io/dummyAPI/rowspan.json',
				);
				this.listArray = res.data.listArray;

				for (let i = 0; i < this.listArray.length; i++) {
					this.newArray.push({
						var7: this.listArray[i].var7,
						fruits: this.listArray[i].var2,
						name: this.listArray[i].var3,
						rank: this.listArray[i].var4,
						pm: this.listArray[i].var5,
						jiyuk: this.listArray[i].var6,
					});
				}
			} catch (e) {
				console.log(e);
			} finally {
				this.loading = false;
			}
		},
		changeText(event) {
			this.keyword = event.target.value;
		},
	},
};
</script>

<style scoped>
@import '../../lib/style.css';
input[id='keyword'] {
	width: 300px;
	height: 26px;
	border-radius: 25px;
	padding: 1px 10px 1px 100px;
	-webkit-box-sizing: border-box;
	box-sizing: border-box;
	border: 1px solid #bebfc4 !important;
}
input[name='keyword'] {
	width: 150px;
	height: 22px;
	border: 1px solid #cccccc;
	border-radius: 2px;
}
.cp_search_bar {
	width: 555px;
	float: left;
}
.rowspan_table_div {
	width: 98%;
	margin: 8px auto;
}
.rowspan_table {
	width: 100%;
	border-collapse: collapse;
}
.rowspan_table tr td {
	padding: 0;
}
.rowspan_table > tr > td > div > table > tr > td:nth-child(1) {
	width: 80%;
}
.rowspan_table > tr > td > div > table > tr > td:nth-child(2) {
	width: 20%;
}
.rowspan_table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(1) {
	width: 50px;
}
.rowspan_table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(2),
.rowspan_table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(5) {
	width: 20px;
	color: #dae1e6;
	text-align: center;
}
.rowspan_table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(3) {
	width: 53px;
}
.rowspan_table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(4) {
	width: 43px;
}
.rowspan_table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(6) {
	width: 100px;
}
.rowspan_table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(7) {
	width: 170px;
}
#search_sm {
	height: 26px;
	border-radius: 0;
	line-height: 26px;
	padding: 0 7px;
	background: rgb(254, 254, 254);
	background: linear-gradient(
		180deg,
		rgba(254, 254, 254, 1) 0%,
		rgba(240, 242, 245, 1) 100%
	);
	border: 1px solid #bebfc4;
	color: #545454;
	font-size: 13px;
	border-radius: 3px;
	cursor: pointer;
	width: 45px;
}
.chamgaja_box {
	height: 400px;
	width: 1040px;
	margin: -2px auto;
	overflow-y: auto;
	overflow-x: hidden;
	border-bottom: 1px solid #e5e5e5;
}
.spinner {
	height: 700px;
	width: 100%;
}
.v-spinner {
	top: 200px;
	left: 50%;
}
.no_spinner {
	margin-top: 1px;
	width: 98%;
	margin: 0 auto;
}
.chamgaja_table {
	width: 100%;
	border-collapse: collapse;
}
.chamgaja_table tr td {
	margin: 0;
	padding: 0;
}
.tab1 {
	width: 98%;
	margin: 0 auto;
	background-color: #fff;
	padding-bottom: 15px;
	border: 1px solid #a2a2a5;
	position: relative;
}
.result_detail_table {
	width: 100%;
	table-layout: fixed;
	border-collapse: collapse;
	margin: 0 auto;
}
.result_detail_table tr th {
	border: 1px solid #a5a5a5;
	background-color: #f7f7f8;
	height: 25px;
	text-align: center;
	font-weight: normal;
	padding: 0 5px;
}
.menu {
	padding: 22px 0 10px 10px;
	font-size: 14px;
}
.main_list {
	width: 100%;
	margin: 0px auto 2px auto;
	border-collapse: collapse;
}
.main_list td {
	padding: 5px !important;
	border: 1px solid #e5e5e5;
}
.tableclassnon tr td {
	border: #ccccca 0px solid;
}
.resultKonggoTable {
	width: 98%;
	margin: 17px auto 10px auto;
	border-top: 2px solid #dae1e6;
	border-bottom: 2px solid #dae1e6;
	border-collapse: collapse;
	table-layout: fixed;
}
.resultKonggoTable tr th {
	background-color: #f7f7f8;
	border: 1px solid #e5e5e5;
	width: 5%;
	height: 20px;
	padding: 3px 5px;
	font-weight: normal;
}
.resultKonggoTable tr td {
	border: 1px solid #e5e5e5;
	width: 24%;
	padding: 5px 8px;
}
.vue-tabs {
	/* 탭을 감싸고있는 한줄 */
	width: 100%;
	padding-top: 20px;
	position: relative;
	top: -20px;
	background-color: #edeef1;
	z-index: 1;
}
.vue-tablist {
	/* 탭리스트 스타일 */
	list-style: none;
	display: flex;
	margin: 0 auto;
	width: 98.1%; /* border-bottom: 1px solid #e2e2e2; */
}
.vue-tab {
	/* tab한개한개 스타일 */
	z-index: 1;
	padding: 5px 10px;
	cursor: pointer;
	user-select: none;
	border: 1px solid #edeef1;
	border-bottom-color: #a2a2a5;
	border-radius: 5px 5px 0 0;
	background-color: #e1e3e8;
	position: relative;
	bottom: -1px;
	width: 119px;
	height: 24px;
	line-height: 24px;
	vertical-align: middle;
	text-align: center;
	font-size: 12.5px;
	color: #68696e;
}
input[type='radio']:disabled + label,
input[type='radio']:disabled + label span {
	cursor: not-allowed;
}
.vue-tab[aria-selected='true'] {
	/* 선택된 tab */
	border-color: #a2a2a5;
	background-color: #fff;
	border-bottom-color: transparent;
	color: #323232;
}
.vue-tab[aria-disabled='true'] {
	cursor: not-allowed;
	color: #999;
}
.gugan_title {
	padding-left: 5px;
}
.gugan .tableclassnon {
	font-weight: normal;
	width: 85px;
	margin: 15px 0 0 0;
}
.gugan .tableclassnon tr td {
	line-height: 10px;
}
.gugan .tableclassnon tr td:nth-child(1) {
	width: 35px;
}
.gugan .tableclassnon tr td:nth-child(2) {
	padding: 0 !important;
}
.search_btn {
	position: relative;
	left: -8%;
}
select {
	border: none;
	position: relative;
	display: block;
	z-index: 2;
	width: 80px;
	height: 19px !important;
	top: 0;
	left: 10px;
	border-radius: 25px;
}
#app
	> div:nth-child(2)
	> div
	> table
	> tr
	> td
	> div
	> table
	> tr
	> td:nth-child(1)
	> table
	> tr
	> td:nth-child(3)
	> div:nth-child(2) {
	max-width: 99%;
	height: 0;
	position: relative;
	top: -23px;
	left: 0;
}
input[id='keyword'] {
	width: 300px;
	height: 26px;
	border-radius: 25px;
	padding: 1px 10px 1px 100px;
	box-sizing: border-box;
	border: 1px solid #bebfc4 !important;
}
</style>
