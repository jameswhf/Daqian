import VegaChart from './VegaChart'

const spec = {
	"$schema": "https://vega.github.io/schema/vega/v5.json",
	"width": 300,
	"height": 240,
	"padding": 5,

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

	"scales": [
		{
			"name": "yscale",
			"type": "band",
			"domain": {"data": "table", "field": "category"},
			"range": "height",
			"padding": 0.2
		},
		{
			"name": "xscale",
			"type": "linear",
			"domain": {"data": "table", "field": "value"},
			"range": "width",
			"round": true,
			"zero": true,
			"nice": true
		},
		{
			"name": "color",
			"type": "ordinal",
			"domain": {"data": "table", "field": "position"},
			"range": {"scheme": "category20"}
		}
	],

	"axes": [
		{"orient": "left", "scale": "yscale", "tickSize": 0, "labelPadding": 4, "zindex": 1},
		{"orient": "bottom", "scale": "xscale"}
	],

	"marks": [
		{
			"type": "group",

			"from": {
				"facet": {
					"data": "table",
					"name": "facet",
					"groupby": "category"
				}
			},

			"encode": {
				"enter": {
					"y": {"scale": "yscale", "field": "category"}
				}
			},

			"signals": [
				{"name": "height", "update": "bandwidth('yscale')"}
			],

			"scales": [
				{
					"name": "pos",
					"type": "band",
					"range": "height",
					"domain": {"data": "facet", "field": "position"}
				}
			],

			"marks": [
				{
					"name": "bars",
					"from": {"data": "facet"},
					"type": "rect",
					"encode": {
						"enter": {
							"y": {"scale": "pos", "field": "position"},
							"height": {"scale": "pos", "band": 1},
							"x": {"scale": "xscale", "field": "value"},
							"x2": {"scale": "xscale", "value": 0},
							"fill": {"scale": "color", "field": "position"}
						}
					}
				},
				{
					"type": "text",
					"from": {"data": "bars"},
					"encode": {
						"enter": {
							"x": {"field": "x2", "offset": -5},
							"y": {"field": "y", "offset": {"field": "height", "mult": 0.5}},
							"fill": {"value": "#4285F4"},
							"align": {"value": "white"},
							"baseline": {"value": "middle"},
							"text": {"field": "datum.value"}
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