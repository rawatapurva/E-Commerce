import React, { useContext } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';  // ✅ Added useDispatch
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { setCart } from '../redux/Slices/CartSlice';  // ✅ Import setCart action

const Navbar = () => {
  const { items } = useSelector((state) => state.cart);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();  // ✅ Initialize dispatch

  const handleLogout = () => {
    logout();                 // ✅ Clear token & user from context
    dispatch(setCart([]));    // ✅ Clear cart in Redux when user logs out
    navigate("/login");       // ✅ Redirect to login page
  };

  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        {/* Logo */}
        <NavLink to="/">
          <div className="ml-5">
            <img src="../logo.png" alt="Logo" className="h-14" />
          </div>
        </NavLink>

        {/* Right side nav items */}
        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          {user ? (
            <>
              <NavLink to="/">
                <p className="hover:text-green-400">Home</p>
              </NavLink>

              <NavLink to="/cart">
                <div className="relative">
                  <FaShoppingCart className="text-2xl" />
                  {items.length > 0 && (
                    <span
                      className="absolute -top-1 -right-2 bg-green-600 text-xs w-5 h-5 flex 
                      justify-center items-center animate-bounce rounded-full text-white"
                    >
                      {items.length}
                    </span>
                  )}
                </div>
              </NavLink>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <p className="border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black transition-all">
                  Login
                </p>
              </NavLink>
              <NavLink to="/signup">
                <p className="border border-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                  Signup
                </p>
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

