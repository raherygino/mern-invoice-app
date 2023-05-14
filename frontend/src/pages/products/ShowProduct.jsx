import { useParams } from "react-router-dom";


const ShowProduct = () => {
    const { id } = useParams();

    return(
        <>
            Show product {id}
        </>
    )
}

export default ShowProduct