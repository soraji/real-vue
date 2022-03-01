<template>
	<ul
		v-if="pager.pages && pager.pages.length"
		class="pagination"
		:style="ulStyles"
	>
		<li
			class="page-item first"
			:class="{ disabled: pager.currentPage === 1 }"
			:style="liStyles"
		>
			<a class="page-link" @click="setPage(1)" :style="aStyles">{{
				labels.first
			}}</a>
		</li>
		<li
			class="page-item previous"
			:class="{ disabled: pager.currentPage === 1 }"
			:style="liStyles"
		>
			<a
				class="page-link"
				@click="setPage(pager.currentPage - 1)"
				:style="aStyles"
				>{{ labels.previous }}</a
			>
		</li>
		<li
			v-for="page in pager.pages"
			:key="page"
			class="page-item page-number"
			:class="{ active: initialPage === page }"
			:style="liStyles"
		>
			<a class="page-link" @click="movePage(page)" :style="aStyles">{{
				page
			}}</a>
		</li>
		<li
			class="page-item next"
			:class="{ disabled: pager.currentPage === pager.totalPages }"
			:style="liStyles"
		>
			<a
				class="page-link"
				@click="setPage(pager.currentPage + 1)"
				:style="aStyles"
				>{{ labels.next }}</a
			>
		</li>
		<li
			class="page-item last"
			:class="{ disabled: pager.currentPage === pager.totalPages }"
			:style="liStyles"
		>
			<a
				class="page-link"
				@click="setPage(pager.totalPages)"
				:style="aStyles"
				>{{ labels.last }}</a
			>
		</li>
	</ul>
</template>

<script>
import paginate from 'jw-paginate';
const defaultLabels = {
	first: '<<',
	last: '>>',
	previous: '<',
	next: '>',
};
const defaultStyles = {
	ul: {
		margin: 0,
		padding: 0,
		display: 'inline-block',
	},
	li: {
		listStyle: 'none',
		display: 'inline',
		textAlign: 'center',
	},
	a: {
		// cursor: 'pointer',
		padding: '6px 12px',
		display: 'block',
		float: 'left',
	},
};
export default {
	name: 'listPagination',
	props: {
		items: {
			type: Number,
			required: true,
		},
		initialPage: {
			type: Number,
			default: 1,
		},
		pageSize: {
			type: Number,
			default: 100,
		},
		maxPages: {
			type: Number,
			default: 10,
		},
		labels: {
			type: Object,
			default: () => defaultLabels,
		},
		styles: {
			type: Object,
		},
		disableDefaultStyles: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			pager: {},
			ulStyles: {},
			liStyles: {},
			aStyles: {},
		};
	},
	computed: {
		toticount: {
			get() {
				return parseInt(this.$store.state.listA.toticount);
			},
			set(val) {
				this.$store.state.listA.toticount = val;
			},
		},
		countview: {
			get() {
				return this.$store.state.listA.countview;
			},
			set(val) {
				this.$store.state.listA.countview = parseInt(val);
			},
		},
	},
	mounted() {
		if (!this.$listeners.changePage) {
			throw 'Missing required event listener: "changePage"';
		}
		// set default styles unless disabled
		if (!this.disableDefaultStyles) {
			this.ulStyles = defaultStyles.ul;
			this.liStyles = defaultStyles.li;
			this.aStyles = defaultStyles.a;
		}
		// merge custom styles with default styles
		if (this.styles) {
			this.ulStyles = { ...this.ulStyles, ...this.styles.ul };
			this.liStyles = { ...this.liStyles, ...this.styles.li };
			this.aStyles = { ...this.aStyles, ...this.styles.a };
		}
		// set page if items array isn't empty
		// if (this.items && this.items.length) {

		if (this.items) {
			this.setPage(this.initialPage);
		}
	},
	updated() {
		// this.setPage(this.initialPage);
	},
	watch: {
		toticount: function (val) {
			this.toticount = val;
			const { maxPages } = this;
			const pager = paginate(val, this.initialPage, this.countview, maxPages);
			// update pager
			this.pager = pager;
			// emit change page event to parent component
			this.$emit('changePage', pager);
		},
		countview: function (val) {
			this.countview = val;
			const { maxPages } = this;
			const pager = paginate(this.toticount, this.initialPage, val, maxPages);
			// update pager
			this.pager = pager;
			// emit change page event to parent component
			this.$emit('changePage', pager);
		},
	},
	methods: {
		setPage(currentpage) {
			//디폴트페이지
			//pagination 문제생기면 node_modules에서 jw-paginate.js 파일 보고 수정할것.......
			const { maxPages } = this;
			// items: /page : 첫페이지 / pageSize:countview
			//function paginate(totalItems, currentPage, pageSize, maxPages) {}
			setTimeout(() => {
				const pager = paginate(
					this.toticount,
					currentpage,
					this.countview,
					maxPages,
				);
				// update pager
				this.pager = pager;
				// emit change page event to parent component
				this.$emit('changePage', pager);
			}, 1000);
		},
		movePage(currentpage) {
			//페이지 이동시
			//pagination 문제생기면 node_modules에서 jw-paginate.js 파일 보고 수정할것.......
			const { maxPages } = this;
			// items: /page : 첫페이지 / pageSize:countview
			//function paginate(totalItems, currentPage, pageSize, maxPages) {}
			const pager = paginate(
				this.toticount,
				currentpage,
				this.countview,
				maxPages,
			);
			// update pager
			this.pager = pager;
			// emit change page event to parent component
			this.$emit('changePage', pager);
		},
	},
};
</script>
<style scoped>
.pagination {
	display: inline-block;
	padding-left: 0;
	margin: 30px;
	border-radius: 4px;
}
.pagination > li {
	display: inline;
}
.pagination > li > a,
.pagination > li > span {
	position: relative;
	float: left;
	cursor: pointer;
	padding: 6px 12px;
	margin-left: -1px;
	line-height: 1.42857143;
	color: #5cbfd1;
	text-decoration: none;
	background-color: #ffffff;
	border: 1px solid #dddddd;
}
.pagination > li > a:hover,
.pagination > li > span:hover,
.pagination > li > a:focus,
.pagination > li > span:focus {
	z-index: 2;
	color: #23527c;
	background-color: #eeeeee;
	border-color: #dddddd;
}
.pagination > li:first-child > a,
.pagination > li:first-child > span {
	margin-left: 0;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;
}
.pagination > li:last-child > a,
.pagination > li:last-child > span {
	border-top-right-radius: 4px;
	border-bottom-right-radius: 4px;
}
.pagination > .active > a,
.pagination > .active > span,
.pagination > .active > a:hover,
.pagination > .active > span:hover,
.pagination > .active > a:focus,
.pagination > .active > span:focus {
	z-index: 3;
	color: #ffffff;
	cursor: default;
	background-color: #5cbfd1;
	border-color: #5cbfd1;
}
.pagination > .disabled > span,
.pagination > .disabled > span:hover,
.pagination > .disabled > span:focus,
.pagination > .disabled > a,
.pagination > .disabled > a:hover,
.pagination > .disabled > a:focus {
	color: #777777;
	cursor: not-allowed;
	background-color: #ffffff;
	border-color: #dddddd;
}
.pagination-lg > li > a,
.pagination-lg > li > span {
	padding: 10px 16px;
	font-size: 18px;
	line-height: 1.3333333;
}
.pagination-lg > li:first-child > a,
.pagination-lg > li:first-child > span {
	border-top-left-radius: 6px;
	border-bottom-left-radius: 6px;
}
.pagination-lg > li:last-child > a,
.pagination-lg > li:last-child > span {
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
}
.pagination-sm > li > a,
.pagination-sm > li > span {
	padding: 5px 10px;
	font-size: 12px;
	line-height: 1.5;
}
.pagination-sm > li:first-child > a,
.pagination-sm > li:first-child > span {
	border-top-left-radius: 3px;
	border-bottom-left-radius: 3px;
}
.pagination-sm > li:last-child > a,
.pagination-sm > li:last-child > span {
	border-top-right-radius: 3px;
	border-bottom-right-radius: 3px;
}
</style>
