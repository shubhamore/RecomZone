import Home from './pages/Home';
import './App.css';
import { Navigate, Route, Routes } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import NavBar from './components/Navbar';
import Upload from './pages/Upload';

function App() {
  return (
    <div className="App min-h-screen min-w-full flex flex-col">
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload/>} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
