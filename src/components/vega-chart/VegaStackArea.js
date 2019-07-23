import VegaChart from './VegaChart'

/**
 * "STACKED_AREA"
 * row: [ 'x' ]
 * column: [ 'c' ], 有种个c值就有多少层堆积
 * metric: [ 'y' ]
 * 问题: hover需要按x-axes位置, 给出所有线在当前x-postion的对应值。[ { c1, y1 }, { c1, y2 }, { c2, y1 }, { c2, y2 } ...]
 * 问题2: 每个series对应的point symbol不同
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
					groupby: [ 'x' ],
					sort: { field: 'c' },
					field: 'y'
				}
			]
		}
	],
	scales: [
		{
			name: 'xscale',
			type: 'linear',
			domain: { data: 'table', field: 'x' },
			range: 'width',
		},
		{
			name: 'yscale',
			type: 'linear',
			domain: { data: 'table', field: 'y1' },
			range: 'height',
			nice: true,
		},
		{
			name: 'color',
			type: 'ordinal',
			domain: { data: 'table', field: 'c' },
			range: 'category'
		}
	],
	axes: [
		{ orient: 'bottom', scale: 'xscale', tickCount: 10 },
		{ orient: 'left', scale: 'yscale' },
	],
	marks: [
		{
			type: 'group',
			from: {
				facet: {
					name: 'series',
					data: 'table',
					groupby: 'c',
				}
			},
			marks: [
				{
					type: 'area',
					from: { data: 'series' },
					encode: {
						enter: {
							x: { scale: 'xscale', field: 'x' },
							y: { scale: 'yscale', field: 'y0' },
							y2: { scale: 'yscale', field: 'y1' },
							fill: { scale: 'color', field: 'c' },
							interpolate: { value: 'monotone' }
						},
						update: {
							fillOpacity: { value: 1 }
						},
						hover: {
							fillOpacity: { value: 0.5 }
						}
					}
				}
			]
		}
	]
}


class VegaStackArea extends VegaChart {
	componentDidMount () {
		this.renderTo(spec)
	}
}

export default VegaStackArea