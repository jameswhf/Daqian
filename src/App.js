import React, { Component } from 'react'
import getChart from './components/vega-chart/VegaFactory'

import './App.css'

const corpLogo = 'https://mayidata-image.oss-cn-hangzhou.aliyuncs.com/demo/domain_logo_x871dad7c8c374d079b9051c.png'
const charts = [ 'column', 'stack_column', 'group_column', 'demo' ]

class App extends Component {
	renderHeader () {
		return (
			<div style={{ height: 120 }} className="column-flex">
				<div style={{ height: 40 }} className="row-flex-center font-5xl">
					Vega-lite实验项目, 探索vega的能力
				</div>
				<div className="flex1 row-flex-center">
					<img alt="guandata" src={corpLogo} className="corpLogo" />
					{navigator.userAgent}
				</div>
			</div>
		)
	}
	render() {
		return (
			<div>
				{this.renderHeader()}
				<div className="list-grid flex1" style={{ marginTop: 20 }}>
					{charts.map(type => {
						const TargetChart = getChart(type)
						return (
							<div key={type} className="flex-auto relative card hover-shadow-4 br2">
								<TargetChart id={type} />
								<div className="column-flex">
									<div className="flex1">{type}</div>
									<div className="flex1">{'这是描述信息'}</div>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		)
	}
}

export default App;
