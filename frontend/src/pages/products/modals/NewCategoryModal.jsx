import FormModal from "../../../components/form/FormModal"
import Input from "../../../components/form/Input"

const NewCategoryModal = ({show, onHide}) => {

    return(
        <FormModal
            id="modal-sub-category"
            size="sm"
            show={show}
            title="New category"
            onHide={onHide}>
            <Input
                id="name_sub_category"
                label="Name"/>
        </FormModal>
    )
}

export default NewCategoryModal