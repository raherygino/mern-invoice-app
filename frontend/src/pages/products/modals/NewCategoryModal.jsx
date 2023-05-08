import { useState } from "react"
import FormModal from "../../../components/form/FormModal"
import Input from "../../../components/form/Input"
import { createCategory, updateCategory } from "../../../features/categories/categorySlice"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const NewCategoryModal = ({show, onHide, organization, category}) => {

    const [nameCategory, setNameCategory] = useState('')

    const dispatch = useDispatch()

    const onChange = (e) => {
        setNameCategory(e.target.value)
    }

    const onHideEvent = () => {
        setNameCategory('')
        onHide()
    }


    const onSubmit = (e) => {
        e.preventDefault()
            
        if (nameCategory !== "") {
            const categoryData = { 
                name: nameCategory, 
                organization: organization }
            if (category === undefined) {
                dispatch(createCategory(categoryData))
                setNameCategory('')
                onHide(false)
            } else {
                categoryData._id = category._id
                dispatch(updateCategory(categoryData))
                setNameCategory('')
                onHide(false)
                toast.success(`${categoryData.name} updated!`)
            }
        } else {
            setNameCategory('')
            var message = "Category name required"
            var icon = 'error'

            if (category !== undefined && nameCategory === "") {
                message = "Nothing change"
                icon = 'warning'
            }
            
            Swal.fire({
                title: '',
                text: message,
                icon: icon
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
            onHide={onHideEvent}>
            <Input
                id="name"
                label="Name"
                value={category !== undefined && nameCategory === "" ? category.name : nameCategory}
                onChange={onChange}/>
        </FormModal>
    )
}

export default NewCategoryModal