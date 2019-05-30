import BasicColumn from './BasicColumn'
import DemoChart from './DemoChart'

export default function getChart (type) {
	switch (type) {
		case 'column': return BasicColumn
		default: return DemoChart
	}
}