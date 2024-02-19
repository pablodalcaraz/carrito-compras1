import '../login.css'
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserContext"
import { useContext } from "react"

export const CerrarSesion = () => {

  const {logout} = useContext(UserContext)

  

  return (
    <>
     <div className="cont">
      <div className="logout">
        <div className="logout-body">
          <h1>¿Querés cerrar sesión?</h1>
          <div className="logout-option">
          <NavLink to="/home">
            <button style={{height:'40px',width:'80px',marginBottom:'10px', borderRadius:'16px',marginRight:'5px'}} 
            className="btn btn-info" 
            onClick={logout}>Si</button>
            <button style={{height:'40px',width:'80px',marginBottom:'10px', borderRadius:'16px',marginLeft:'5px'}} 
            className="btn btn-info">No</button>
          </NavLink>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
