import FormModal from "../../../components/form/FormModal"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Input from "../../../components/form/Input"
import Select from "../../../components/form/Select"

const NewSubCategoryModal = ({show, onHide, categories, onSubmit}) => {

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
                        id="name_sub_category"
                        label="Name"/>
                </Col>
                <Col lg={6} md={6}>
                    <Select
                        id="category"
                        label="Category">
                        { categories.map((category) => (
                            <option key={category._id}>{ category.name }</option>)) 
                        }
                    </Select>
                </Col>
            </Row>
        </FormModal>
    )
}

export default NewSubCategoryModal