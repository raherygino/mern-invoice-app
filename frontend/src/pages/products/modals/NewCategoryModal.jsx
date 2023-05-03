import { useState } from "react"
import FormModal from "../../../components/form/FormModal"
import Input from "../../../components/form/Input"
import { createCategory } from "../../../features/categories/categorySlice"
import { useDispatch } from "react-redux"

const NewCategoryModal = ({show, onHide, organization}) => {

    const [nameCategory, setNameCategory] = useState('')

    const dispatch = useDispatch()
    
    const onChange = (e) => {
        setNameCategory(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        dispatch(createCategory({ name: nameCategory, organization: organization }))
        onHide(false)
    }

    return(
        <FormModal
            id="modal-sub-category"
            size="sm"
            show={show}
            title="New category"
            onSubmit={onSubmit}
            onHide={onHide}>
            <Input
                id="name"
                label="Name"
                onChange={onChange}/>
        </FormModal>
    )
}

export default NewCategoryModal