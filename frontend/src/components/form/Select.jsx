import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"


const Select = ({id, label, children}) => {
    return(
        <FloatingLabel controlId={id} label={label} className="mb-5" >
            <Form.Select aria-label={label} name={id}>
                { children }
            </Form.Select>
        </FloatingLabel>
    )
}

export default Select
