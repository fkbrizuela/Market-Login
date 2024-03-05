import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './styles/Item.css'
const Item = ({ product, DeleteProduct, showOptions }) => {

    return (
        <Card>
            <Card.Body>
                <Card.Title>{product.nombre}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>${product.precio}</ListGroup.Item>
                <ListGroup.Item>{product.stock} en stock</ListGroup.Item>
            </ListGroup>
            {showOptions ?
                <Card.Body>
                    <Link to={`/edit/${product.id}`} className="btn w-50 btn-primary">Editar</Link>
                    <button onClick={() =>  DeleteProduct(product.id) } className='btn w-50 btn-danger' >Eliminar</button>
                </Card.Body>
             : false}
        </Card>
    )
}
export default Item
