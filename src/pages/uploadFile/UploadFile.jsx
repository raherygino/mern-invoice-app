import { useDispatch } from "react-redux"
import { uploadImageProduct } from "../../features/products/productSlice"
const { useState } = require("react")


const UploadFile = () => {

    const [file, setFile] = useState()
    const dispatch = useDispatch()

    const onFormSubmit = (e) => {
        e.preventDefault()

        if (file !== undefined) {
            if (file.length !== 0) {
                const formData = new FormData()
                formData.append('image', file[0])
                dispatch(uploadImageProduct(formData))
            }
        }
    }

    const onChange = (e) => {
        setFile(e.target.files)
    }


    return(
        <>
            <form onSubmit={(e) => onFormSubmit(e)} encType="multipart/form-data">
                <input type="file" onChange={ (e) => onChange(e)} />
                <button type="submit">Upload</button> 
            </form>
        </>
    )
}

export default UploadFile