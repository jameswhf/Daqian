import prop from 'ramda/src/prop'

export function getTableFromGrid (rawData) {
	const { row, column, data } = rawData.data.chartMain
	const rowNames = row.meta.map(prop('title'))
	const rowValues = row.values // [{ title }]

	const columnNames = column.values[0].map(prop('title'))
	const dataValues = data

	const table = []
	dataValues.forEach((dataValue, index) => {
		const row = {}
		const rowValue = rowValues[index]
		rowNames.forEach((rowName, colIndex) => {
			row[rowName] = rowValue[colIndex] && rowValue[colIndex].title
		})
		columnNames.forEach((colName, colIndex) => {
			row[colName] = dataValue[colIndex] && dataValue[colIndex].v
		})
		table.push(row)
	})
	return table
}