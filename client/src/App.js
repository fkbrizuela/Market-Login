import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import ChangePass from "./components/ChangePass";
import ShowProductsCopy from './components/ShowProductsCopy'
import CreateProducts from './components/CreateProducts';
import EditProducts from './components/EditProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Home" element={<ShowProductsCopy />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/ChangePass" element={<ChangePass />}></Route>
        <Route path='/create' element={<CreateProducts />}></Route>
        <Route path='/edit/:id' element={<EditProducts />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
