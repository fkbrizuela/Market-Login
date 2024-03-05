import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './styles/Item.css'
const CartItem = ({ id, cantidad, setError }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    try {
      fetch(`http://localhost:3001/productos/?id=${id}`).then((response) => {
        response.text().then((resdata) => {
          if (response.status === 500)
            setError("Error de motor SQL: " + resdata)
          else if (response.status === 200)
            setProduct(JSON.parse(resdata)[0])
          else
            setError(resdata)
        })
      })
    } catch (ex) {
      setError("Error de fetch al editar producto: " + ex + " Puede que el backend se haya crasheado, no esté abierto, o haya un problema de CORS.")
    }
  }, [])

  return (
    <Card>
      <Card.Body>
        <Card.Title>{product.nombre}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>${product.precio}</ListGroup.Item>
        <ListGroup.Item>{product.stock} en stock</ListGroup.Item>
        <ListGroup.Item>Cantidad: {cantidad}</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}
export default CartItem