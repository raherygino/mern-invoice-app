import FormModal from "../../../components/form/FormModal"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from "../../../components/form/Input"
import Select from "../../../components/form/Select"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createSubCategory } from "../../../features/sub-categories/subCategorySlice"
import { toast } from "react-toastify"

const NewSubCategoryModal = ({show, onHide, categories, organization, message, isLoading}) => {

    const [dataSubCategory, setDataSubCategory] = useState({
        category: '',
        name: '',
        organization: ''
    })

    const dispatch = useDispatch()
    
    const onChange = (e) => {
        setDataSubCategory((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
            organization: organization,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        
        if (dataSubCategory.name === "") {
            toast.error('Name invalide')
        } else if (dataSubCategory.category === "") {
            toast.error('Choose category')

        } else {
            dispatch(createSubCategory(dataSubCategory))

            if (message !== "") {
                toast.error(message);
            } else {
                toast.success(`${dataSubCategory.name} created !`);

                setDataSubCategory({
                    name: '',
                    category: '',
                    organization: ''
                })
                onHide()
            }
        }
    }

    return(
        <FormModal
            id="modal-sub-category"
            size="md"
            show={show}
            title="New sub category"
            onSubmit={onSubmit}
            onHide={onHide}
            enableBtnOk={isLoading}>
            <Row>
                <Col lg={6} md={6}>
                    <Input
                        id="name"
                        label="Name"
                        onChange={onChange}
                        value={dataSubCategory.name}/>
                </Col>
                <Col lg={6} md={6}>
                    <Select
                        id="category"
                        label="Category"
                        onChange={onChange}
                        value={dataSubCategory.category}>
                        <option>Choose</option>
                        { categories.message === undefined &&  categories.organization === undefined ? categories.map((category) => (
                            <option key={category._id} value={category._id}>{ category.name }</option>)) :
                            <option value={null}>None</option>
                        }
                    </Select>
                </Col>
            </Row>
        </FormModal>
    )
}

export default NewSubCategoryModal