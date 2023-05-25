import { useCallback, useMemo, useState } from "react";
import DataTable from "react-data-table-component"
import ConfirmDialog from "../form/ConfirmDialog";
import Button  from "react-bootstrap/Button";
import { toast } from "react-toastify";

const TableData = ({title, columns, data, deleteLink, onSuccess}) => {

    const [selectedRows, setSelectedRows] = useState([]);
	const [toggleCleared, setToggleCleared] = useState(false)
	const handleRowSelected = useCallback(state => {
		setSelectedRows(state.selectedRows);
	}, []);
    
	const contextActions = useMemo(() => {
		const handleDelete = (lnk) => {
            const query = `${selectedRows.map(
                (item, i) => `id_${i+1}=${item._id}`
            )}`.replaceAll(',', '&')
        
            ConfirmDialog({
                title: "Are you sure to delete",
                text: `${selectedRows.map(r => r.name)}?`,
                link:`${lnk}?${query}`,
                onSuccess: () => {
				    setToggleCleared(!toggleCleared)
                    onSuccess()
                    toast.success(`${selectedRows.map(r => r.name)} deleted!`)
                }
            })
		}

		return (
            <>
			    <Button key="delete" onClick={() => handleDelete(deleteLink)} variant="danger" className="btn-shadow">
				    Delete
			    </Button>
            </>
		);
	}, [selectedRows, toggleCleared, deleteLink, onSuccess]);

    return (
        <DataTable
            title={title}
            columns={columns}
            data={data}
            pagination
            selectableRows
            highlightOnHover
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared} />
    )
}

export default TableData