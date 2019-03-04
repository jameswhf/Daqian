import React, { Component } from 'react';
import DemoChart from './components/charts/DemoChart'

import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<DemoChart id="demoChart" />
			</div>
		);
	}
}

export default App;
