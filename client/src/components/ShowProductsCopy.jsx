import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Item from './Item';
import './styles/ShowProductsCopy.css'

const url = "http://localhost:3001/productos"

const ShowProductsCopy = () => {
  const [products, setProducts] = useState([])
  const [error, setError] = useState("")

  const getProducts = async () =>
  {
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
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded my-auto'>
        <h2>Lista de productos</h2>
        <p style={{color: "#ff0000"}}>{error}</p>
        <Link to='/create' className='btn w-100 btn-dark mb-3'>Añadir</Link>
        <div className='container-fluid'>
          {products.length > 0 ? products.map((product) => <Item key={product.id} product={product} DeleteProduct={DeleteProduct} showOptions={true} />) : <label>No hay ningún producto.</label>}
        </div>
      </div>
    </div>
  )
}
export default ShowProductsCopy
