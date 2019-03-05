import React, { Component } from 'react';
import DemoChart from './components/charts/DemoChart'

import './App.css';

const corpLogo = 'https://mayidata-image.oss-cn-hangzhou.aliyuncs.com/demo/domain_logo_x871dad7c8c374d079b9051c.png'
const chartIds = [ 'column', 'multi_column', 'bar', 'bar_line' ]

class App extends Component {
	renderHeader () {
		return (
			<div style={{ height: 120 }} className="column-flex">
				<div style={{ height: 40 }} className="row-flex-center font-5xl">
					Vega-lite实验项目, 探索vega的能力
				</div>
				<div className="flex1 row-flex-center">
					<img alt="guandata" src={corpLogo} className="corpLogo" />
				</div>
			</div>
		)
	}
	render() {
		return (
			<div>
				{this.renderHeader()}
				<div className="list-grid flex1" style={{ marginTop: 20 }}>
					{chartIds.map(chartId => (
						<div key={chartId} className="flex-auto relative card hover-shadow-4 br2">
							<DemoChart id={chartId} />
							<div className="column-flex">
								<div className="flex1">{chartId}</div>
								<div className="flex1">{'这是描述信息'}</div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}
}

export default App;
