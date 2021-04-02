<template>
	<el-tabs tab-position="left">
		<el-tab-pane label="柱状图">
			<el-tabs>
				<el-tab-pane label="动态数据">
					<Echart
						id="chart-bar-1"
						:optionFun="getBar1Option"
						:svcFunString="'api_echart_bar1_get'"
						width="500px"
						height="300px"
					/>
				</el-tab-pane>
				<el-tab-pane label="静态数据">
					<Echart
						id="chart-bar-2"
						:optionFun="getBar1Option"
						:outerData="staticData"
						width="500px"
						height="300px"
					/>
				</el-tab-pane>
			</el-tabs>
		</el-tab-pane>
		<el-tab-pane label="折线图">
			<Echart
				id="chart-line-1"
				:optionFun="getLine1Option"
				width="500px"
				height="300px"
			/>
		</el-tab-pane>
		<el-tab-pane label="饼图">
			<Echart
				id="chart-pie-1"
				:optionFun="getPie1Option"
				width="500px"
				height="300px"
			/>
		</el-tab-pane>
		<el-tab-pane label="地图">
			<el-tabs>
				<el-tab-pane label="中国地图">
					<Echart
						id="chart-map-china-1"
						:optionFun="getChinaMap1Option"
						width="500px"
						height="300px"
					/>
				</el-tab-pane>
				<el-tab-pane label="世界地图">
					<Echart
						id="chart-map-world-1"
						:optionFun="getWorldMap1Option"
						width="500px"
						height="300px"
					/>
				</el-tab-pane>
				<el-tab-pane label="百度地图">
					<Echart
						id="chart-map-bmap-1"
						:optionFun="getBMap1Option"
						width="1000px"
						height="400px"
					/>
				</el-tab-pane>
				<el-tab-pane label="省市地图">
					<p>香港地图</p>
					<Echart
						id="chart-map-province-hk"
						:optionFun="getProvincesMapHKOption"
						width="800px"
						height="400px"
					/>
				</el-tab-pane>
			</el-tabs>
		</el-tab-pane>
	</el-tabs>
</template>

<script>
import { getBar1Option } from '@/components/vue/echart/options/bar.js'
import { getLine1Option } from '@/components/vue/echart/options/line.js'
import { getPie1Option } from '@/components/vue/echart/options/pie.js'
// map图表
import { getChinaMap1Option } from '@/components/vue/echart/options/map/china.js'
import { getWorldMap1Option } from '@/components/vue/echart/options/map/world.js'
import { getBMap1Option } from '@/components/vue/echart/options/map/BMap.js'
import { getProvincesMapHKOption } from '@/components/vue/echart/options/map/province.js'
export default {
	data() {
		return {
			staticData: [
				{
					'2015': 31.16,
					'2016': 71.78,
					'2017': 74.5,
					product: 'Christopher Clark',
				},
				{
					'2015': 53.3,
					'2016': 73.8,
					'2017': 44.7,
					product: 'Gary Taylor',
				},
				{
					'2015': 32.4,
					'2016': 67.31,
					'2017': 85.43,
					product: 'Eric Williams',
				},
				{
					'2015': 47.4,
					'2016': 98.4,
					'2017': 32.1,
					product: 'Angela Young',
				},
				{
					'2015': 82.83,
					'2016': 33.56,
					'2017': 47.8,
					product: 'Mary Davis',
				},
				{
					'2015': 42.7,
					'2016': 83.75,
					'2017': 43.72,
					product: 'Patricia Gonzalez',
				},
			],
		}
	},
	computed: {
		getBar1Option: () => getBar1Option,
		getLine1Option: () => getLine1Option,
		getPie1Option: () => getPie1Option,
		getChinaMap1Option: () => getChinaMap1Option,
		getWorldMap1Option: () => getWorldMap1Option,
		getBMap1Option: () => getBMap1Option,
		getProvincesMapHKOption: () => getProvincesMapHKOption,
	},
}
</script>

<style lang="scss" scoped></style>
