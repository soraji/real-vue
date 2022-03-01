<template>
	<div>
		<Search1 ref="search1" v-on:search1Go="search1Active"></Search1>
		<Search2 ref="search2" v-on:search2Go="search1Active"></Search2>
		<List ref="list"></List>
	</div>
</template>

<script>
import Search1 from '../view/listA/search1.vue';
import Search2 from '../view/listA/search2.vue';
import List from '../view/listA/list.vue';
export default {
	name: 'mainList',
	components: {
		Search1,
		Search2,
		List,
	},
	methods: {
		search1Active(payload) {
			this.$refs.list.callingList(payload);
		},
	},
};
</script>

<style></style>
