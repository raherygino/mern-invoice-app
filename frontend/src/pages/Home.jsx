import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Home = () => {
    
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    
    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    })

    return(
        <>
            <h1>{user && `Bonjour ${user.lastname} ${user.firstname}` }</h1>
        </>
    )
}

export default Home