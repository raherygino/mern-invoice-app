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
            selector: row => row.category.name,
            sortable: true,
        },
        {
            name: 'Sub category',
            selector: row => row.sub_category.name,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.image,
            sortable: true,
            right: true,
        },
        {
            name: 'Created at',
            selector: row => new Date(row.createdAt).toLocaleString(),
            sortable: true,
            right: true,
            grow: 2,
        },
        {
            
            name: 'Actions',
            cell: row => 
                <>
                    <Button variant="primary" onClick={() => handleShow(row)} className="btn-shadow px-2" size="sm">Show </Button>
                    <Button variant="success" onClick={() => handleEdit(row)} className="btn-shadow ms-2 px-2" size="sm">Edit</Button>
                </>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        
    ]

    return columns
}

export default columnsProducts