<template>
	<div id="app">
		<Header></Header>
		<router-view></router-view>
		<Footer></Footer>
	</div>
</template>

<script>
import Footer from './components/footer.vue';
import Header from './components/header.vue';

export default {
	name: 'App',
	components: {
		Header,
		Footer,
	},
};
</script>

<style>
*:focus {
	outline: none;
}
#app {
	margin: 0 auto;
	padding: 0;
	width: 100%;
	font-family: Noto Sans KR, sans-serif, 'Apple SD Gothic Neo';
	font-size: 9pt;
	min-width: 1200px;
	height: 100%;
}
html,
body {
	margin: 0;
	width: 100%;
	height: 100%;
	padding: 0;
	font-size: 9pt;
	overflow-x: hidden;
	font-family: Noto Sans KR, sans-serif, 'Apple SD Gothic Neo';
}
.page-container {
	position: relative;
	min-height: 100%;
	padding-bottom: 100px;
}
</style>
