import BasicColumn from './VegaColumn'
import StackColumn from './VegaStackColumn'
import GroupColumn from './VegaGroupColumn'
import Line from './VegaLine'
import Area from './VegaArea'
import StackArea from './VegaStackArea'
import DemoChart from './VegaDemoChart'

export default function getChart (type) {
	switch (type) {
		case 'column': return BasicColumn
		case 'stack_column': return StackColumn
		case 'group_column': return GroupColumn
		case 'line': return Line
		case 'area': return Area
		case 'stack_area': return StackArea
		default: return DemoChart
	}
}