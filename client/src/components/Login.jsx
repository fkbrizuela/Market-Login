import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState("")
  const url = "http://localhost:3001/autenticar"
  const redirect = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      nombre: nombre,
      contraseña: contraseña
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
        redirect('/Productos')
      } else {
        setError(resdata)
      }
    } catch (ex) {// captura especificamente el caso de que falle el fetch
      setError("Error de fetch: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  return (
    <div>
      <h2>Ingresar</h2>
      <form onSubmit={handleSubmit}>
        <p style={{ color: "#ff0000" }}>{error}</p>
        <div className="mb-3">
          <label htmlFor="nombre"><strong>Nombre:</strong></label>
          <input type="text" placeholder="Ingresar Nombre" name="nombre" className="form-control" value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password"><strong>Contraseña</strong></label>
          <input type="password" placeholder="Contraseña" name='password' className="form-control" value={contraseña}
            onChange={e => setContraseña(e.target.value)}
          />
        </div>
        <p>Usted está de acuerdo con nuestros términos y condiciones</p>
        <button type="submit" className="btn btn-success w-100 mb-3">Login</button>
      </form>
      <Link to='/signup' className='btn btn-dark border w-100 mb-3'>Crear Cuenta</Link>
      <Link to='/ChangePass' className='btn btn-dark border w-100 mb-1'>Cambio Contraseña</Link>
    </div>
  );
};
export default Login;
