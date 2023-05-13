import FormModal from '../../../components/form/FormModal';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ConfirmDialog from '../../../components/form/ConfirmDialog';

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
                            <Button variant="light" onClick={() => onEdit(index)} className="btn-icon btn-sm me-2">
								<span className="svg-icon svg-icon-success svg-icon-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path 
                                                d="M8,17.9148182 L8,5.96685884 C8,5.56391781 8.16211443,5.17792052 8.44982609,4.89581508 L10.965708,2.42895648 C11.5426798,1.86322723 12.4640974,1.85620921 13.0496196,2.41308426 L15.5337377,4.77566479 C15.8314604,5.0588212 16,5.45170806 16,5.86258077 L16,17.9148182 C16,18.7432453 15.3284271,19.4148182 14.5,19.4148182 L9.5,19.4148182 C8.67157288,19.4148182 8,18.7432453 8,17.9148182 Z" 
                                                fill="#000000" 
                                                fillRule="nonzero" 
                                                transform="translate(12.000000, 10.707409) rotate(-135.000000) translate(-12.000000, -10.707409) "/>
                                            <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>
                                        </g>
                                    </svg>
								</span>
							</Button>
                            <Button variant="light" onClick={() => onDelete(subCategory._id)} className="btn-icon btn-sm">
								<span className="svg-icon svg-icon-danger svg-icon-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                            <rect x="0" y="0" width="24" height="24"/>
                                            <path 
                                                d="M6,8 L18,8 L17.106535,19.6150447 C17.04642,20.3965405 16.3947578,21 15.6109533,21 L8.38904671,21 C7.60524225,21 6.95358004,20.3965405 6.89346498,19.6150447 L6,8 Z M8,10 L8.45438229,14.0894406 L15.5517885,14.0339036 L16,10 L8,10 Z" 
                                                fill="#000000" 
                                                fillRule="nonzero"/>
                                            <path 
                                                d="M14,4.5 L14,3.5 C14,3.22385763 13.7761424,3 13.5,3 L10.5,3 C10.2238576,3 10,3.22385763 10,3.5 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" 
                                                fill="#000000" 
                                                opacity="0.3"/>
                                        </g>
                                    </svg>
								</span>
							</Button>
                        </td>
                    </tr>
                )): null}
                </tbody>
            </Table>
        </FormModal>
    )
}

export default ListSubCategoryModal