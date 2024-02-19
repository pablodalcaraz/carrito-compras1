import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";


export const Vasos = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
const { addToCart,cart} = useContext(CartContext);


const addedProduct = (productId) => {
  return cart.some((item) => item.id === productId)
}

const { data, setSelectedProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1)


  const addProduct = (product) => {
    if (!addedProduct(product.id) && product.stock > 0) {
      addToCart({ ...product, quantity });
      setQuantity(1);
      console.log('Producto agregado')
    } else if (addedProduct(product.id)) {
      console.log('El producto ya está agregado al carrito', product.nameProduct)
    } else {
      console.log('No hay stock disponible para el producto', product.nameProduct);
    }
  }

  const redirectToProductHome = (productId) => { 
    setSelectedProduct(productId); // Guarda el ID del producto seleccionado
    navigate(`/productHome/${productId}`); // Redirige a la ruta de productHome con el ID
  };

  const vasosData = data.filter((product) => product.category === 'vasos');
  return (
    <>
     <div className="product-cont">
        {vasosData.map((vaso) => (
          <div className='container-items'
            key={vaso.id}
          >
            <div className="item">
            <NavLink
                  className='product-name'
                  to={`/productHome/${vaso.id}`} // Actualiza la ruta con el ID del producto
                  onClick={() => redirectToProductHome(vaso.id)}
                >
                    <h2>{vaso.nameProduct}</h2>
                
                </NavLink>
                <div className="product-footer">
                <div className="product-photo">
              <img src={vaso.urlImage} alt={vaso.nameProduct} />
              </div>
              <div className="info-product">
               
                <p><strong>{vaso.price}</strong></p>
                <button
                  onClick={() => addProduct(vaso)}
                  style={{
                    background: addedProduct(vaso.id) ? '#5ccb5f' : vaso.stock > 0 ? '' : 'red',
                    color: addedProduct(vaso.id) || vaso.stock > 0 ? 'white' : 'white'
                  }}
                  disabled={addedProduct(vaso.id) || vaso.stock <= 0}
                >
                  {addedProduct(vaso.id) ? "En el carrito" : vaso.stock > 0 ? "Añadir al carrito" : "Sin stock"}
                </button>
                </div>
              </div>
              
            </div>
          </div>
        ))}
      </div>
     <div className="productFooter">
     <div className="product-container">
     <div className="links">
     <h2>Navegación</h2>
     <p className="mb-1" ><NavLink className="link-opacity-10-hover" style={{ color: 'white', textDecoration: 'none' }} to="/">Home</NavLink></p>
            <p className="mb-1" ><NavLink className="link-opacity-25-hover" style={{ color: 'white', textDecoration: 'none' }} to="/productList">Todos Los Productos</NavLink></p>
            <p className="mb-1" ><NavLink className="link-opacity-50-hover" style={{ color: 'white', textDecoration: 'none' }} to="/remeras">Remeras</NavLink></p>
            <p className="mb-1" ><NavLink className="link-opacity-75-hover" style={{ color: 'white', textDecoration: 'none' }} to="/soquetes">Soquetes</NavLink></p>
            <p className="mb-1" ><NavLink className="link-opacity-100-hover" style={{ color: 'white', textDecoration: 'none' }} to="/medias">Medias</NavLink></p>
            <p className="mb-1" ><NavLink className="link-opacity-100-hover" style={{ color: 'white', textDecoration: 'none' }} to="/vasos">Vasos</NavLink></p>
     </div>
     
     <div className="networks">
       <a className="face" href="" ><FaFacebookSquare style={{width:'40px',height:'40px', color:'white'}}/></a>
       <a className="insta" href="" ><FaInstagramSquare style={{width:'40px',height:'40px', color:'white'}}/></a>
       <a className="x" href="" ><FaSquareXTwitter style={{width:'40px',height:'40px', color:'white'}}/></a>
       <a className="ws" href="" ><FaSquareWhatsapp style={{width:'40px',height:'40px', color:'white'}}/></a>
     </div>
     </div>
     </div>
     <div className="copyright"><p>Copyright&copy; 2024 - Página creada por <strong>@pablodalcaraz</strong> </p>
     <p>Todos los derechos reservados</p> </div>
    </>
  )
}
