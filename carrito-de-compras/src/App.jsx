
import './App.css'
import { Navbar } from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { ProductList } from './components/ProductList'
import { Remeras } from './pages/Remeras'
import { Medias } from './pages/Medias'
import { Vasos } from './pages/Vasos'
import { CartPage } from './components/CartPage'
import { ProductProvider } from './context/ProductProvider'
import { CartProvider } from './context/CartProvider'
import { ProductHome } from './pages/ProductHome'
import { Soquetes } from './pages/Soquetes'
import { LogIn } from './components/LogIn'
import { CheckIn } from './components/CheckIn'
import { UserProvider } from './context/UserProvider'
import { Welcome } from './components/Welcome'
import { CerrarSesion } from './components/CerrarSesion'
import { BuyForm } from './components/BuyForm'




function App() {
  return (
    <UserProvider>
    <ProductProvider>
     <CartProvider>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/productList' element={<ProductList></ProductList>}></Route>
        <Route path='/remeras' element={<Remeras></Remeras>}></Route>
        <Route path='/soquetes' element={<Soquetes></Soquetes>}></Route>
        <Route path='/medias' element={<Medias></Medias>}></Route>
        <Route path='/vasos' element={<Vasos></Vasos>}></Route>
        <Route path='/logIn' element={<LogIn></LogIn>}></Route>
        <Route path='/checkIn' element={<CheckIn></CheckIn>}></Route>
        <Route path='/logIn' element={<LogIn></LogIn>}></Route>
        <Route path='/welcome' element={<Welcome></Welcome>}></Route>
        <Route path='/cerrarSesion' element={<CerrarSesion></CerrarSesion>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/buyForm' element={<BuyForm></BuyForm>}></Route>
        <Route path='/cartPage' element={ <CartPage></CartPage>}></Route>
        <Route path='/productHome/:productId' element={ <ProductHome></ProductHome>}></Route>
      </Routes>
      </CartProvider>
  </ProductProvider>
  </UserProvider>
  )
}

export default App
