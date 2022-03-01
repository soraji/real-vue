import Vue from 'vue';
import VueRouter from 'vue-router';

import mainList from '../components/mainList.vue';
import sampleList2 from '../components/sampleList2.vue';
import sampleList3 from '../components/sampleList3.vue';
import sampleList4 from '../components/sampleList4.vue';
import detail from '../view/listA/detail.vue';

Vue.use(VueRouter);
export const router = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			component: mainList,
		},
		{
			path: '/main',
			name: '/main',
			component: mainList,
		},
		{
			path: '/sample2',
			name: '/sample2',
			component: sampleList2,
		},
		{
			path: '/sample3',
			name: '/sample3',
			component: sampleList3,
		},
		{
			path: '/sample4',
			name: '/sample4',
			component: sampleList4,
		},
		{
			path: '/detail',
			name: '/detail',
			component: detail,
			props: true,
		},
	],
});
