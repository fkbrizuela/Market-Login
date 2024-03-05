import "./App.scss";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ChangePass from "./components/ChangePass";
import ShowProductsCopy from "./components/ShowProductsCopy";
import CreateProducts from "./components/CreateProducts";
import EditProducts from "./components/EditProducts";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";

function App() {
  return (
    <div className="App" data-bs-theme="dark">
      <BrowserRouter>
      <div className='d-flex align-items-center vw-100 vh-100 text-light' style={{flexFlow: "column"}}>
        <NavBar />
        <div className='bg-body-tertiary p-3 rounded my-auto'>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Productos" element={<ShowProductsCopy />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/ChangePass" element={<ChangePass />}></Route>
          <Route path="/create" element={<CreateProducts />}></Route>
          <Route path="/edit/:id" element={<EditProducts />}></Route>
          <Route path="/Cart" element={<Cart />}></Route>
        </Routes>
        </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
