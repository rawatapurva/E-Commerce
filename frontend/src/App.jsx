import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';  // ✅ import

function App() {
  return (
    <div>
      {/* Navbar will always be visible */}
      <div className='bg-slate-900'>
        <Navbar />
      </div>

      {/* Define all application routes */}
      <Routes>
        {/* ✅ Protected routes */}
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />

        {/* Public routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
