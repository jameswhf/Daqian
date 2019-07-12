const util = require('vega-util')
const vega = require('vega-dataflow')
const tx = require('vega-transforms')


const data = [
	{ year: 2008, city: 'BJ', sex: 1, num: 1400 },
	{ year: 2008, city: 'BJ', sex: 2, num: 400 },
	{ year: 2008, city: 'SH', sex: 1, num: 1100 },
	{ year: 2008, city: 'SH', sex: 2, num: 600 },
	{ year: 2009, city: 'BJ', sex: 1, num: 900 },
	{ year: 2009, city: 'BJ', sex: 2, num: 700 },
	{ year: 2009, city: 'SH', sex: 1, num: 1000 },
	{ year: 2009, city: 'SH', sex: 2, num: 400 },
]

const [ year, city, num ] = [ 'year', 'city', 'num' ].map(v => util.field(v))

const df = new vega.Dataflow()
const col = df.add(tx.collect)

const agg = df.add(tx.aggregate, {
	groupby: [ year, city ],
	fields: [ num, num ],
	ops: [ 'count', 'average' ],
	pulse: col,
})

const out = df.add(tx.collect, { pulse: agg })

df.pulse(col, vega.changeset().insert(data)).run()

console.log(out.value)