import BasicColumn from './VegaColumn'
import StackColumn from './VegaStackColumn'
import GroupColumn from './VegaGroupColumn'
import Line from './VegaLine'
import DemoChart from './VegaDemoChart'

export default function getChart (type) {
	switch (type) {
		case 'column': return BasicColumn
		case 'stack_column': return StackColumn
		case 'group_column': return GroupColumn
		case 'line': return Line
		default: return DemoChart
	}
}