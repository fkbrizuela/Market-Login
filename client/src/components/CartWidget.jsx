import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const CartWidget = () => {
  return (
    <Link to="/Cart">
      <Button variant="outline-light">
        <i className="bi bi-box"></i> Box
      </Button>
    </Link>
  )
}
export default CartWidget