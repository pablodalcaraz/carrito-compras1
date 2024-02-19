import { NavLink } from 'react-router-dom'

import '../login.css'

export const Welcome = () => {
  return (
    <>
   <div className="container">
      <div className="card">
        <div className="card-body">
          <h1>¡Te has registrado con éxito!</h1>
          <NavLink to="/home">
            <button className="btn btn-primary">Ingresar</button>
          </NavLink>
        </div>
      </div>
    </div>
    </>
  )
}
