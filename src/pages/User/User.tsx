import "./User.css"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

export default function User() {

  const auth = useContext(AuthContext)


  return (
    <div className="User">

      <h1>User Page</h1>

      <button onClick={() => auth?.login('admin@gmail.com', 'Abc!123Abc')} type='button'>SignIn</button>

      <div>User Email = {auth?.email}</div>
      <div>Is Business = {auth?.isBusiness.toString()}</div>
      <div>Is Admin = {auth?.isAdmin.toString()}</div>


    </div>
  )
}

