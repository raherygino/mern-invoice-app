import FormModal from '../../../components/form/FormModal';
import Table from 'react-bootstrap/Table';
import ConfirmDialog from '../../../components/form/ConfirmDialog';
import ButtonActions from '../../../components/form/ButtonActions';

const ListSubCategoryModal = ({ show, onHide, subCategories, categories, onSuccess, onEdit }) => {
    
    const getCurrentCategory = (id) => {
        if (categories.length !== 0) {
            return categories.find((cat) => cat._id === id)
        } else {
            return { _id: id , name: id }
        }
    }

    const onDelete = (id) => {
        ConfirmDialog({
            title: "Are you sure?",
            text: "You want to delete",
            link:`http://127.0.0.1:5000/api/subcategories/delete/${id}`,
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
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                { subCategories.message === undefined && subCategories.organization === undefined ? subCategories.map((subCategory, index) => (
                    <tr key={subCategory._id}>
                        <td className='pt-3'>{ subCategory.name }</td>
                        <td className='pt-3'>
                            { getCurrentCategory(subCategory.category) !== undefined ? getCurrentCategory(subCategory.category).name : 
                                <span className='text-danger bg-light-danger badge'>Category deleted</span>
                            }
                        </td>
                        <td width={100} align='center'>
                            <ButtonActions
                                onEdit={onEdit}
                                index={index}
                                item={subCategory}
                                onDelete={onDelete} />
                        </td>
                    </tr>
                )): null}
                </tbody>
            </Table>
        </FormModal>
    )
}

export default ListSubCategoryModal