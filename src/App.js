import { BrowserRouter ,Route,Routes } from 'react-router-dom'
import Login from './components/Login';
import About from './components/About';
import Users from './components/Users';
import Products from './components/Products';
import Home from './components/Home';


function App() {
  return (
    <>
      <BrowserRouter>
   
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/users" element={<Users/>} />
          <Route path="/product" element={<Products/>} />
        </Routes>
      
      
      </BrowserRouter>
    </>
  );
}

export default App;