import { useEffect, useState } from "react"
import FormModal from "../../../components/form/FormModal"
import Input from "../../../components/form/Input"
import { createCategory, getCategories, reset, updateCategory } from "../../../features/categories/categorySlice"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { toast } from "react-toastify"

const NewCategoryModal = ({show, onHide, organization, category, state}) => {

    const [nameCategory, setNameCategory] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {

        if (state.isSuccess) {
            toast.success(state.message)
            setNameCategory('')
        }

        if (state.isError) {
            toast.error(state.message)
        }

        return () => {
            dispatch(reset())
            dispatch(getCategories())
        }

    },  [state, dispatch])

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
            } else {
                categoryData._id = category._id
                dispatch(updateCategory(categoryData))
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
            title={category !== undefined ? `Edit "${category.name}"` : "New category"}
            onSubmit={onSubmit}
            onHide={onHideEvent}
            enableBtnOk={state.isLoading}>
            <Input
                id="name"
                label="Name"
                value={category !== undefined && nameCategory === "" ? category.name : nameCategory}
                onChange={onChange}/>
        </FormModal>
    )
}

export default NewCategoryModal