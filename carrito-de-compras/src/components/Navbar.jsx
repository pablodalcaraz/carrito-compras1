import '../App.css'
import { Badge } from "@mui/material"
import { ShoppingCart } from '@mui/icons-material'
import { Link, NavLink } from "react-router-dom"
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartContext'
import { FaCircleUser } from "react-icons/fa6";
import { UserContext } from '../context/UserContext'

export const Navbar = () => {

  const { cart } = useContext(CartContext)
  const [cartCount, setCartCount] = useState(0)
  const [click, setClick] = useState(false)
  const {userData,isLoggedIn,showUserMenu, setShowUserMenu } = useContext(UserContext);
  


  const handleCategory = () => {
    setClick(false)
  }
  
  const handleLoginClick = () => {
    setClick(false);
  };

  useEffect(() => {
    setCartCount(cart.length)
  },[cart])

  return (
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <a className="navbar-brand d-none d-lg-block" href="#"><strong>Shop</strong>.</a>
        <button className="navbar-toggler "
          onClick={() => setClick(!click)}
          type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation ">
          <svg xmlns="http://www.w3.org/2000/svg" height="2rem" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
        <div className={`collapse navbar-collapse ${click ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/" onClick={handleCategory}>Home</Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link active" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Productos
              </a>
              <ul className="dropdown-menu" >
                <li><NavLink className="dropdown-item" to="/productList" onClick={handleCategory}>Todos Los Productos</NavLink></li>
                <li><NavLink className="dropdown-item" to="/remeras" onClick={handleCategory}>Remeras</NavLink></li>
                <li><NavLink className="dropdown-item" to="/soquetes" onClick={handleCategory}>Soquetes</NavLink></li>
                <li><NavLink className="dropdown-item" to="/medias" onClick={handleCategory}>Medias</NavLink></li>
                <li><NavLink className="dropdown-item" to="/vasos" onClick={handleCategory}>Vasos</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
        <div className={`log-in ${isLoggedIn ? 'authenticated' : ''}`}>
          {isLoggedIn ? (
            <div className='welcome-message' style={{marginTop:'17px'}}>
              <p style={{color:'#520958',marginRight:'7px',marginTop:'3px'}} 
              onClick={() => setShowUserMenu(!showUserMenu)}>Hola!</p>
              <p style={{color:'#520958',marginRight:'7px',marginTop:'3px'}}>{userData.UserName}</p>
              <NavLink to='/cerrarSesion'> 
              <FaCircleUser style={{height:'23px',width:'23px',color:'green'}}/></NavLink>
            </div>
          ) : (
            <>
              <NavLink to="/logIn" onClick={handleLoginClick}>
                <button
                  style={{ border: 'none', backgroundColor: '#5ccb5f', color: 'white' }}
                >
                  <h4 style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>
                    <strong>Ingresar</strong></h4>   
                </button>
              </NavLink>
              
              <NavLink to="/checkIn" onClick={handleLoginClick}>
                <button className='btn btn-primary' >
                  <h4 style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>
                    Crear cuenta</h4>
                </button>
              </NavLink>
            </>
          )}
        </div>
        {!click && (
          <NavLink to='/cartPage'>
            <Badge className="carrito" badgeContent={cartCount} color="primary" >
              <ShoppingCart color="#000000" />
            </Badge>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

