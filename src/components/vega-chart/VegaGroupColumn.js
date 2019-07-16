import VegaChart from './VegaChart'

/**
 * GROUPED_COLUMN
 * row: [ 'category' ]
 * column: [ 'position' ]
 * metric: [ 'value' ]
 */

const spec = {
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"width": 300,
	"height": 240,
	"padding": 5,
	autosize: 'fit',

	"data": [
		{
			"name": "table",
			"values": [
				{"category":"A", "position":0, "value":0.1},
				{"category":"A", "position":1, "value":0.6},
				{"category":"A", "position":2, "value":0.9},
				{"category":"A", "position":3, "value":0.4},
				{"category":"B", "position":0, "value":0.7},
				{"category":"B", "position":1, "value":0.2},
				{"category":"B", "position":2, "value":1.1},
				{"category":"B", "position":3, "value":0.8},
				{"category":"C", "position":0, "value":0.6},
				{"category":"C", "position":1, "value":0.1},
				{"category":"C", "position":2, "value":0.2},
				{"category":"C", "position":3, "value":0.7}
			]
		}
	],
	scales: [
		{
			name: 'xscale',
			type: 'band',
			domain: { data: 'table', field: 'category' },
			range: 'width',
			padding: 0.2
		},
		{
			name: 'yscale',
			type: 'linear',
			domain: { data: 'table', field: 'value' },
			range: 'height',
			round: true,
			nice: true,
		},
		{
			name: 'color',
			type: 'ordinal',
			domain: { data: 'table', field: 'position' },
			range: { scheme: 'category20' },
		}
	],
	axes: [
		{ orient: 'bottom', scale: 'xscale' },
		{ orient: 'left', scale: 'yscale' }
	],
	legends: [
		{
			fill: 'color', // name of scale that maps to a fill color
			orient: 'right',
			direction: 'vertical',
			title: 'Position',
			symbolType: 'arrow',
			tickCount: 2,
			encode: {
				title: {
					update: {
						fontSize: { value: 14 },
						fill: { value: 'firebrick' }
					}
				},
				labels: {
					interactive: true,
					update: {
						fontSize: { value: 14 },
						fill: { value: 'black' }
					},
					hover: {
						fill: { value: 'blue' }
					}
				},
				symbols: {
					update: {
						stroke: { value: 'transparent' }
					}
				},
				legend: {
					update: {
						stroke: { value: '#ccc' },
						strokeWidth: { value: 1.5}
					}
				}
			}
		}
	],
	marks: [
		{
			type: 'group',
			from: {
				facet: {
					data: 'table',
					name: 'g_data',
					groupby: 'category'
				}
			},
			encode: {
				enter: {
					x: { scale: 'xscale', field: 'category' }
				}
			},
			signals: [
				{ name: 'width', update: 'bandwidth("xscale")' }
			],
			scales: [
				{
					name: 'pos',
					type: 'band',
					domain: { data: 'g_data', field: 'position' },
					range: 'width',
				}
			],
			marks: [
				{
					name: 'cols',
					type: 'rect',
					from: { data: 'g_data' },
					encode: {
						enter: {
							x: { scale: 'pos', field: 'position' },
							width: { scale: 'pos', band: 1 },
							y: { scale: 'yscale', value: 0 },
							y2: { scale: 'yscale', field: 'value' },
							fill: { scale: 'color', field: 'position' }
						}
					},
				},
				{
					name: 'metric_value',
					type: 'text',
					from: { data: 'g_data' },
					encode: {
						enter: {
							x: { scale: 'pos', field: 'position', band: 0.5 },
							y: { scale: 'yscale', field: 'value', offset: 10 },
							stroke: { value: 'white' },
							text: { field: 'value' },
							align: { value: 'center' }
						}
					}
				}
			]
		}
	]
}



class VegaGroupColumn extends VegaChart {
	componentDidMount () {
		this.renderTo(spec)
	}
}

export default VegaGroupColumn