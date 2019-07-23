import VegaChart from './VegaChart'

/**
 * BASIC_AREA
 * row: [ 'u' ]
 * metric: [ 'v' ]
 */
const spec = {
	"$schema": 'https://vega.github.io/schema/vega/v5.json',
	width: 400,
	height: 200,
	padding: 5,
	autosize: 'fit',

	data: [
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
	scales: [
		{
			name: 'xscale',
			type: 'linear',
			domain: { data: 'table', field: 'u' },
			range: 'width',
			zero: false,
		},
		{
			name: 'yscale',
			type: 'linear',
			domain: { data: 'table', field: 'v' },
			range: 'height',
			nice: true,
		},
	],
	axes: [
		{ orient: 'bottom', scale: 'xscale', tickCount: 20 },
		{ orient: 'left', scale: 'yscale' },
	],
	marks: [
		{
			type: 'area',
			from: { data: 'table' },
			// interpolate: 'cardinal',
			encode: {
				enter: {
					x: { scale: 'xscale', field: 'u' },
					y: { scale: 'yscale', field: 'v' },
					y2: { scale: 'yscale', value: 0 },
					fill: { value: 'steelblue' },
					interpolate: { value: 'monotone' }
				},
				update: {
					fillOpacity: { value: 1 },
				},
				hover: {
					fillOpacity: { value: 0.6 }
				}
			}
		}
	],
}


class VegaArea extends VegaChart {
	componentDidMount () {
		this.renderTo(spec)
	}
}

export default VegaArea