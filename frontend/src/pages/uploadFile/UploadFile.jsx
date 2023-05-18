const { default: axios } = require("axios")
const { useState } = require("react")


const UploadFile = () => {

    const [file, setFile] = useState()

    const onFormSubmit = (e) => {
        e.preventDefault()

        if (file !== undefined) {
            if (file.length !== 0) {
                const formData = new FormData()
                formData.append('file', file[0])
        
                axios.post('http://localhost:5000/fileupload', formData)
                    .then((response) => {
                        console.log(response)
                    }).catch((error) => {
                        console.log(error)
                    })
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