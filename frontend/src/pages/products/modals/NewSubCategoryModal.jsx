import FormModal from "../../../components/form/FormModal"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from "../../../components/form/Input"
import Select from "../../../components/form/Select"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { createSubCategory } from "../../../features/sub-categories/subCategorySlice"
import { toast } from "react-toastify"

const NewSubCategoryModal = ({show, onHide, categories, organization}) => {

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

        if (dataSubCategory.category !== "" && dataSubCategory.name !== "") {
            dispatch(createSubCategory(dataSubCategory))
            toast.success(`${dataSubCategory.name} created!`)
            
            setDataSubCategory({
                category: '',
                name: '',
                organization: ''
            })
            onHide()
        } else {
            toast.error('Field required')
        }
    }

    return(
        <FormModal
            id="modal-sub-category"
            size="md"
            show={show}
            title="New sub category"
            onSubmit={onSubmit}
            onHide={onHide}>
            <Row>
                <Col lg={6} md={6}>
                    <Input
                        id="name"
                        label="Name"
                        onChange={onChange}/>
                </Col>
                <Col lg={6} md={6}>
                    <Select
                        id="category"
                        label="Category"
                        onChange={onChange}>
                        <option value="">Choose</option>
                        {  categories.organization === undefined ? categories.map((category) => (
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