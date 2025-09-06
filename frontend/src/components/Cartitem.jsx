import React from 'react';
import { FcDeleteDatabase } from "react-icons/fc";
import { useDispatch } from 'react-redux';
import { removeItemFromServer } from '../redux/Slices/CartSlice';
import { toast } from "react-hot-toast";

const Cartitem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(removeItemFromServer(item.productId)); // Use productId from server
    toast.error("Item removed from cart");
  };

  return (
    <div className="p-4 border-b-2 last:border-none border-slate-700">
      <div className="flex justify-between py-3.5 px-2.5 gap-14 flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-[30%] w-full flex justify-center items-center">
          <img src={item.image} alt={item.title} className="w-[40%] md:w-[50%] lg:w-full" />
        </div>

        {/* Product Details */}
        <div className="md:w-[70%] w-full flex flex-col gap-5">
          <h1 className="text-xl font-[600] text-slate-700">{item.title}</h1>
          <h1 className="text-slate-700">
            {item.description.split(" ").slice(0, 15).join(" ") + "..."}
          </h1>

          {/* Price and Delete Button */}
          <div className="flex justify-between items-center">
            <p className="font-bold text-[#16a34a] text-lg">${item.price}</p>
            <div
              onClick={removeFromCart}
              className="w-10 h-10 rounded-full bg-red-200 flex justify-center items-center
                hover:bg-red-400 group transition-all cursor-pointer">
              <FcDeleteDatabase
                fontSize={25}
                className="group-hover:text-white text-red-800 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cartitem;
