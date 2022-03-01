<template>
	<div>
		<table class="search2_top_table">
			<tr>
				<td></td>
				<td>
					<input
						type="text"
						name="keyword"
						id="keyword"
						:value="keyword"
						@input="keywordChange"
					/>
					<div>
						<font-awesome-icon
							icon="fa-solid fa-magnifying-glass"
							size="lg"
							style="color: #5cbfd1"
						/>
					</div>
				</td>
				<td class="sm_ver_dvline">|</td>
				<td>
					<toggle-button
						:labels="{ checked: '검색조건 ON', unchecked: '검색조건 OFF' }"
						:fontSize="12"
						:width="110"
						:color="{ checked: '#5cbfd1' }"
						:margin="2"
						:height="26"
					></toggle-button>
				</td>
			</tr>
		</table>

		<table class="search2_main_table">
			<tr>
				<td>총 {{ totalCount }} 건</td>
				<td>
					<select
						name="countview"
						id="countview"
						class="selectDropDown"
						v-model="countview"
						@change="countviewChange($event)"
					>
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
				</td>
				<td></td>
				<td>
					<button
						type="button"
						class="link tooltips_up_exp"
						id="font_btn"
						href="#"
					>
						<img
							src="../../assets/font.svg"
							class="txt_pointer"
							style="width: 14.5px; height: 14.5px"
						/>
						<div><span style="width: 60px">확대/축소</span></div>
					</button>
					<div
						class="popup font_resize_box"
						tabindex="-1"
						style="display: none"
					>
						<span>크기</span>
					</div>
				</td>
				<td>
					<select
						name="sort"
						id="sort"
						class="selectDropDown"
						v-model="sort"
						@change="sortChange($event)"
					>
						<option value="publishedAt">날짜순↑</option>
						<option value="popularity">인기순↑</option>
						<option value="relevancy">관련성↑</option>
					</select>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
import variable from './listA.js';
export default {
	name: 'searchTwo',
	mixins: [variable],
	methods: {
		keywordChange(event) {
			this.keyword = event.target.value;
		},
		countviewChange(event) {
			this.countview = event.srcElement.value;
			this.$emit('search2Go', {
				countview: this.countview,
				sort: this.sort,
			});
		},
		sortChange(event) {
			this.sort = event.srcElement.value;
			this.$emit('search2Go', {
				countview: this.countview,
				sort: this.sort,
			});
		},
	},
};
</script>

<style scoped>
@import '../../lib/style.css';
@import '../../lib/bootstrap.css';
@import '../../lib/bootstrap-select.css';
input[name='allcount'] {
	width: 100%;
	height: 17px;
	border: 1px solid #000000;
	text-align: center;
	color: #ffffff;
	background-color: #0a246a;
}
input[name='currentpage'] {
	width: 25%;
	height: 17px;
	border: 1px solid #000000;
	text-align: center;
	color: #000000;
	background-color: #ffffff;
}
input[name='allpage'] {
	width: 25%;
	height: 17px;
	border: 1px solid #000000;
	text-align: center;
	color: #000000;
	background-color: #e1e1e1;
}
input[type='radio'] {
	position: relative;
	top: 5px;
	cursor: pointer;
}
input[type='radio']:checked {
	color: #ff0000;
}
#editsetting {
	border: 1px solid #76b54d;
	background-color: #e2efd9;
	border-radius: 4px;
	padding: 2px 4px;
	line-height: 20px;
	vertical-align: middle;
	color: #000000;
	width: 120px;
}
.search2_top_table {
	width: 98%;
	table-layout: fixed;
	margin: 20px auto 0 auto;
}
.search2_top_table tr td:nth-child(1) {
	width: 20%;
}
.search2_top_table tr td:nth-child(2) {
	text-align: right;
	width: 50%;
}
.search2_top_table tr td:nth-child(3) {
	text-align: right;
	width: 30px;
}
.search2_top_table > tr > td:nth-child(3) > div {
	height: 0;
	position: relative;
	top: -21px;
	right: 15px;
}
.search2_top_table tr td:nth-child(6) {
	text-align: right;
	width: 130px;
}
.search2_inner_table {
	width: 80%;
	table-layout: fixed;
}
.search2_inner_table tr td:nth-child(1),
.search2_inner_table tr td:nth-child(2) {
	width: 56px;
}
.search2_inner_table tr td:nth-child(3) {
	width: 75px;
}
.search2_inner_table tr td:nth-child(4) {
	width: 41px;
}
.search2_inner_table tr td:nth-child(5) {
	width: 100px;
}
.search2_inner_table tr td:nth-child(6),
.search2_inner_table tr td:nth-child(7),
.search2_inner_table tr td:nth-child(8) {
	width: 80px;
}
.inner {
	width: 105%;
}
.btnClass,
.btnClassFont {
	height: 30px;
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
	margin: 4px 0 2px 4px;
}
.search2_main_table {
	margin: 15px auto 8px auto;
	table-layout: fixed;
	width: 98%;
	text-align: left;
}
.search2_main_table > tr:nth-child(1) > td:nth-child(4) {
	width: 750px;
	text-align: right;
}
.search2_main_table > tr:nth-child(1) > td:nth-child(1) {
	width: 80px;
}
.search2_main_table
	> tr:nth-child(1)
	> td.inner
	> div
	> table
	> tr
	> td:nth-child(1),
.search2_main_table tr td:nth-child(2) {
	width: 65px;
}
.search2_main_table tr td:nth-child(2) select {
	width: 49px;
}
.search2_main_table tr td:nth-child(2) select {
	width: 49px;
}
.search2_main_table > tr > td:nth-child(5) {
	width: 85px;
}
.gwanlicheck {
	width: 43px;
	border-radius: 3px;
	padding: 4px 3px 3px 5px;
	position: relative;
	top: 1px;
}
.hwpOneToOne {
	width: 76px;
	border-radius: 3px;
	padding: 4px 3px 3px 5px;
	position: relative;
	top: 1px;
}
select[name='sort'] {
	width: 85px;
}
/* 한글 체크박스 */
input[type='checkbox'][name='hwpOneToOne'] {
	display: none;
}
input[type='checkbox'][name='hwpOneToOne'] + label span {
	display: inline-block;
	width: 11px;
	height: 11px;
	border-radius: 2px;
	border: 1px solid #3c3c3c;
	cursor: pointer;
	position: relative;
	top: -2px;
	background-color: #fff;
	z-index: 1;
	float: left;
	margin: 2px 5px 2px -10px;
}
input[type='checkbox'][name='hwpOneToOne']:checked + label span {
	background-color: #5cbfd1;
	border: 1px solid #5cbfd1;
	background-image: url('../../assets/check.png');
	background-size: 20px 20px;
	background-position: center center;
}
input[type='checkbox'][name='hwpOneToOne']:disabled + label span {
	background-color: #d9dff0;
	cursor: not-allowed;
}
input[type='checkbox'][name='gwanlicheck'] {
	display: none;
}
input[type='checkbox'][name='gwanlicheck'] + label span {
	display: inline-block;
	width: 11px;
	height: 11px;
	border-radius: 2px;
	border: 1px solid #3c3c3c;
	cursor: pointer;
	position: relative;
	top: -2px;
	background-color: #fff;
	z-index: 1;
	float: left;
	margin: 2px 5px 2px -10px;
}
input[type='checkbox'][name='gwanlicheck']:checked + label span {
	background-color: #5cbfd1;
	border: 1px solid #5cbfd1;
	background-image: url('../../assets/check.png');
	background-size: 20px 20px;
	background-position: center center;
}
/* //관리 체크박스 */
.switch-button-control {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.switch-button-label {
	margin-left: 10px;
}
select::-ms-expand {
	display: none;
}
/* 커스터마이징 라디오버튼 */
[type='radio']:checked,
[type='radio']:not(:checked) {
	position: absolute;
	left: -9999px;
}
[type='radio']:checked + label,
[type='radio']:not(:checked) + label {
	position: relative;
	padding-left: 20px;
	cursor: pointer;
	line-height: 20px;
	display: inline-block;
	color: #666;
	top: 2px;
}
[type='radio']:checked + label:before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	width: 14px;
	height: 14px;
	border: 1px solid #5cbfd1;
	border-radius: 100%;
	background: #fff;
	border: 1px #919191 solid;
}
[type='radio']:not(:checked) + label:before {
	content: '';
	position: absolute;
	left: 0;
	top: 0;
	width: 14px;
	height: 14px;
	border: 1px solid red;
	border-radius: 100%;
	background: #fff;
	border: 1px #919191 solid;
}
[type='radio']:checked + label:after,
[type='radio']:not(:checked) + label:after {
	content: '';
	width: 8px;
	height: 8px;
	background: #5cbfd1;
	position: absolute;
	top: 4px;
	left: 4px;
	border-radius: 100%;
	-webkit-transition: all 0.2s ease;
	transition: all 0.2s ease;
}
[type='radio']:not(:checked) + label:after {
	opacity: 0;
	-webkit-transform: scale(0);
	transform: scale(0);
}
[type='radio']:checked + label:after {
	opacity: 1;
	-webkit-transform: scale(1);
	transform: scale(1);
}
/* //커스터마이징 라디오버튼 */
</style>
