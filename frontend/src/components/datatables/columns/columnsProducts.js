import Button from 'react-bootstrap/Button'

const columnsProducts = (handleShow,handleEdit) => {
    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
            grow: 2,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Sub category',
            selector: row => row.sub_category,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
            right: true,
        },
        {
            
            name: 'Actions',
            cell: row => 
                <>
                    <Button variant="primary" onClick={() => handleShow(row)} className="btn-shadow px-1" size="sm">Show </Button>
                    <Button variant="success" onClick={() => handleEdit(row)} className="btn-shadow ms-2 px-1" size="sm">Edit</Button>
                </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        
    ]

    return columns
}

export default columnsProducts