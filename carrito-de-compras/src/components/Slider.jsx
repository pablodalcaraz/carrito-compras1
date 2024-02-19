import { NavLink } from 'react-router-dom'
import '../Banner.css'
import { dataImage } from "../dataImage"
import { useEffect, useRef, useState } from 'react'
import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";


export const Slider = () => {

    const listRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);
  
    useEffect(() => {
      const listNode = listRef.current;
      const imgNode = listNode.querySelector(`li:nth-child(${currentIndex + 1})`);
  
      if (imgNode) {
        const scrollOffset = imgNode.offsetLeft - (listNode.offsetWidth - imgNode.offsetWidth) / 2;
        listNode.scrollTo({ left: scrollOffset, behavior: 'smooth' });
      }
    }, [currentIndex]);
  
    const scrollToImage = (direction) => {
      const listNode = listRef.current;
      const imgWidth = listNode.offsetWidth;
      
  
      setCurrentIndex((prevIndex) => {
        let newIndex = prevIndex + (direction === 'prev' ? -1 : 1);
        newIndex = Math.max(0, Math.min(newIndex, dataImage.length - 1)); // Ensure newIndex is within bounds
        listNode.scrollTo({ left: newIndex * imgWidth, behavior: 'smooth' });
        return newIndex;
      });
    };
  
    const goToSlide = (slideIndex) => {
      setCurrentIndex(slideIndex);
    };
  
    return (
        <>
 <div className='banner-container'>
    <div className='title'>
      <h1>TIENDA Shop</h1>
        <p>Nuestra tienda virtual</p>
        </div>
        <div className='promos'>
        <div className='cash'><h1>10% de Descuento</h1>
        <p>Efectivo o transferencia</p>
        </div>
        <div className="main-container">
        <div className="slider-container">
        <div className="leftArrow" onClick={(e) => { e.preventDefault(); scrollToImage('prev'); }}>
          &#10092;
        </div>
        <div className="rightArrow" onClick={(e) => { e.preventDefault(); scrollToImage('next'); }}>
          &#10093;
        </div>
        <div className="container-images" ref={listRef}>
          <ul>
            {dataImage.map((item, index) => (
              <li key={item.id}>
                <img src={item.urlImage} alt={`Slide ${index + 1}`} />
              </li>
            ))}
          </ul>
        </div>
        <div className="dots-container">
          {dataImage.map((_, idx) => (
            <div
              key={idx}
              className={`dot-container-item ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              &#9865;
            </div>
          ))}
        </div>
      </div>
      </div >
        <div className='tarjetas'><h1>3 cuotas s/interés</h1>
        <p>Con tarjetas bancarias</p></div>
        </div>
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
            <a className="face" href="" ><FaFacebookSquare style={{ width: '40px', height: '40px', color: 'white' }} /></a>
            <a className="insta" href="" ><FaInstagramSquare style={{ width: '40px', height: '40px', color: 'white' }} /></a>
            <a className="x" href="" ><FaSquareXTwitter style={{ width: '40px', height: '40px', color: 'white' }} /></a>
            <a className="ws" href="" ><FaSquareWhatsapp style={{ width: '40px', height: '40px', color: 'white' }} /></a>
          </div>
        </div>
      </div>
      <div className="copyright"><p>Copyright&copy; 2024 - Página creada por <strong>@pablodalcaraz</strong> </p>
        <p>Todos los derechos reservados</p> </div>
    </>
  )
}

