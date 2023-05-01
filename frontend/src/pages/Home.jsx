import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, reset } from '../features/users/userSlice'

const Home = () => {
    
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { users, isError, message } = useSelector(
    (state) => state.users
  )
  if (isError) {
    console.log(message)
  }
  

  useEffect(() => {

    if (!user) {
      navigate('/login')
    }

    dispatch(getUsers())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

    return(
        <>
            <h1>Bonjour { users.lastname } {isError && message}</h1>
        </>
    )
}

export default Home