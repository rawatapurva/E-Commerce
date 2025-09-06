import React, { useEffect, useState } from 'react';
import Cartitem from '../components/Cartitem';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart } from '../redux/Slices/CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: cart, loading } = useSelector((state) => state.cart);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart from server when page loads
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // Update total amount whenever cart changes
  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  if (loading) {
    return (
      <div className="w-screen h-[calc(100vh-80px)] flex justify-center items-center">
        <h2 className="text-xl font-semibold">Loading your cart...</h2>
      </div>
    );
  }

  return (
    <div>
      {cart.length > 0 ? (
        <div className="flex gap-16 max-w-6xl p-6 mx-auto flex-wrap lg:flex-nowrap">
          {/* Left Side - Cart Items */}
          <div className="lg:w-[70%]">
            {cart.map((item, index) => (
              <Cartitem key={item.productId} item={item} itemIndex={index} />
            ))}
          </div>

          {/* Right Side - Summary */}
          <div className="md:w-[30%] w-full flex flex-col gap-8 justify-between">
            <div className="mt-20">
              <div className="text-xl text-[#166534] uppercase font-[600]">Your Cart</div>
              <div className="text-5xl font-[600] text-[#15803d] uppercase mb-4">Summary</div>
              <p className="font-[600] text-xl text-slate-700">
                <span className="font-normal">Total Items: {cart.length}</span>
              </p>
            </div>

            <div className="mb-20">
              <p className="text-slate-700 text-xl font-[600] mb-5 ">
                Total Amount:
                <span className="font-bold ml-2 text-black">${totalAmount.toFixed(2)}</span>
              </p>
              <button className="text-lg w-full py-2.5 rounded-lg font-bold text-white bg-[#15803d]
                border-2 border-[#15803d] hover:bg-white hover:text-[#15803d] transition-all duration-300 ease-in">
                CheckOut Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-screen h-[calc(100vh-80px)] flex flex-col gap-6 justify-center items-center">
          <h1 className="font-[600] text-xl">Cart Empty</h1>
          <Link to={"/"}>
            <button className="bg-[#16a34a] text-white text-md uppercase font-[600] py-3 px-10 rounded-md
              border-[#16a34a] border-2 hover:bg-white hover:text-[#16a34a] ease-in transition-all duration-300">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
