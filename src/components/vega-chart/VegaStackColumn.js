import VegaChart from './VegaChart'

/**
 * STACKED_COLUMN
 * row: [ 'x' ]
 * column: [ 'c' ]
 * metric: [ 'y' ]
 */
const spec = {
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"width": 500,
	"height": 200,
	"padding": 5,

	"data": [
		{
			"name": "table",
			"values": [
				{"x": 0, "y": 28, "c":0}, {"x": 0, "y": 55, "c":1},
				{"x": 1, "y": 43, "c":0}, {"x": 1, "y": 91, "c":1},
				{"x": 2, "y": 81, "c":0}, {"x": 2, "y": 53, "c":1},
				{"x": 3, "y": 19, "c":0}, {"x": 3, "y": 87, "c":1},
				{"x": 4, "y": 52, "c":0}, {"x": 4, "y": 48, "c":1},
				{"x": 5, "y": 24, "c":0}, {"x": 5, "y": 49, "c":1},
				{"x": 6, "y": 87, "c":0}, {"x": 6, "y": 66, "c":1},
				{"x": 7, "y": 17, "c":0}, {"x": 7, "y": 27, "c":1},
				{"x": 8, "y": 68, "c":0}, {"x": 8, "y": 16, "c":1},
				{"x": 9, "y": 49, "c":0}, {"x": 9, "y": 15, "c":1}
			],
			transform: [
				{
					type: 'stack',
					field: 'y',
					groupby: [ 'x' ],
					sort: { field: 'c' }
				}
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
			domain: { data: 'table', field: 'x' },
			range: 'width',
			paddingInner: 0.1,
			paddingOuter: 0.1,
		},
		{
			name: 'yscale',
			type: 'linear',
			domain: { data: 'table', field: 'y1' },
			range: 'height',
			nice: true, // quantitative scales, 让domain的start、end都是整数. [0.2034, 0.9965]会用 [0.2, 1.0]
			zero: false,
		},
		{
			name: 'color',
			type: 'ordinal',
			domain: { data: 'table', field: 'c' },
			range: [ 'steelblue', 'firebrick' ]
		}
	],
	axes: [
		{ scale: 'xscale', orient: 'bottom' },
		{ scale: 'yscale', orient: 'left', tickCount: 3 },
	],
	marks: [
		{
			type: 'rect',
			from: { data: 'table' },
			encode: {
				enter: {
					x: { scale: 'xscale', field: 'x' },
					width: { scale: 'xscale', band: 1 },
					y: { scale: 'yscale', field: 'y0' },
					y2: { scale: 'yscale', field: 'y1' },
					fill: { scale: 'color', field: 'c' }
				},
				update: {
					fillOpacity: { value: 1 },
				},
				hover: {
					fillOpacity: { value: 0.5 }
				}
			}
		},
		{
			type: 'text',
			interactive: false,
			encode: {
				enter: {
					align: { value: 'center' },
					fill: { value: '#4285F4' },
				},
				update: {
					x: { scale: 'xscale', signal: 'tooltip.x', band: 0.5 },
					y: { scale: 'yscale', signal: 'tooltip.y1', offset: -2 },
					text: { signal: 'tooltip.y' }
				},
				hover: {
					fillOpacity: { value: 1 }
				}
			},
		}
	]
}



class VegaStackColumn extends VegaChart {
	componentDidMount () {
		this.renderTo(spec)
	}
}

export default VegaStackColumn