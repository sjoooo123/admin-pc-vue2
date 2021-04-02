<template>
	<div class="baidumap"></div>
</template>
<script>
import BMap from 'BMap'

export default {
	name: 'BaiduMap',
	props: {
		outerProps: {
			type: Object,
			default: () => {
				return {
					center: '北京',
					defaultZoom: 10,
				}
			},
		},
	},
	data() {
		return {
			map: {},
			markers: [],
		}
	},
	mounted() {
		this.handleInit()
	},
	methods: {
		handleInit() {
			this.map = new BMap.Map(
				document.getElementsByClassName('baidumap')[0],
				{
					minZoom: 5,
					maxZoom: 15,
				}
			)
			// 地图设置中心点坐标和地图级别
			this.map.centerAndZoom(
				this.outerProps.center,
				this.outerProps.defaultZoom
			)
			// 启用滚轮放大缩小
			this.map.enableScrollWheelZoom()

			// 示例，添加覆盖物
			this.addOverlay()
		},
		// 示例，添加覆盖物
		addOverlay() {},
	},
}
</script>
<style lang="scss" scoped>
.baidumap {
	width: 100%;
	height: 100%;
}
</style>
