import { useState } from "react"
import FormModal from "../../../components/form/FormModal"
import Input from "../../../components/form/Input"
import { createCategory } from "../../../features/categories/categorySlice"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"

const NewCategoryModal = ({show, onHide, organization}) => {

    const [nameCategory, setNameCategory] = useState('')

    const dispatch = useDispatch()
    
    const onChange = (e) => {
        setNameCategory(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (nameCategory !== "") {
            dispatch(createCategory({ 
                name: nameCategory, 
                organization: organization }))
            setNameCategory('')
            onHide(false)
        } else {
            setNameCategory('')
            Swal.fire({
                position: 'top-center',
                title: "",
                text: "Category name required",
                icon: 'error'
            })
        }
        
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