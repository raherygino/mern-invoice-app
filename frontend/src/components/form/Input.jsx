import Form from 'react-bootstrap/Form'

const Input = ({id, type, label}) => {

    return (
        <Form.Floating className="mb-5">
          <Form.Control
            id={id}
            type={type}
            name={id}
            placeholder={label} />
          <label htmlFor="floatingInputCustom">{label}</label>
        </Form.Floating>
    )
}

export default Input