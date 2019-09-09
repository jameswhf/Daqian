/**
 * 数据来源: hello@world.com app.mayidata.com
 * 页面: vega-chart-references (https://app.mayidata.com/page/v62417cd515f34ea3b48975e)
 */
import { getTableFromGrid } from '../transformer'
import { getColors } from '../../chart-props/theme'

const guanRes = {
	data: {
		chartMain: {
			props: {
				themeColor: {
					theme: 'DARK_BLUE',
					colors: [ "rgba(104, 190, 168, 1)", "rgba(104, 190, 168, 1)", "rgba(104, 190, 168, 1)", null, null, null, null, null, null, null ]
				  }
			},
			row: {
				fieldFormat: { dimThreshold: [ null ], linkFormat: [ null ] },
				meta: [
					{
						fdId: 'cf3f3a1b756ee43d9a4da447',
						fdType: 'STRING',
						granularity: null,
						headerFormat: null,
						metaType: 'DIM',
						originTitle: '店铺名称',
						parentFdName: null,
						sortField: 'c0',
						title: '店铺名称',
					}
				],
				values: [
					[ { titleType: 'STRING', granularity: null, title: '广东分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '浙江分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '湖南分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '福建分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '青海分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '北京分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '上海分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '云南分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '山东分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '吉林分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '江苏分店' } ],
					[ { titleType: 'STRING', granularity: null, title: '张小美' } ],
				]
			},
			column: {
				fieldFormat: { dimThreshold: [], linkFormat: [] },
				meta: [
					{ title: '度量', metaType: 'METRIC', headerFormat: null },
				],
				metricFieldFormat: { numberFormat: [ null ], threshold: [ null ] },
				values: [
					[ { fdType: 'DOUBLE', fmt_idx: 0, sortField: 'c1', title: '利润', type: 'METRIC', headerFormat: null } ]
				]
			},
			data: [
				[ { v: 196089.09 } ], [ { v: 751911.65 } ], [ { v: 65451.51 } ], [ { v: 65451.51 } ],
				[ { v: 194332.77 } ], [ { v: 194332.77 } ], [ { v: 376358.27 } ], [ { v: 121566.72 } ],
				[ { v: 90707.63 } ], [ { v: 164770.98 } ], [ { v: 70442.32 } ], [ null ],
			],
			extra: { headerSortings: null },
			meta: {
				dynamicParameters: [],
				dataLabels: {},
			},
			offset: 0,
			count: 12,
			limit: 200,
			hasMoreData: false,

		},
		rawDataNotChanged: false,
		timeConsuming: false,
		view: 'GRID',
	}
}

export const data = getTableFromGrid(guanRes)
export const theme = getColors(guanRes)