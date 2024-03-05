import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Item from './Item';
import Cookies from 'js-cookie';
import CartItem from './CartItem';

function Cart() {
  const url = ""
  const redirect = useNavigate();
  const [error, setError] = useState("")
  const [carrito, setCarrito] = useState([])

  const getCarrito = async () => {

    try {
      const response = await fetch(`http://localhost:3001/carrito?nombre=${Cookies.get('usuario')}`)

      const resdata = await response.text();

      if (response.status === 500) {// reviso el estado http de la respuesta
        setError("Error de motor SQL: " + resdata)
      } else if (response.status === 200) {
        setCarrito(JSON.parse(resdata))
      } else {
        setError(resdata)
      }
    } catch (ex) {// captura especificamente el caso de que falle el fetch
      setError("Error de fetch: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  useEffect(() => {
    if (Cookies.get('usuario') === undefined) {
      redirect('/');
      return;
    }
    getCarrito()
  }, [])

  return (
    <div>
      <h2>Carrito</h2>
      <p style={{ color: "#ff0000" }}>{error}</p>
      <div className='container-fluid'>
        {carrito.length > 0 ? carrito.map((product) => <CartItem id={product.idproducto} cantidad={product.cantidad} setError={setError} />) : <label>No hay ningún producto.</label>}
      </div>
    </div>
  );
}

export default Cart;
