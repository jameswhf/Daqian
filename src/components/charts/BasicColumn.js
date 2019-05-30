import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import BaseChart from './BaseChart'

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
	title: '单柱图',
	autosize: {
		type: 'pad',
		contains: 'padding',
	},
	data: {
		values: [
			{a: 'Agentina', b: 28},
			{a: 'Brazil', b: 55},
			{a: 'C', b: 43},
			{a: 'D', b: 91},
			{a: 'E', b: 81},
			{a: 'F', b: 53},
			{a: 'G', b: 19},
			{a: 'H', b: 87},
			{a: 'I', b: 52}
		]
	},
	// mark: 'bar',
	encoding: {
		x: {
			field: 'a',
			type: 'ordinal',
			axis: { // null表示不显示
				title: 'a', // 缺失默认展示field名字, null表示不显示

				// 坐标轴线相关
				domain: true, // false隐藏坐标轴线
				domainColor: 'red',
				domainWidth: 4,

				// 坐标轴标签相关
				labels: true, // false隐藏标签
				labelAngle: 0, // nominal & ordinal 默认-90; 其他默认 0
				labelAlign: '', // 水平对齐
				labelBaseline: 'top', // top, middle, bottom, alphabetic, 标签的竖直baseline
				labelLimit: 50, // 标签的最大宽度px (是否支持根据字符长度？)
				labelPadding: 2, // 标签跟轴线的距离
				labelOverlap: true, // 标签有重合时的解决方案
				labelBound: false, // 标签超出轴范围时的展示行为。

				labelFont: 'tahoma',
				labelFontSize: 16,
				labelFontWeight: 300,
				labelColor: 'blue',
				labelOpacity: 0.3,

				// 坐标步长相关
				tickColor: 'blue', // 步长引导线颜色
				ticks: true, // false不展示引导线
				tickWidth: 3, // 引导线的宽度
				tickSize: 5, // 引导线的长度
				// tickExtra: true,

				tickOffset: 0, // 引导线沿轴方向的偏移量
				tickRound: true, // 引导线的像素位置是否就近取整展示
				// values: [ 'C', 'G' ], // (可以辅助做间隔设置吗？估计需要做额外的控制开发)
			},
		},
		y: {
			field: 'b',
			type: 'quantitative',
			axis: { // null表示不显示
				title: 'b', // 缺失默认展示field名字, null表示不显示

				tickCount: 3, // quantitative的坐标轴需要
				values: [30, 50, 90], // 这种设置不能改变轴范围的最小值，如果设置轴范围的最小值？

				// 刻度网格线
				grid: true,
				gridColor: '#4285F4',
				gridOpacity: 0.1,
				gridWidth: 2,

			},
			scale: {
				y: [ 30, 100 ],
			}
		},
	},
	layer: [
		{ mark: 'bar' },
		{
			mark: { type: 'text', baseline: 'top', dy: 20, fontWeight: 700 },
			encoding: {
				text: { field: 'b', type: 'quantitative' },
			}
		},
		{
			mark: 'rule',
			encoding: {
				y: { field: 'b', type: 'quantitative', aggregate: 'mean' },
				size: { value: 2 },
				color: { value: 'black' },
			}
		},
		// {
		// 	mark: 'rule',
		// 	encoding: {
		// 		y: { value: 70 },
		// 		size: { value: 8 },
		// 	}
		// }
	],
	config: {
		view: {
			fill: 'orange',
		}
	},
}

function calculatePosition(event, clientRect, offsetX, offsetY) {
	let x = event.clientX + offsetX;
	if (x + clientRect.width > window.innerWidth) {
		x = +event.clientX - offsetX - clientRect.width;
	}

	let y = event.clientY + offsetY;
	if (y + clientRect.height > window.innerHeight) {
		y = +event.clientY - offsetY - clientRect.height;
	}
	return {x, y};
}

const opt = {
	mode: 'vega-lite',
	actions: false, // Boolean or Object (导出png/svg)
	tooltip: (handler, event, item, value) => {
		const el = document.querySelector('#vg_tooltip')
		if (!value) {
			el.innerHTML = ""
		} else {
			el.innerHTML = JSON.stringify(value)
			const { x, y } = calculatePosition(event, el.getBoundingClientRect(), 50, 50)
			el.setAttribute('style', `top: ${y}px; left: ${x}px`)
		}
	},
}

class BasicColumn extends BaseChart {
	static propTypes = {
	}
	componentDidMount () {
		this.renderTo(spec, opt)
	}
}

export default BasicColumn