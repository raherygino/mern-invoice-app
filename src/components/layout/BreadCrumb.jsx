import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'


const BreadCrumb = ({ children, title, parent, linkParent }) => {

    return (
        <Container className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex flex-column mr-5">
                <h4 className="text-primary font-weight-bold py-1 mr-5 my-0">{ title ? parent ?  title : `List ${title}` : "Home"}</h4>
                <ul className="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 m-0 font-size-sm">
                    { title ? 
                        <li className="breadcrumb-item">
                            <Link to="/" className="text-muted">Home </Link>
                        </li> : null
                    }
                    { parent ? 
                        <li className="breadcrumb-item">
                            <Link to={linkParent} className="text-muted">{ parent } </Link>
                        </li> : null
                    }
                    <li className="breadcrumb-item">
                        <span className=" active">{ title }</span>
                    </li>
                </ul>
            </div>

            <div className="d-flex align-items-center flex-wrap py-2">
                { children }
            </div>
        </Container>
    )
}

export default BreadCrumb