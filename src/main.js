import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import { router } from './routes/routes.js';
import { store } from './store/index.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ToggleButton from 'vue-js-toggle-button';

library.add(fas);
library.add(far);
Vue.use(ToggleButton);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;
Vue.use(VueRouter);
new Vue({
	render: h => h(App),
	router,
	store,
}).$mount('#app');
