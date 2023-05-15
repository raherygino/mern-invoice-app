
import Button from 'react-bootstrap/Button'
import { useState, useCallback, useMemo } from "react"
import DataTable from 'react-data-table-component'


const DataTableRowToggle = () => {
	const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false);
	const [data, setData] = useState(tableDataItems);

	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);

	const contextActions = useMemo(() => {
		const handleDelete = () => {
			
			if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.name)}?`)) {
				setToggleCleared(!toggleCleared);
				//setData(differenceBy(data, selectedRows, 'name'));
			}
		};

		return (
			<Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>
				Delete
			</Button>
		);
	}, [data, selectedRows, toggleCleared]);

	return (
		<DataTable
			title="Desserts"
			columns={columns}
			data={data}
			selectableRows
			actions={actions}
			contextActions={contextActions}
			onSelectedRowsChange={handleRowSelected}
			clearSelectedRows={toggleCleared}
		/>
	);
}