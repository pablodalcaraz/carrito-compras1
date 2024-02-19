import { useContext, useState,useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { useParams } from 'react-router-dom';
import '../App.css'
import { CartContext } from "../context/CartContext";
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";


export const ProductHome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data } = useContext(ProductContext);
  const { addToCart, cart } = useContext(CartContext);
  const { productId } = useParams();
  const selectedProduct = data.find((product) => product.id === parseInt(productId, 10));
  const addedProduct = (productId) => {
    return cart.some((item) => item.id === productId)
  }
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


  return (
    <>
      <div className="productCont">
        <div className="itemProduct">

          <img src={selectedProduct.urlImage} alt={selectedProduct.nameProduct} />

          <div className="product-info">
            <h2>{selectedProduct.nameProduct}</h2>
            <p>{selectedProduct.description}</p>
            <p><strong>${Number(selectedProduct.price).toFixed(2)}</strong></p>
            <button onClick={() => addProduct(selectedProduct)} style={{ background: addedProduct(selectedProduct.id) ? '#5ccb5f' : '' }}  >
              {addedProduct(selectedProduct.id) ? "En el carrito" : "Añadir al carrito"}</button>

          </div>
        </div>
      </div>
      <div className="productFooter">
      <div className="product-container d-flex flex-wrap justify-content-between">
        <div className="links mb-3 mb-lg-0">
        <h2>Navegación</h2>
        <p className="mb-1" ><a className="link-opacity-10-hover" style={{color:'white',textDecoration:'none'}} href="/home">Home</a></p>
        <p className="mb-1" ><a className="link-opacity-25-hover"  style={{color:'white',textDecoration:'none'}}href="/productList">Todos Los Productos</a></p>
        <p className="mb-1" ><a className="link-opacity-50-hover"  style={{color:'white',textDecoration:'none'}}href="/remeras">Remeras</a></p>
        <p className="mb-1" ><a className="link-opacity-75-hover"  style={{color:'white',textDecoration:'none'}}href="/soquetes">Soquetes</a></p>
        <p className="mb-1" ><a className="link-opacity-100-hover" style={{color:'white',textDecoration:'none'}} href="/medias">Medias</a></p>
        <p className="mb-1" ><a className="link-opacity-100-hover" style={{color:'white',textDecoration:'none'}} href="/vasos">Vasos</a></p>
        </div>
        
        <div className="networks mb-3 mb-lg-0">
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
