<template>
	<!-- 页面标签 -->
	<div class="pagetabs">
		<div class="icon prev" @click="leftPage">
			<i class="el-icon-d-arrow-left"></i>
		</div>
		<div class="icon next" @click="rightPage">
			<i class="el-icon-d-arrow-right"></i>
		</div>
		<div class="icon refresh" @click="reload">
			<i class="el-icon-refresh-right"></i>
		</div>
		<div class="icon down">
			<el-dropdown @command="closeTag">
				<span class="el-dropdown-link"
					><i class="el-icon-arrow-down"></i
				></span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="1">关闭当前</el-dropdown-item>
					<el-dropdown-item command="2">关闭其他</el-dropdown-item>
					<el-dropdown-item command="3">关闭全部</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="tab">
			<ul>
				<router-link
					v-for="tag in visitedViews"
					ref="tag"
					:key="tag.path"
          :data-path="tag.path"
					:class="classStr(tag)"
					:to="{
						path: tag.path,
						query: tag.query,
						fullPath: tag.fullPath,
					}"
					tag="li"
				>
					<i v-if="isHome(tag)" :class="tag.meta.icon"></i>{{tag.meta.title}}
          <span
						v-if="!isAffix(tag)"
						class="el-icon-close"
						@click.prevent.stop="closeSelectedTag(tag)"
					/>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
export default {
  name: 'layout-crumbs',
	data() {
		return {}
	},
	computed: {
		...mapGetters({
			visitedViews: 'tagsView/visitedViews',
      currentView: 'tagsView/currentView',
		}),
	},
	watch: {
		'$route.path': {
			handler(newV, oldV) {
				if (newV != oldV) {
          // 外层数据-延时保证节点
          setTimeout(()=>{
            let tabUl = document.querySelector(".pagetabs .tab ul");
            let w1 = tabUl.clientWidth;
            let transX = document.defaultView.getComputedStyle(tabUl, null).transform;
            let left = transX == "none" ? 0 : +transX.split(',')[4];
            // 当前tag
            let curLi = document.querySelector("li[data-path='" + newV + "']");
            let c_w1 = curLi.clientWidth;
            let c_left = curLi.offsetLeft;
            if(c_left + left < 0) { // 左侧被隐藏
              tabUl.style.transform = "translateX(" + (-c_left) +"px)"; 
            }
            if(c_left + left > w1 - c_w1) { // 右侧被隐藏
              tabUl.style.transform = "translateX(" + (w1 - c_left - c_w1 - 14) +"px)"; 
            }
          },0);
				}
			},
		},
	},
	mounted() {},
	methods: {
		...mapActions({
			delView: 'tagsView/delView',
			delOthersViews: 'tagsView/delOthersViews',
      delAllViews: 'tagsView/delAllViews',
      delCachedView: 'tagsView/delCachedView',
    }),
    ...mapMutations({
      reload: "index/reload",
    }),
		classStr(tag) {
			let str = this.isActive(tag) ? 'active ' : ''
			str += this.isHome(tag) ? 'home ' : ''
			return str
		},
		isActive(tag) {
			return tag.path === this.$route.path
		},
		isHome(tag) {
			return tag.path === '/index'
		},
		isAffix(tag) {
			return tag.meta && tag.meta.affix
		},
		closeTag(command) {
			// 关闭当前
			if (command == '1') {
				this.closeSelectedTag(this.currentView)
			}
			// 关闭其他
			if (command == '2') {
				this.delOthersViews(this.currentView)
			}
			// 关闭全部
			if (command == '3') {
				this.closeAllTags()
			}
		},
		closeSelectedTag(view) {
			this.delView(view).then(({ visitedViews }) => {
				if (this.isActive(view)) {
					this.toLastView(visitedViews)
				}
			})
		},
		closeAllTags() {
			this.delAllViews().then(({ visitedViews }) => {
				if (
					visitedViews.some(
						(tag) => tag.path === this.currentView.path
					)
				) {
					return
				}
				this.toLastView(visitedViews)
			})
		},
		// 移动到最后一个tab
		toLastView(visitedViews) {
			const latestView = visitedViews.slice(-1)[0]
			this.$router.push(latestView.path)
		},
		leftPage() {
      let tabUl = document.querySelector(".pagetabs .tab ul");
      tabUl.style.transform = "translateX(0px)"; 
    },
		rightPage() {
      let tabUl = document.querySelector(".pagetabs .tab ul");
      let w1 = tabUl.clientWidth;
      let w2 = tabUl.scrollWidth;
      tabUl.style.transform = "translateX(" + (w1 - w2 - 14) +"px)"; 
    },
	},
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/element-variables.scss";
/* 页面标签 */
.pagetabs {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 50px;
	line-height: 50px;
	padding: 0 132px 0 48px;
	box-sizing: border-box;
	background-color: #fff;
}
.pagetabs > div {
	position: absolute;
}

.pagetabs .icon {
	width: 32px;
	height: 32px;
	padding: 0;
	text-align: center;
}
.pagetabs .icon,
.pagetabs .icon,
.pagetabs .tab li {
	margin: 9px 4px;
	padding: 0 10px;
	box-sizing: border-box;
	line-height: 32px;
	font-size: 14px;
	color: $--color-primary;
	border: none;
	background-color: rgb(217, 234, 255);
	cursor: pointer;
	transition: all 0.2s;
}
.pagetabs .icon.prev {
	left: 6px;
}
.pagetabs .icon.next {
	right: 90px;
}
.pagetabs .icon.refresh {
	right: 48px;
}
.pagetabs .icon.down {
	right: 6px;
}
.pagetabs .icon.down i {
	color: $--color-primary;
}

.pagetabs .icon:hover,
.pagetabs .icon:hover i,
.pagetabs .tab li:hover,
.pagetabs .tab li.active {
	background-color: $--color-primary;
	color: #fff;
}
.pagetabs .tab li.home {
	// width: 32px !important;
}
.pagetabs .tab li .el-icon-close {
	float: right;
	position: relative;
	top: 9px;
	left: 5px;
	width: 0;
	overflow: hidden;
	transition: width 0.2s;
}
.pagetabs .tab li:hover .el-icon-close {
	width: 14px;
}

.pagetabs .tab {
	width: calc(100% - 180px);
	overflow: hidden;
}
.pagetabs .tab ul {
	list-style: none;
	margin: 0;
	padding: 0;
	height: 50px;
	font-size: 0;
	white-space: nowrap;
  transition: all .3s;
}
.pagetabs .tab li {
	display: inline-block;
}
</style>
