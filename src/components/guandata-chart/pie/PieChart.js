/**
 * PieChart: 1个维度 + 1个数值
 * 功能点:
 * 1. 主题/颜色
 * 2. 数据标签(类别, 数值, 百分比, 引导线, 分隔符); 字体; 标签位置(Pie图外侧,Pie图边缘内侧,扇形居中)
 * 3. 图例
 * 4. 工具提示
 * 5. 卡片背景色
 * 6. ColorBy(里面为啥有聚合方式、数据格式？)
 * 7. 拆分
 * 注: 筛选、排序由数据接口提供
 *
 * 思考点: 数据缺失或是0值如何展示
 */

/**
 * 饼图延伸: 环图、玫瑰图、嵌套饼图
 * 难点:
 * 	  1. 数据标签的位置
 * 	  2. 交互(外移、高亮)
 */
import { data as pieTable } from './pie-data'
import VegaChart from '../../vega-chart/VegaChart'

const pieValues = pieTable //.filter(row => row['利润'] !== null)

const spec = {
	$schema: 'https://vega.github.io/schema/vega/v5.json',
	width: 400,
	height: 200,
	padding: 5,
	autosize: 'fit',
	data: [
		{
			name: 'table',
			values: pieValues, // [{ '店铺名称': '广东分店', '利润': 196089.09 }], 利润存在null的情况
			transform: [
				{
					type: 'pie',
					field: '利润', // 按利润计算角度
					// startAngle: 0,
					// endAngle: 2 * Math.PI,
					as: [ 'startDeg', 'endDeg' ] // 角度
				}
			]
		}
	],
	signals: [
		{
			name: 'pieRadius',
			init: '(min(height, width) - 50)/2',
		},
		{
			name: 'pieInnerRadiusRatio',
			value: 0.2,
		},
		{
			name: 'hoverOnArc',
			value: {},
			on: [
				{ events: 'arc:mouseover', update: 'datum' },
				{ events: 'arc:mouseout', update: '{}' }
			]
		},
		{
			name: 'clickedArcs',
			value: [ {} ],
			on: [
				{
					// events: 'arc:click[event.shiftKey]',
					events: 'arc:click',
					update: 'if (clickedArcs[0]["店铺名称"] === datum["店铺名称"], [{}], [ datum ])'
				}
			]
		}
	],
	scales: [
		{
			name: 'colorScale',
			type: 'ordinal',
			domain: { data: 'table', field: '店铺名称' },
			range: { scheme: 'category20' },
		},
	],
	marks: [
		{
			type: 'arc',
			from: { data: 'table' },
			encode: {
				// enter: {
				// 	x: { signal: 'width / 2' },
				// 	y: { signal: 'height / 2' },
				// },
				update: {
					x: { signal: 'width / 2 + if(datum["店铺名称"] === clickedArcs[0]["店铺名称"], 10 * cos(datum.startDeg / 2 + datum.endDeg / 2 - PI / 2), 0)' },
					y: { signal: 'height / 2 + if(datum["店铺名称"] === clickedArcs[0]["店铺名称"], 10 * sin(datum.startDeg / 2 + datum.endDeg / 2 - PI/2), 0)' },
					fill: { scale: 'colorScale', field: '店铺名称' },
					fillOpacity: { value: 1 },
					startAngle: { field: 'startDeg' },
					endAngle: { field: 'endDeg' },
					outerRadius: { signal: 'pieRadius' },
					innerRadius: { signal: 'pieRadius * pieInnerRadiusRatio' }, // 有值时可以画出圆环
					padAngle: { value: Math.PI / 180 }, // 相邻Arc间的空隙角度
					cornerRadius: { value: 2 }, // Arc的两个外侧角的radius
				},
				hover: {
					fillOpacity: { value: 0.8 },
				}
			}
		},
		{
			type: 'arc',
			from: { data: 'table' },
			interactive: false,
			encode: {
				enter: {
					x: { signal: 'width / 2' },
					y: { signal: 'height / 2' },
				},
				update: {
					fill: { scale: 'colorScale', field: '店铺名称' },
					fillOpacity: { signal: 'if(hoverOnArc["店铺名称"] === datum["店铺名称"] && !clickedArcs[0]["店铺名称"], 0.5, 0)' },
					startAngle: { field: 'startDeg' },
					endAngle: { field: 'endDeg' },
					outerRadius: { signal: 'pieRadius + 10' },
					innerRadius: { signal: 'pieRadius' }, // 有值时可以画出圆环
				}
			}
		},
		{
			type: 'text',
			from: { data: 'table' },
			interactive: false,
			encode: {
				enter: {
					x: { signal: 'width / 2' },
					y: { signal: 'height / 2' },
					theta: { signal: '(datum.startDeg + datum.endDeg)/2' },
					// radius: { signal: 'pieRadius + 10' }, // 数据标签外(TODO: 根据arc的radius自动设置)
					// radius: { signal: 'pieRadius - 15' }, // 数据标签内
					radius: { signal: 'pieRadius * (1 + pieInnerRadiusRatio) / 2' }, // 内部居中
					fill: { value: 'pink' },
					// text: { field: '店铺名称' },
					text: { // 数据标签 [ 类别名称, 数值, 百分比, 分隔符, 显示引导线]
						signal: composeLabels([ '店铺名称', '利润' ], ': '),
						// signal: 'datum["店铺名称"] + datum["利润"]'
					},
					align: { value: 'center' },
				}
			}
		}
	],
}

function composeLabels (fieldNames, separator) {
	const strVs = fieldNames.map(n => `datum["${n}"]`)
	return `join([${strVs.join(',')}], "${separator} ")`
}

/**
 * TODO:
 * 	1. 根据Arc的radius, 自动调节text的radius [Done]
 * 	2. 数据标签自由组合 [Done]
 * 	3. 弄明白text的展示(位置的含义，对齐的意思 。。。。字体设置也需要覆盖)
 * 	4. 数据标签外侧的延长线如何计算
 * 	5. 环显示的空心占比 [Done]
 * 	6. hover效果(1. radius变大, 2. 外侧有薄层)[Done] 动画呢？
 * 	7. 点击外侧延展[Done] 动画呢？
 *  7. 主题色绘制
 */


class GPieChart extends VegaChart {
	componentDidMount () {
		console.log(pieValues)
		this.renderTo(spec)
		this.chartInstance.addSignalListener('clickedArcs', this.onClickListener)
	}
	componentWillUnmount () {
		this.chartInstance.removeSignalListener('clickedArcs', this.onClickListener)
	}

	onClickListener = (name, value) => {
		console.log(name, value)
	}
}

export default GPieChart
