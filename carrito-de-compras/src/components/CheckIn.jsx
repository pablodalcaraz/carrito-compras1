import '../login.css';
import '../App.css';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { FaFacebookSquare, FaInstagramSquare, FaTwitterSquare, FaWhatsappSquare } from 'react-icons/fa';

export const CheckIn = () => {
  const { userData, setUserData,setIsLoggedIn } = useContext(UserContext);
  const [error, setError] = useState(false);
  const [UserPassword, setUserPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  
  const handleNameChange = (e) => {
    setUserData({ ...userData, UserName: e.target.value.toUpperCase() });
  };

  const handleLastNameChange = (e) => {
    setUserData({ ...userData, UserLastName: e.target.value.toUpperCase() });
  };

  const isPasswordValid = (UserPassword) => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    return uppercaseRegex.test(UserPassword) && numberRegex.test(UserPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userData.UserName === '' ||
      userData.UserLastName === '' ||
      userData.UserMail === '' ||
      UserPassword === '' ||
      confirmPassword === ''
    ) {
      setError(true);
      setPasswordError('');
      return;
    } 
  
    if (!isPasswordValid(UserPassword)) {
      setError(true);
      setPasswordError('La contraseña debe tener al menos una mayúscula y un número');
      return;
    }
  
    if (UserPassword !== confirmPassword) {
      setError(true);
      setPasswordError('Las contraseñas no coinciden');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/registro', { // Aquí debes reemplazar la URL con la dirección de tu servidor backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...userData,UserPassword}),
      });
  
      if (response.ok) {
        // Registro exitoso, redirige a donde sea apropiado
        setIsLoggedIn(true)
        navigate('../welcome');

      } else {
        // Maneja cualquier error de la solicitud HTTP
        setError(true);
        console.error("Error en la solicitud HTTP:", response.statusText);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error.message);
      setError(true);
    }
  
    // No necesitas modificar estas líneas, ya que simplemente actualizan el estado local
    setUserData({ ...userData, password: UserPassword, confirmPassword: confirmPassword });
    setError(false);
    setPasswordError('');
  };

  return (
    <>
      <div className="container-principal">
        <div className="container-form">
          <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Nombre
              </label>
              <input
                type="name"
                className="form-control"
                id="exampleInputName"
                value={userData.name}
                onChange={handleNameChange}
                autoComplete="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputLastName" className="form-label">
                Apellido
              </label>
              <input
                type="lastName"
                className="form-control"
                id="exampleInputLastName"
                value={userData.lastName}
                onChange={handleLastNameChange}
                autoComplete="userlastname"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                e-mail
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={userData.mail}
                onChange={(e) => setUserData({ ...userData, UserMail: e.target.value })}
                autoComplete="usermail"
              />
              <div id="emailHelp" className="form-text"></div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputLastName" className="form-label">
                Ingrese elija una contraseña
              </label>
              <p style={{ fontSize: '12px' }}>🔹La contraseña debe poseer como mínimo 8 dígitos</p>
              <p style={{ fontSize: '12px' }}>🔹Debe contener al menos una mayúscula y un número</p>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword"
                value={UserPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputLastName" className="form-label">
                Confirme la contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
              />
            </div>
           
            {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            
            <button type="submit" className="but bg-primary">
              <p>
                <strong>Registrarme</strong>
              </p>
            </button>
            
          </form>
          {error && <p style={{ color: 'red' }}>Todos los campos son obligatorios</p>}
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
            <a className="face" href="" ><FaFacebookSquare style={{ width: '40px', height: '40px', color: 'white' }}/></a>
            <a className="insta" href="" ><FaInstagramSquare style={{ width: '40px', height: '40px', color: 'white' }}/></a>
            <a className="x" href="" ><FaTwitterSquare style={{ width: '40px', height: '40px', color: 'white' }}/></a>
            <a className="ws" href="" ><FaWhatsappSquare style={{ width: '40px', height: '40px', color: 'white' }}/></a>
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







