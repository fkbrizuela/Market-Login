import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const url = "https://fakestoreapi.com/products" 

const ShowProducts = () => {
  const [products, setProducts] = useState([])


  useEffect(() => {
    getProducts()
/*     fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then((data)=>setProducts(data)) */
  }, [])

  const getProducts = async () => {
    const url = "https://fakestoreapi.com/products"
    const response = await axios.get(url)
    setProducts(response.data);
  }

  const deleteProducts = async (id) => {
    const params = { headers: { 'content-Type': 'application/json' }, data: { 'id': id } }
    await axios.delete(url, params);
    getProducts()
  }
console.log(products);
console.log(products.map(product=> product.title));
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-4 offset-4">
          <div className='d-grid mx-au'>
            <h2>ShowProducts</h2>
            <Link to='/create' className='btn btn-dark'>Añadir</Link>
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12 col-lg-8 offset-0 offset-lg-2'>
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Productos</th>
                  <th>Categoria</th>
                  <th>Descripción</th>
                  <th>Precio</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='table-group-divider'>
                <tr>
                  <td>hola</td>
                  <td>como</td>
                  <td>estas</td>
                  <td>tu</td>
                  <td>juan</td>
                </tr>
 {/*                {products.map((product)=>{
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                      <Link to={`/edit/${product.id}`}></Link> 
                    </td>
                  </tr>
                })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ul>
        {products.map(el => <li key={el.id} >{el.title}<Link to={`/edit/${el.id}`} className='btn btn-warning'>Editar</Link></li>)}
        
      </ul>
    </div>
  )
}
export default ShowProducts