import FormModal from '../../../components/form/FormModal';
import Table from 'react-bootstrap/Table';
import ConfirmDialog from '../../../components/form/ConfirmDialog';
import ButtonActions from '../../../components/form/ButtonActions';

const ListCategoryModal = ({ show, onHide, categories, onSuccess, onEdit }) => {

    const onDelete = (id) => {
        ConfirmDialog({
            title: "Are you sure?",
            text: "You want to delete",
            link:`http://127.0.0.1:5000/api/categories/delete/${id}`,
            onSuccess: onSuccess
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        onHide(false)
    }

    return(
        <FormModal
            id="modal-list-category"
            size="md"
            show={show}
            onHide={onHide}
            onSubmit={onSubmit}
            disabledBtnCancel={false}
            title="List Category">
                
            <Table bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                { categories.message === undefined && categories.organization === undefined ? categories.map((category, index) => (
                    <tr key={category._id}>
                        <td className='pt-3'>{ category.name }</td>
                        <td width={100} align='center'>
                            <ButtonActions
                                onEdit={onEdit}
                                index={index}
                                item={category}
                                onDelete={onDelete} />
                        </td>
                    </tr>
                )): null}
                </tbody>
            </Table>
        </FormModal>
    )
}

export default ListCategoryModal