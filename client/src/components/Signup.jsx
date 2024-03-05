import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"
import Cookies from 'js-cookie';

const Signup = () => {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [confirmaContraseña, setConfirmaContraseña] = useState("")
  const [error, setError] = useState("")
  const url = "http://localhost:3001/nuevo_usuario"
  const redirect = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      nombre: nombre,
      contraseña: contraseña,
      confirma_contraseña: confirmaContraseña
    }

    try {
      const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const resdata = await response.text();

      if (response.status === 500) {// reviso el estado http de la respuesta
        setError("Error de motor SQL: " + resdata)
      } else if (resdata === "OK") {
        Cookies.set('usuario', nombre);
        redirect('/Home')
      } else {
        setError(resdata)
      }
    } catch (ex) {// captura especificamente el caso de que falle el fetch
      setError("Error de fetch: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  return (
    <div>
      <h2>Crear cuenta</h2>
      <form onSubmit={handleSubmit}>
        <p style={{ color: "#ff0000" }}>{error}</p>
        <div className="mb-3">
          <label htmlFor="nombre"><strong>Nombre</strong></label>
          <input type="text" placeholder="Ingresar Nombre" className="form-control rounded-0" value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Contraseña</strong></label>
          <input type="password" placeholder="Contraseña" className="form-control rounded-0" value={contraseña}
            onChange={e => setContraseña(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Confirma contraseña</strong></label>
          <input type="password" placeholder="Confirma contraseña" className="form-control rounded-0" value={confirmaContraseña}
            onChange={e => setConfirmaContraseña(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-100 rounded-0"><strong>Crear</strong></button>
      </form>
      <p>Usted de acuerdo con nuestros términos y condiciones</p>
      <Link to='/' className='btn btn-dark border w-100 rounded-0'>Volver</Link>
    </div>
  )
}
export default Signup
