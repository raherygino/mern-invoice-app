import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"


const Select = ({id, label, children, onChange}) => {
    return(
        <FloatingLabel controlId={id} label={label} className="mb-5" >
            <Form.Select aria-label={label} name={id} onChange={onChange}>
                { children }
            </Form.Select>
        </FloatingLabel>
    )
}

export default Select
