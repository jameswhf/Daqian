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
class VegaChart extends PureComponent {
	static propTypes = {
		id: PropTypes.string,
	}
	constructor (props) {
		super(props)
		this.chartInstance = null
	}
	renderTo = (chartSpec, opts) => {
		if (window && window.vega) {
			const _vega = window.vega
			this.chartInstance = new _vega.View(_vega.parse(chartSpec), {
				renderer: 'canvas',
				container: `#${this.props.id}`,
				hover: true,
			})
			this.chartInstance.runAsync()
		}
	}
	render () {
		return (
			<div id={this.props.id} />
		)
	}
}

export default VegaChart