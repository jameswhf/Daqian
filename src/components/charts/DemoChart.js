import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * 先罗列一些方向性思考:
 * 1. Vega把事件封装成了Selection Signal,并转化为数据驱动Chart更新。图表联动&钻取需要view.addSignalListener监听并处理selection
 *    eg. https://observablehq.com/@mbostock/observing-vega-signals
 * 2. Tooltip自定义, (handler, event, item, value) => {} 可以通过全局Tooltip样式控制 (React.renderPortal)
 * 	  eg. https://vega.github.io/vega-lite/docs/tooltip.html
 * 	  tooltip默认只能hover到具体的mark上才能起作用, 如果扩大hover区域可能需要透明 rule 的协助
 * 3. 如何设置 default selection: view.signal(name[, value]) Gets or sets a dataflow signal
 * 4. 图表覆盖: TreeMap, Map, 桑基图 等大部分图需要自己实现 spec
 * 5. 丰富的 mark 和 view composition
 * 6. Selections 能带来什么？
 */
const spec = {
	title: 'A Simple Bar Chart',
	description: 'A simple bar chart with embedded data.',
	width: 400,
	height: 600,
	autosize: {
		type: 'pad',
		contains: 'padding',
	},
	data: {
		values: [
			{a: 'A', b: 28},
			{a: 'B', b: 55},
			{a: 'C', b: 43},
			{a: 'D', b: 91},
			{a: 'E', b: 81},
			{a: 'F', b: 53},
			{a: 'G', b: 19},
			{a: 'H', b: 87},
			{a: 'I', b: 52}
		]
	},
	mark: 'bar',
	encoding: {
		x: {field: 'a', type: 'ordinal'},
		y: {field: 'b', type: 'quantitative'}
	},
	config: {
		background: 'red',
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

class DemoChart extends PureComponent {
	static propTypes = {
		id: PropTypes.string,
	}
	componentDidMount () {
		if (window && window.vegaEmbed) {
			window.vegaEmbed(`#${this.props.id}`, spec, opt).then(res => {
				// console.log(res.view.tooltip)
				// res.view.tooltip((handler, event, item, value) => {
				// 	console.log(handler, event, item, value)
				// 	return (<div style={{ border: '1px solid' }}>{value}</div>)
				// })
				// res.view.runAsync()
			})
		}
	}
	render () {
		const style = { width: 400, height: 600 }
		return (
			<div id={this.props.id} style={style} />
		)
	}
}

export default DemoChart