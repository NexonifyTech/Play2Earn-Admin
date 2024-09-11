import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { currentUser } from '../redux/userSlice'

const useAuth = () => {
  const user = useSelector(currentUser)

  return useMemo(() => ({ user }), [user])
}
export default useAuth
