import { createContext, useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom'
import  { earbuds, shoes, tshirts, tshirtWomen } from './components/Products'
import Cart from './components/Cart'
import Header from './components/Header'
export const maincontext = createContext();
import Home from './components/Home'
import Search from './components/Search'
import { useNavigate } from "react-router-dom";
import { PiCurrencyInrBold } from "react-icons/pi";
import Swal from 'sweetalert2' // npm i sweetalert2
import Register from './components/Register'
import Login from './components/Login'
import Users from './components/Users'
import ProductDetails from './components/ProductDetails'
import { ForgotPassword } from './components/forgotPassword'


function App() {
  let Navigate = useNavigate();
  let [products, setProducts] = useState([])
  let [cart,setCart] = useState([])
  let [searchvar, setSearchVar] = useState([])
  let [singleproduct,setsingleproduct] = useState({})
  let inr = <PiCurrencyInrBold />
  useEffect(()=>{
    setProducts([...earbuds,...tshirts,...shoes,...tshirtWomen])
  },[])

  function searchHandler(e){
    e.preventDefault()
    Navigate('/search')
  }
  function addtocart(id){
    let obj = products.find((x) => x.id == id)
    let existing = cart.find((x) => x.id == id)
    if(existing){
      alert('');
    }else{
      setCart([...cart,obj])
    }
  }

  function RemoveCart(id){
    Swal.fire({
      title: "Are you sure?",
      text: "you want to remove this item from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
       
        let filteredarr =   cart.filter((x) => x.id != id)
        setCart(filteredarr);
        Swal.fire({
          title: "Deleted!",
          text: "Product Removed successfully!",
          icon: "success"
        });
      }
    });
  }

  function qtyInc(product){
    let id = product.id
    let cartproduct = cart.find((x) => x.id == id)
    cartproduct.qty++;
    setCart([...cart])
  }
  function qtyDec(product){
    let id = product.id
    let  cartproduct = cart.find((x) => x.id == id)
    if(cartproduct.qty <= 1){
      RemoveCart(id)
    }else{
      cartproduct.qty--;
      setCart([...cart])
    }
  }
  return (
    <>
  
      <maincontext.Provider value={{products,cart,addtocart,RemoveCart,setSearchVar,searchvar,searchHandler,inr,qtyDec,qtyInc,setsingleproduct,singleproduct}}>
        <Router  basename={process.env.PUBLIC_URL}>
          <Header />
        <Routes>
          <Route path='/MERN/' element={<Login/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/search' element={<Search/>}/>
          <Route path='/product' element={<ProductDetails/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/users' element={<Users/>}/>
          <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        </Routes>
          </Router>

        </maincontext.Provider>

    </>
  )
}

export default App
