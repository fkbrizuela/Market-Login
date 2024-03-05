import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/Item.css'
import Cookie from 'js-cookie';

const Item = ({ product, DeleteProduct, setError, showOptions }) => {
  const [cantidad, setCantidad] = useState(1);
  const redirect = useNavigate();

  const AddToCart = async () => {
    let obj = JSON.stringify(
      {
        nombre: Cookie.get('usuario'),
        producto: product.id,
        cantidad: cantidad
      }
    )

    try {
      const response = await fetch(`http://localhost:3001/agregarcarrito`, {
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
        redirect('/Cart')
      else
        setError(resdata)
    } catch (ex) {
      setError("Error de fetch al borrar producto: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>${product.precio}</ListGroup.Item>
        <ListGroup.Item>{product.stock} en stock</ListGroup.Item>
        {showOptions ?
          <ListGroup.Item>
            <label htmlFor="cantidad"><strong>Cantidad</strong></label>
            <input step="1" defaultValue="1" min="1" max={product.stock} type="number" id="cantidad" onChange={(e) => setCantidad(e.target.value)} class="form-control mb-2" />
          </ListGroup.Item>
          : false}
        {showOptions ?
          <ListGroup.Item>
            <button onClick={AddToCart} className='btn w-100 border btn-dark' >Añadir al carrito</button>
          </ListGroup.Item>
          : false}
        {showOptions ?
          <ListGroup.Item>
            <Link to={`/edit/${product.id}`} className="btn w-50 btn-primary">Editar</Link>
            <button onClick={() => DeleteProduct(product.id)} className='btn w-50 btn-danger' >Eliminar</button>
          </ListGroup.Item>
          : false}
      </ListGroup>
    </Card>
  )
}
export default Item
