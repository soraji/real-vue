import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		listA: {
			date1: new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate() - 1,
			),
			date2: new Date(
				new Date().getFullYear(),
				new Date().getMonth(),
				new Date().getDate(),
			),
			category: 'google',
			countview: '100',
			sort: 'relevancy',
			totalCount: 0,
			currentpage: 1,
			keyword: '',
		},
	},
});
