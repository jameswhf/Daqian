import VegaChart from './VegaChart'

const spec = {
	"$schema": 'https://vega.github.io/schema/vega/v5.json',
	width: 400,
	height: 200,
	padding: 5,
	autosize: 'fit',

	data: [
		{
			name: 'table',
			values: [
				{"x": 0, "y": 28, "c":0}, {"x": 0, "y": 20, "c":1},
				{"x": 1, "y": 43, "c":0}, {"x": 1, "y": 35, "c":1},
				{"x": 2, "y": 81, "c":0}, {"x": 2, "y": 10, "c":1},
				{"x": 3, "y": 19, "c":0}, {"x": 3, "y": 15, "c":1},
				{"x": 4, "y": 52, "c":0}, {"x": 4, "y": 48, "c":1},
				{"x": 5, "y": 24, "c":0}, {"x": 5, "y": 28, "c":1},
				{"x": 6, "y": 87, "c":0}, {"x": 6, "y": 66, "c":1},
				{"x": 7, "y": 17, "c":0}, {"x": 7, "y": 27, "c":1},
				{"x": 8, "y": 68, "c":0}, {"x": 8, "y": 16, "c":1},
				{"x": 9, "y": 49, "c":0}, {"x": 9, "y": 25, "c":1}
			]
		}
	],
	scales: [
		{
			name: 'xscale',
			type: 'point',
			domain: { data: 'table', field: 'x' },
			range: 'width',
		},
		{
			name: 'yscale',
			type: 'linear',
			domain: { data: 'table', field: 'y' },
			range: 'height',
		},
		{
			name: 'color',
			type: 'ordinal',
			domain: { data: 'table', field: 'c' },
			range: 'category'
		}
	],
	axes: [
		{ orient: 'bottom', scale: 'xscale' },
		{ orient: 'left', scale: 'yscale' },
	],
	marks: [
		{
			type: 'group',
			from: {
				facet: {
					data: 'table',
					name: 'series',
					groupby: 'c',
				}
			},
			marks: [
				{
					type: 'line',
					from: { data: 'series' },
					interpolate: 'linear', // monotone, step
					interactive: true,
					encode: {
						enter: {
							x: { scale: 'xscale', field: 'x' },
							y: { scale: 'yscale', field: 'y' },
							stroke: { scale: 'color', field: 'c' },
							strokeWidth: { value: 5 }
						}
					}
				}
			]
		}
	],
}


class VegaLine extends VegaChart {
	componentDidMount () {
		this.renderTo(spec)
	}
}

export default VegaLine