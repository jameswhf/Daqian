import BasicColumn from './VegaColumn'
import StackColumn from './VegaStackColumn'
import GroupColumn from './VegaGroupColumn'
import DemoChart from './VegaDemoChart'

export default function getChart (type) {
	switch (type) {
		case 'column': return BasicColumn
		case 'stack_column': return StackColumn
		case 'group_column': return GroupColumn
		default: return DemoChart
	}
}