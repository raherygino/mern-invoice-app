import { useParams } from "react-router-dom";


const ShowProducts = () => {
    const { id } = useParams();

    return(
        <>
            Show product {id}
        </>
    )
}

export default ShowProducts