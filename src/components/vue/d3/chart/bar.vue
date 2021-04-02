<template>
	<div class="chart-box">
		<svg width="960" height="600"></svg>
	</div>
</template>
<script>
import * as d3 from 'd3'
export default {
	name: 'd3-bar',
	components: {},
	data() {
		return {}
	},
	mounted() {
		this.init()
	},
	methods: {
		init() {
            var dataset = [250, 210, 170, 130, 90] //数据（表示矩形的宽度）
            //定义一个线性比例尺
            var scaleLinear = d3.scaleLinear()
                .domain([0,d3.max(dataset)])
                .range([0,960]);

			var svg = d3.select('svg') //得到svg画布
			var g = svg.append('g') //定义一个用来装整个图表的一个分组，并设置他的位置

			var rectHeight = 30 //设置每一个矩形的高度

			g.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect')
				.attr('x', 0) //设置左上点的x
				.attr('y', function(d, i) {
					//设置左上点的y
					return i * rectHeight
				})
				.attr('width', function(d) {
					//设置宽
					return scaleLinear(d)
				})
				.attr('height', rectHeight - 5) //设置长
				.attr('fill', 'blue') //颜色填充
		},
	},
}
</script>

<style lang="scss" scoped></style>
