const a = {
  cdId: 's279bdfb282c34f45afe6800',
  cdType: 'CHART',
  region: null,
  name: '单柱图',
  content: {
    dsId: 'ebd096b647ca24ccdab9e1d3',
    chartType: 'PIE',
    meta: {
      chartMain: {
        zoneInfo: [
          { zoneId: 'row', needAggregation: false, minCount: 0, maxCount: 1 },
          { zoneId: 'metric', needAggregation: true, minCount: 0, maxCount: 1 },
          {
            zoneId: 'filters',
            needAggregation: false,
            minCount: 0,
            maxCount: 20
          },
          {
            zoneId: 'sorting',
            needAggregation: true,
            minCount: 0,
            maxCount: 20
          },
          {
            zoneId: 'colorBy',
            needAggregation: true,
            minCount: 0,
            maxCount: 1
          },
          { zoneId: 'split', needAggregation: false, minCount: 0, maxCount: 1 },
          {
            zoneId: 'tooltip',
            needAggregation: true,
            minCount: 0,
            maxCount: 20
          }
        ],
        zoneData: {
          row: [
            {
              fdId: 'wb543d1ec8f334942bc855d3',
              name: 'Shipping_Area',
              fdType: 'STRING',
              metaType: 'DIM',
              calculationType: 'normal',
              key: 'jetiSJFDxD'
            }
          ],
          metric: [
            {
              calculationType: 'normal',
              formula: '[Createtime]',
              aggrType: 'CNT',
              name: '月',
              granularity: 'MONTH',
              parentFdName: '计算字段2',
              fdType: 'SUB_DATE',
              fdId: 'e46056bbbcebd42d792f8ea0_month',
              key: 'dNquWkZKtV',
              metaType: 'DIM'
            }
          ]
        },
        props: {
          dynamicParameters: [],
          themeColor: {
            theme: 'DARK_BLUE',
            colors: [
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null,
              null
            ]
          }
        }
      },
      summary: {
        aggrType: 'NUL',
        fdId: '',
        label: '',
        name: '',
        summaryType: 'NONE',
        fdType: 'STRING',
        metaType: 'NONE'
      },
      defaultView: 'GRAPH'
    },
    metaVersion: 3
  },
  settings: { pageLinks: [] }
}
