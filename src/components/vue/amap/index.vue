<template>
	<div
		class="mapBox"
		v-loading="!mapComplete"
		element-loading-text="地图绘制中..."
		element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(1,6,29, 0.5)"
	>
		<div id="amap"></div>
	</div>
</template>
<script>
import AMap from 'AMap';

export default {
	name: 'amap',
	props: {
		adcode: String,
	},
	data() {
		return {
			map: {},
			mapComplete: false, // 地图是否绘制完成
			currentArea: {}, // // 当前高亮区域
			polylines: [], // 区域边线
			levels: ['country', 'province', 'city', 'district', 'biz_area'], // 地图级别
		}
	},
	mounted() {
		this.getMapData()
	},
	watch: {
		// 监听地图经纬度绘制数据
		// adcode: {
		// 	handler(newV, oldV) {
		// 		this.drawMap()
		// 	},
		// 	immediate: false,
		// 	deep: true,
		// },
	},
	methods: {
		// 获取行政区域经纬度数据-更详细的需要自己绘制
		async getMapData() {
			const res = await this.$svc.api_map_get() // 只有当前层区域数据
			if (!res) return
			this.mapdata = res.data.data.features[0]
			this.drawMap()
		},
		// 绘制地图
		drawMap() {
			const center = this.mapdata.properties.center
			const zoom = 7 + this.levels.indexOf(this.mapdata.properties.level)
			const mask = this.mapdata.geometry.coordinates[0][0]
			this.map = new AMap.Map('amap', {
				center: center, //中心点位置
				mask: mask, //边界信息，库中获取
				resizeEnable: true,
				rotateEnable: true,
				pitchEnable: true,
				buildingAnimation: true, //楼块出现是否带动画
				expandZoomRange: true,
				viewMode: '3D', //三维地图
				labelzIndex: 130,
				pitch: 55, //倾斜度
				zoom: zoom, //缩放级别
				// skyColor: '#1a4e76', //指定天空颜色
				mapStyle: 'amap://styles/darkblue', //添加自定义样式
			})

			// 地图控件
			AMap.plugin(['AMap.ControlBar'], () => {
				// 添加 3D 罗盘控制
				this.map.addControl(
					new AMap.ControlBar({
						position: {
							right: '0',
							bottom: '0',
						},
						showZoomBar: false,
					})
				)
			})

			// 添加其他覆盖物和图层
			this.map.on('complete', () => {
				this.mapComplete = true

				// 绘制轮廓
				this.draw3D([mask])
				// this.drawTitle()

				// 绑定事件
				// this.map.on('mousemove', (e) => {
				// 	const point = [e.lnglat.getLng(), e.lnglat.getLat()]
				// 	// 判断点在哪个区内
				// 	this.mapdata.features.some((item) => {
				// 		const path = item.geometry.coordinates[0]
				// 		var isPointInRing = AMap.GeometryUtil.isPointInRing(
				// 			point,
				// 			path
				// 		)
				// 		if (
				// 			isPointInRing &&
				// 			this.currentArea.community_id !=
				// 				item.properties.community_id
				// 		) {
				// 			this.currentArea = item.properties
				// 		}
				// 		return isPointInRing
				// 	})
				// })
			})
		},
		draw3D(bounds) {
			//添加高度面
			var object3Dlayer = (this.object3Dlayer = new AMap.Object3DLayer({
				zIndex: 1,
			}))
			this.map.add(object3Dlayer)
			var height = -8000
			var color = '#0088ffcc' //rgba
			var wall = new AMap.Object3D.Wall({
				path: bounds,
				height: height,
				color: color,
			})
			wall.transparent = true
			object3Dlayer.add(wall)

			//添加描边
			for (var i = 0; i < bounds.length; i += 1) {
				new AMap.Polyline({
					path: bounds[i],
					strokeColor: '#57cbff',
					strokeWeight: 4,
					map: this.map,
				})
			}

			// 添加区域描边
			// for (i = 0; i < this.mapdata.features.length; i++) {
			// 	var polyline = new AMap.Polyline({
			// 		path: this.mapdata.features[i].geometry.coordinates[0],
			// 		strokeColor: '#57cbff',
			// 		strokeOpacity: 0.5,
			// 		strokeWeight: 2,
			// 		map: this.map,
			// 		extData: {
			// 			// 方便高亮
			// 			community_id: this.mapdata.features[i].properties
			// 				.community_id,
			// 		},
			// 	})
			// 	this.polylines.push(polyline)
			// }
		},
		// 绘制区域名称
		drawTitle() {
			this.mapdata.features.map((item) => {
				// 添加文字
				var text = new AMap.Text({
					text: item.properties.name,
					position: item.properties.center,
					offset: new AMap.Pixel(0, -50),
					style: {
						'background-color': 'transparent',
						'-webkit-text-stroke': 'red',
						'-webkit-text-stroke-width': '0.5px',
						'text-align': 'center',
						border: 'none',
						color: 'white',
						'font-size': '24px',
						'font-weight': 600,
					},
				})

				text.setMap(this.map)
				return false
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.mapBox,
#amap {
	width: 100%;
	height: 100%;
}
</style>
