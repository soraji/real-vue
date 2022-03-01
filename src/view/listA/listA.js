import { ko } from 'vuejs-datepicker/dist/locale';
const customLabel = {
	first: '<<',
	last: '>>',
	previou: '<',
	nex: '>',
};

var variable = {
	data() {
		return {
			ko: ko,
			customLabel,
			color: '#5cbfd1',
			loading: true,
			listArray: [],
		};
	},
	computed: {
		date1: {
			get() {
				return this.$store.state.listA.date1;
			},
			set(val) {
				this.$store.state.listA.date1 = val;
			},
		},
		date2: {
			get() {
				return this.$store.state.listA.date2;
			},
			set(val) {
				this.$store.state.listA.date2 = val;
			},
		},
		category: {
			get() {
				return this.$store.state.listA.category;
			},
			set(val) {
				this.$store.state.listA.category = val;
			},
		},
		countview: {
			get() {
				return this.$store.state.listA.countview;
			},
			set(val) {
				this.$store.state.listA.countview = val;
			},
		},
		sort: {
			get() {
				return this.$store.state.listA.sort;
			},
			set(val) {
				this.$store.state.listA.sort = val;
			},
		},
		totalCount: {
			get() {
				return this.$store.state.listA.totalCount;
			},
			set(val) {
				this.$store.state.listA.totalCount = val;
			},
		},
		currentpage: {
			get() {
				return this.$store.state.listA.currentpage;
			},
			set(val) {
				this.$store.state.listA.currentpage = val;
			},
		},
		keyword: {
			get() {
				return this.$store.state.listA.keyword;
			},
			set(val) {
				this.$store.state.listA.keyword = val;
			},
		},
	},
};
export default variable;
