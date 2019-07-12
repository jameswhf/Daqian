const util = require('vega-util')
const vega = require('vega-dataflow')
const tx = require('vega-transforms')

const data = [
	{"a": 0, "b": "a", "c": 6.3},
	{"a": 0, "b": "a", "c": 4.2},
	{"a": 0, "b": "b", "c": 6.8},
	{"a": 0, "b": "c", "c": 5.1},
	{"a": 1, "b": "b", "c": 4.4},
	{"a": 2, "b": "b", "c": 3.5},
	{"a": 2, "b": "c", "c": 6.2}
]

const [ a, b, c ] = [ 'a', 'b', 'c' ].map(v => util.field(v))

const df = new vega.Dataflow()
const col = df.add(tx.collect)

const agg = df.add(tx.aggregate, {
	groupby: [ a ],
	pulse: col,
})

const formula = df.add(tx.formula, {
	expr: util.accessor((t) => 20 * t.count, []),
	pulse: agg,
	as: 'span',
})

// const coll = df.add(tx.collect)

const out = df.add(tx., { pulse: formula })

const extent = df.add(tx.extent, {
	field: util.field('span'),
	pulse: out,
})

df.pulse(col, vega.changeset().insert(data)).run()

console.log(out.value)