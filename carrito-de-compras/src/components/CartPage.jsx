import '../App.css';
import { useContext, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { CartContext } from "../context/CartContext";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';




export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [preferenceID, setPreferenceID] = useState(null)
  
  initMercadoPago("TEST-43e8fc95-07c2-4951-97ca-329eaa617c3c",{
    locale:"es-AR"
  });

  const createPreference = async (cart) => {
    try {
      if (!cart || cart.length === 0) {
        console.log("El carrito está vacío.");
        return null;
      }
  
      const productsData = cart.map(product => ({
        title: product.nameProduct,
        quantity: product.quantity,
        price: product.price
      }));
  
      const response = await axios.post("http://localhost:8080/create-preference", productsData);
  
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  }
  
  
  
  
  const handleBuy = async () => {
     const id = await createPreference(cart)
     if(id) {
      setPreferenceID(id)
     }
  }
  const calculateTotal = () => {
    const total = cart.reduce((accumulator, product) => {
      const price = product.price;
      return accumulator + price * product.quantity;
    }, 0);
    return `${total.toFixed(2)}`;
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    console.log("Producto eliminado del carrito:", productId);
  };

  const handleDecreaseQuantity = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product && (product.quantity <= product.stock - 1)) {
      updateQuantity(productId, product.quantity + 1);
    }
  };

  const calculateSubtotal = (product) => {
    if (product && product.price) {
      const price = product.price;
      return `${(price * product.quantity).toFixed(2)}`;
    }
    return '$0.00';
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Producto</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Subtotal</th>
              <th scope="col">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((product) => (
              <tr key={product.id}>
                <td><img src={product.urlImage} alt={product.nameProduct} style={{ width: '80px', height: '80px' }} /></td>
                <td>{product.nameProduct}</td>
                <td>$ {Number(product.price).toFixed(2)}</td>
                <td>
                  <div className='quantity-cont'>
                    <button style={{ border: 'none', marginRight: '5px' }} onClick={() => handleDecreaseQuantity(product.id)}><strong>-</strong></button>
                    <button style={{ border: 'none', backgroundColor: '#5ccb5f', color: 'white', borderRadius: '5px' }}>{product.quantity}</button>
                    <button style={{ border: 'none', marginLeft: '5px' }} onClick={() => handleIncreaseQuantity(product.id)}><strong>+</strong></button>
                  </div>
                </td>
                <td>$ {calculateSubtotal(product)}</td>
                <td>
                  <button style={{ border: 'none', backgroundColor: 'white', color: 'red' }} type="button" onClick={() => handleRemoveFromCart(product.id)}>
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-grid gap-2">
          <div className='total'>
            <p><strong></strong></p>
            <p style={{ marginRight: '80px', color: 'black' }}><strong>Total: ${calculateTotal()}</strong></p>
          </div>
          <button className="btn btn-primary" onClick={handleBuy}>COMPRAR</button>
          {preferenceID &&  <Wallet initialization={{ preferenceId: preferenceID }} customization={{ texts:{ valueProp: 'smart_option'}}} />}
         
        </div>
      </div>
    </>
  );
};

