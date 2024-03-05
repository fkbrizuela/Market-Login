import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Item from './Item';
import './styles/ShowProductsCopy.css'
import Cookies from 'js-cookie';

const ShowProductsCopy = () => {
  const url = "http://localhost:3001/productos"
  const redirect = useNavigate()
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  const getProducts = async () => {
    try {
      const response = await fetch(url)
      const resdata = await response.text()

      if (response.status === 500)
        setError("Error de motor SQL: " + resdata)
      else if (response.status === 200)
        setProducts(JSON.parse(resdata))
      else
        setError(resdata)
    } catch (ex) {
      setError("Error de fetch al cargar: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  useEffect(() => {
    if (Cookies.get('usuario') === undefined) {
      redirect('/');
      return;
    }
    getProducts()
  }, [])

  const DeleteProduct = async (id) => {
    let obj = JSON.stringify(
      {
        id: id
      }
    )

    try {
      const response = await fetch(`http://localhost:3001/productos`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: obj
      })

      const resdata = await response.text();

      if (response.status === 500)
        setError("Error de motor SQL: " + resdata)
      else if (resdata === "OK")
        await getProducts()
      else
        setError(resdata)
    } catch (ex) {
      setError("Error de fetch al borrar producto: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  return (
    <div>
      <h2>Lista de productos</h2>
      <p style={{ color: "#ff0000" }}>{error}</p>
      <Link to='/create' className='btn btn-dark border w-100 mb-3'>Añadir</Link>
      <div className='container-fluid'>
        {products.length > 0 ? products.map((product) => <Item key={product.id} product={product} DeleteProduct={DeleteProduct} setError={setError} showOptions={true} />) : <label>No hay ningún producto.</label>}
      </div>
    </div>
  )
}
export default ShowProductsCopy
