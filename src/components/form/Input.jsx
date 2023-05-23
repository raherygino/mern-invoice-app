import Form from 'react-bootstrap/Form'

const Input = ({id, type, label, onChange, value}) => {

    return (
      <>
        <Form.Floating className="mb-5">
          <Form.Control
            id={id}
            type={type}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={label} />
          <label htmlFor="id">{label}</label>
        </Form.Floating>
      </>
    )
}

export default Input