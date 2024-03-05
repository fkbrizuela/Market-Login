import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const url = "http://localhost:3001/productos"

const CreateProducts = () => {

  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState(0)
  const [stock, setStock] = useState(0.00)
  const [error, setError] = useState("")
  const redirect = useNavigate()

  const store = async (e) => {
    e.preventDefault()
    let obj = JSON.stringify(
      {
        nombre: nombre,
        precio: Number(precio),
        stock: Number(stock)
      }
    )

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: obj
      })
      const resdata = await response.text()

      if (response.status === 500)
        setError("Error de motor SQL: " + resdata)
      else if (resdata === "OK")
        redirect('/Home')
      else
        setError(resdata)
    } catch (ex) {
      setError("Error de fetch al cargar: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded my-auto'>
        <h2>Añadir producto</h2>
        <form onSubmit={(event) => store(event)}>
          <p style={{color: "#ff0000"}}>{error}</p>
          <label>Nombre: </label>
          <input type="text" id='titulo' maxLength='80' className='form-control' required={true} value={nombre} onChange={(e)=>setNombre(e.target.value) }/>
          <label>Precio: </label>
          <input type="number" id='precio' className='form-control' step={0.1} required={true} value={precio} onChange={(e)=>setPrecio(e.target.value) }/>
          <label>Stock: </label>
          <input type="number" id='stock' className='form-control' step={0.1} required={true} value={stock} onChange={(e)=>setStock(e.target.value) }/>
          <button className='btn btn-success border w-100 mt-3'>Guardar</button>
        </form>
        <Link to='/Home' className='btn btn-default border w-100 mt-3 mb-3'>Volver</Link>
      </div>
    </div>
  )
}
export default CreateProducts
