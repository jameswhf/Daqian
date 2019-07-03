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
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"width": 500,
	"height": 200,
	"padding": 5,

	"signals": [
		{
			"name": "interpolate",
			"value": "monotone",
			"bind": {
				"input": "select",
				"options": [
					"basis",
					"cardinal",
					"catmull-rom",
					"linear",
					"monotone",
					"natural",
					"step",
					"step-after",
					"step-before"
				]
			}
		}
	],

	"data": [
		{
			"name": "table",
			"values": [
				{"u": 1,  "v": 28}, {"u": 2,  "v": 55},
				{"u": 3,  "v": 43}, {"u": 4,  "v": 91},
				{"u": 5,  "v": 81}, {"u": 6,  "v": 53},
				{"u": 7,  "v": 19}, {"u": 8,  "v": 87},
				{"u": 9,  "v": 52}, {"u": 10, "v": 48},
				{"u": 11, "v": 24}, {"u": 12, "v": 49},
				{"u": 13, "v": 87}, {"u": 14, "v": 66},
				{"u": 15, "v": 17}, {"u": 16, "v": 27},
				{"u": 17, "v": 68}, {"u": 18, "v": 16},
				{"u": 19, "v": 49}, {"u": 20, "v": 15}
			]
		}
	],

	"scales": [
		{
			"name": "xscale",
			"type": "linear",
			"range": "width",
			"zero": false,
			"domain": {"data": "table", "field": "u"}
		},
		{
			"name": "yscale",
			"type": "linear",
			"range": "height",
			"nice": true,
			"zero": true,
			"domain": {"data": "table", "field": "v"}
		}
	],

	"axes": [
		{"orient": "bottom", "scale": "xscale", "tickCount": 20},
		{"orient": "left", "scale": "yscale"}
	],

	"marks": [
		{
			"type": "area",
			"from": {"data": "table"},
			"encode": {
				"enter": {
					"x": {"scale": "xscale", "field": "u"},
					"y": {"scale": "yscale", "field": "v"},
					"y2": {"scale": "yscale", "value": 0},
					"fill": {"value": "steelblue"}
				},
				"update": {
					"interpolate": {"signal": "interpolate"},
					"fillOpacity": {"value": 1}
				},
				"hover": {
					"fillOpacity": {"value": 0.5}
				}
			}
		}
	]
}


class VegaDemoChart extends VegaChart {
	componentDidMount () {
		this.renderTo(spec)
	}
}

export default VegaDemoChart