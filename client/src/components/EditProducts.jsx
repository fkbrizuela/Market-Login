import { useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'
import './styles/ShowProductsCopy.css'
import Item from './Item';

const url = "http://localhost:3001/productos"

const EditProducts = () => {
  const [producto, setProducto] = useState([])
  const [nombre, setNombre] = useState("")
  const [precio, setPrecio] = useState(0.00)
  const [stock, setStock] = useState(0)
  const redirect = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState("")

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/productos/?id=${id}`).then((response) => {
        response.text().then((resdata) => {
          if (response.status === 500)
            setError("Error de motor SQL: " + resdata)
          else if (response.status === 200)
            setProducto(JSON.parse(resdata)[0])
          else
            setError(resdata)
        })
      })
    } catch (ex) {
      setError("Error de fetch al editar producto: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }, [id])

  const update = async (e) => {
    e.preventDefault();

    let obj = JSON.stringify(
      {
        nombre: nombre,
        precio: Number(precio),
        stock: Number(stock),
        id: Number(id)
      }
    )

    try {
      const response = await fetch(`http://localhost:5000/productos`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: obj
      })

      const resdata = await response.text();

      if (response.status === 500)
        setError("Error de motor SQL: " + resdata)
      else if (resdata === "OK")
        redirect('/Productos')
      else
        setError(resdata)
    } catch (ex) {
      setError("Error de fetch al editar producto: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  return (
      <div>
      <h3>Editar producto</h3>
      <Item key={producto.id} product={producto} showOptions={false} />
        <p style={{color: "#ff0000"}}>{error}</p>
        <form onSubmit={update}>
          <label htmlFor="">Nombre: </label>
          <input type="text" id='nombre' maxLength='80' className='form-control' required={true} value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <label htmlFor="">Precio: </label>
          <input type="number" id='precio' className='form-control' step={0.1} required={true} value={precio} onChange={(e) => setPrecio(e.target.value)} />
          <label htmlFor="">Stock: </label>
          <input type="number" id='stock' className='form-control' step={0.1} required={true} value={stock} onChange={(e) => setStock(e.target.value)} />
          <button className='btn btn-success w-50 mt-3'>Guardar</button><Link to='/Productos' className='btn border w-50 mt-3'>Volver</Link>
        </form>
      </div>
  )
}
export default EditProducts
