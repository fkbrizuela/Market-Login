import { useState } from "react";
import { Link } from "react-router-dom";




const Login = () => {
  const [nombre, setNombre] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [error, setError] = useState(0)

const handleSubmit = (e) => { 
  e.preventDefault()
  console.log(e);
  if(nombre === "" || contraseña === ""){
    setError(1)
    return
  }

  if(false){
    setError(2)
    return
  }
    
  setError(0) // sin error
}

const errorSwitch = () => {
  switch(error) {
    case 0:
      return <p className="text-align-center"> bienvenido</p>
    case 1:
      return <p> Todos los campos son obligatorios</p>
    case 2:
      return <p> El nombre de usuario o la contraseña son incorrectos</p>
    default:
      return <p> Error desconocido</p>;
  }
}
  
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
      <h2>Ingresar</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre"><strong>Nombre:</strong></label>
            <input type="text" placeholder="Ingresar Nombbre" name="nombre" className="form-control rounded-0" value={nombre}
            onChange={e=>setNombre(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password"><strong>Contraseña</strong></label>
            <input type="password" placeholder="Contraseña" name='password' className="form-control rounded-0" value={contraseña}
            onChange={e=>setContraseña(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">Login</button>
        </form>
        <p>Usted está de acuerdo con nuestros términos y condiciones</p>
        <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0'>Crear Cuenta</Link>
      {errorSwitch()} 
      </div>
    </div>
  );
};
export default Login;
