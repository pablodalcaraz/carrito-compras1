import '../login.css';
import '../App.css';
import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaWhatsappSquare } from "react-icons/fa";
import { UserContext } from '../context/UserContext';

export const LogIn = () => {
  const { userData, setUserData,setIsLoggedIn } = useContext(UserContext);
  const [UserPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState(false)
  const [click, setClick] = useState(false)
  const navigate = useNavigate();

  useEffect(() => { //inicia la página desde arriba
    window.scrollTo(0, 0);
  }, []);
  
  const handleClick = () =>{
    setClick(!click)
    setError(false)
    setErrorMessage(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.UserMail === '' || UserPassword === '') {
      setError(true);
      return 
    }

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserMail: userData.UserMail, UserPassword }),
      });

      if (response.ok ) {
        
        // Inicio de sesión exitoso
        setIsLoggedIn(true)
        setUserData({ ...userData, UserMail: userData.UserMail });
        navigate('/home');
      } else {
        // Error de inicio de sesión  
        
        setErrorMessage(true)
        console.error('Error en inicio de sesión:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error.message);
      setError(true);
    }
  };

  return (
    <>
      <div className="container-principal">
        <div className="container-form">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="mb-3" onClick={handleClick}>
              <label htmlFor="exampleInputEmail1" className="form-label">
                e-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userData.UserMail}
                onChange={(e) => setUserData({ ...userData, UserMail: e.target.value })}
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3" onClick={handleClick}>
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={UserPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
            <div className="readme mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Recordarme
              </label>
            </div>
            <button type="submit" className="but bg-primary">
              <p><strong>Iniciar</strong> </p>
            </button>
          </form>
          {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p> || errorMessage && <p style={{ color: 'red' }}>Usuario y/o contraseña incorrectos</p>}
          
          <a href=""><p>¿Olvidaste tu contraseña?</p></a>
          <div>¿No tenés cuenta?</div>
          <NavLink to='/checkIn'>
            <button className='but bg-primary'><p><strong>Crear</strong></p></button>
          </NavLink>
        </div>
      </div>
      <div className="productFooter">
        <div className="product-container d-flex flex-wrap justify-content-between">
          <div className="links mb-3 mb-lg-0">
            <h2>Navegación</h2>
            <p className="mb-1" ><a className="link-opacity-10-hover" style={{ color: 'white', textDecoration: 'none' }} href="#">Home</a></p>
            <p className="mb-1" ><a className="link-opacity-25-hover" style={{ color: 'white', textDecoration: 'none' }} href="#">Todos Los Productos</a></p>
            <p className="mb-1" ><a className="link-opacity-50-hover" style={{ color: 'white', textDecoration: 'none' }} href="#">Remeras</a></p>
            <p className="mb-1" ><a className="link-opacity-75-hover" style={{ color: 'white', textDecoration: 'none' }} href="#">Soquetes</a></p>
            <p className="mb-1" ><a className="link-opacity-100-hover" style={{ color: 'white', textDecoration: 'none' }} href="#">Medias</a></p>
            <p className="mb-1" ><a className="link-opacity-100-hover" style={{ color: 'white', textDecoration: 'none' }} href="#">Vasos</a></p>
          </div>
          <div className="networks mb-3 mb-lg-0">
            <a className="face" href="" ><FaFacebookSquare style={{ width: '40px', height: '40px', color: 'white' }} /></a>
            <a className="insta" href="" ><FaInstagramSquare style={{ width: '40px', height: '40px', color: 'white' }} /></a>
            <a className="x" href="" ><FaTwitterSquare style={{ width: '40px', height: '40px', color: 'white' }} /></a>
            <a className="ws" href="" ><FaWhatsappSquare style={{ width: '40px', height: '40px', color: 'white' }} /></a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright&copy; 2024 - Página creada por <strong>@pablodalcaraz</strong></p>
        <p>Todos los derechos reservados</p>
      </div>
    </>
  );
};
