import VegaChart from './VegaChart'

/**
 * 功能罗列
 * 1. 主题/颜色
 * 2. 坐标轴(a, b, b1, d 支持)
 * 		a. X, Y的显示控制 b. X/Y轴标题展示与否 b1. X轴标签字符长度,标签间隔 c.Y轴范围 d. 刻度网格线 e. 数据步长 f. 缩略轴(辅助区间选择)
 * 3. 数据标签 (a, f, d的一部分可以)
 * 		a. 是否展示 b. 系列名称(fd.name)+类别名称(对于维度值)+数值 c.分隔符 d. 标签的位置(外，内, 居中, 内侧) f. 字体设置
 * 4. 辅助线
 * 		a. 固定值 b. 平均、中位、最大、最小 c. 多个辅助线 d. 辅助线数值展示 + tooltip
 * 5. 背景色 (支持)
 *
 * 问题点:
 * 		1. Y轴的范围(没有直接方式可以指定Y轴范围)
 * 		2. 数据步长需要指定数组
 * 		3. 数据标签的组合显示、居中&内侧。标签使用text mark来展示，只能指定一个字段, 另外暂时不知道如何拿到字段名，format的使用不太清楚
 * 		4. rule作为辅助线还需要做更多了解
 */

const spec = {
	$schema: 'https://vega.github.io/schema/vega/v5.json',
	width: 400,
	height: 200,
	padding: 5,
	autosize: 'fit',

	data: [
		{
			name: 'table',
			values: [
				{category: 'Agentina', amount: 28},
				{category: 'Brazil', amount: 55},
				{category: 'C', amount: 43},
				{category: 'D', amount: 91},
				{category: 'E', amount: 81},
				{category: 'F', amount: 53},
				{category: 'G', amount: 19},
				{category: 'H', amount: 87},
				{category: 'I', amount: 52}
			]
		}
	],
	signals: [
		{
			name: 'tooltip',
			value: {},
			on: [
				{ events: 'rect:mouseover', update: 'datum' },
				{ events: 'rect:mouseout', update: '{}' }
			]
		}
	],
	scales: [
		{
			name: 'xscale',
			type: 'band',
			domain: { data: 'table', field: 'category' },
			range: 'width',
			padding: 0.05,
			round: true,
		},
		{
			name: 'yscale',
			domain: { data: 'table', field: 'amount' },
			range: 'height',
			nice: true,
		},
	],
	axes: [
		{ orient: 'bottom', scale: 'xscale' },
		{ orient: 'left', scale: 'yscale', tickCount: 5, offset: 0 },
	],
	marks: [
		{
			type: 'rect',
			from: { data: 'table' },
			encode: {
				enter: {
					x: { scale: 'xscale', field: 'category' },
					width: { scale: 'xscale', band: 1 },
					y: { scale: 'yscale', field: 'amount' },
					y2: { scale: 'yscale', value: 0 },
				},
				update: {
					fill: { value: 'steelblue' }
				},
				hover: {
					fill: { value: 'red' }
				}
			}
		},
		{
			type: 'text',
			from: { data: 'table' },
			encode: {
				enter: {
					align: { value: 'center' },
					baseline: { value: 'bottom' },
					fill: { value: '#666' }
				},
				update: {
					x: { scale: 'xscale', signal: 'tooltip.category', band: 0.5 },
					y: { scale: 'yscale', signal: 'tooltip.amount', offset: -2 },
					text: { signal: 'tooltip.amount' },
					fillOpacity: [
						{ value: 1 },
					]

				}
			}
		}
	],
}


class VegaColumn extends VegaChart {
	componentDidMount () {
		this.renderTo(spec)
	}
}

export default VegaColumn