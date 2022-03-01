<template>
	<div class="header" id="scrollTop">
		<div class="toplogo">
			<img src="../assets/logo.png" alt="대표로고" />
		</div>

		<div class="header_wrapper">
			<div class="nav_ch">
				<nav>
					<div class="nav_box">
						<div><router-link to="/main">리스트1</router-link></div>
						<div><router-link to="/sample2">리스트2</router-link></div>
						<div><router-link to="/sample3">리스트3</router-link></div>
						<div><router-link to="/sample4">리스트4</router-link></div>
					</div>
				</nav>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'mainHeader',
};
</script>

<style scoped>
* {
	font-family: noto sans KR, sans-serif;
}
nav {
	display: inline-block;
	border-radius: 2px;
	width: 100%;
}
.header_wrapper {
	width: 100%;
	background-color: #0093e9;
	background-image: linear-gradient(160deg, #0093e9 0%, #80d0c7 100%);
	height: 43px;
	text-align: left;
	margin-top: -4px;
	margin-bottom: 25px;
}
.nav_ch {
	width: 98%;
	margin: 10px auto;
}
.nav_box {
	display: table;
	height: 40px;
	line-height: 36px;
	font-weight: bold;
	vertical-align: middle;
	color: #ffffff;
	font-size: 14px;
	text-align: center;
	text-decoration: none !important;
	cursor: pointer;
	border-collapse: collapse;
}
.nav_box div {
	display: table-cell;
	width: 150px;
	border-right: 1px solid #9face6;
	border-left: 1px solid #9face6;
	border-collapse: collapse;
	height: 40px;
	line-height: 40px;
}
nav a {
	display: inline-block;
	width: 110px;
	height: 41px;
	line-height: 42px;
	vertical-align: middle;
	color: #ffffff;
	font-weight: bold;
	font-size: 14px;
	text-align: center;
	text-decoration: none !important;
}
.router-link-exact-active {
	/* 라우터로 acitve된 메뉴 글씨색 */
	color: #4158d0;
	width: 150px;
	background-color: #ffffff;
}
.header {
	width: 100%;
	position: relative;
}
.toplogo {
	width: 100%;
	margin: 10px auto 5px auto;
	text-align: left;
	height: 40px;
}
.toplogo img {
	width: 188px;
	float: left;
}
a,
a:focus,
a:active,
a:hover,
object,
embed {
	outline: none;
	text-decoration: none;
}
:-moz-any-link:focus {
	outline: none;
}
input::-moz-focus-inner {
	border: 0;
}
:focus {
	outline: 0;
}
body {
	background: #333;
}
.brand {
	padding: 10px 40px !important;
}
.navbar {
	border-bottom: 4px solid #888;
}
</style>
