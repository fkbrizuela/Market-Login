import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const ChangePass = () => {
  const [contraseñaActual, setContraseñaActual] = useState("")
  const [contraseñaNueva, setContraseñaNueva] = useState("")
  const [confirmaContraseña, setConfirmaContraseña] = useState("")
  const [error, setError] = useState("")
  const url = "http://localhost:3001/cambio_contrasena"
  const redirect = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const usuario = Cookies.get("usuario");

    const data = {
      nombre: usuario,
      contraseña_actual: contraseñaActual,
      contraseña_nueva: contraseñaNueva,
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
        Cookies.remove('usuario');
        redirect('/')
      } else {
        setError(resdata)
      }
    } catch (ex) {// captura especificamente el caso de que falle el fetch
      setError("Error de fetch: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  return (
    <div>
      <h2>Cambio de contraseña</h2>
      <form onSubmit={handleSubmit}>
        <p style={{ color: "#ff0000" }}>{error}</p>
        <div className="mb-3">
          <label htmlFor="password"><strong>Contraseña actual</strong></label>
          <input type="password" placeholder="Contraseña actual" className="form-control" value={contraseñaActual}
            onChange={e => setContraseñaActual(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Contraseña nueva</strong></label>
          <input type="password" placeholder="Contraseña nueva" className="form-control" value={contraseñaNueva}
            onChange={e => setContraseñaNueva(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Confirma contraseña</strong></label>
          <input type="password" placeholder="Confirma contraseña" className="form-control" value={confirmaContraseña}
            onChange={e => setConfirmaContraseña(e.target.value)}
          />
        </div>
        <button className="btn btn-success w-100 mb-4"><strong>Cambiar</strong></button>
      </form>
      <Link to='/' className='btn btn-dark border w-100'>Volver</Link>
    </div>
  )
}
export default ChangePass
