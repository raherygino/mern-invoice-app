import FloatingLabel from "react-bootstrap/FloatingLabel"
import Form from "react-bootstrap/Form"


const Select = ({id, label, data}) => {
    return(
        <FloatingLabel controlId={id} label={label} className="mb-5" >
            <Form.Select aria-label={label} name={id}>
                <option>-</option>
                { data.map((value) => (
                    <option value={value}>{ value }</option>
                ))}
            </Form.Select>
        </FloatingLabel>
    )
}

export default Select
