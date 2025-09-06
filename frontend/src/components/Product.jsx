import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addItemToServer, removeItemFromServer } from '../redux/Slices/CartSlice';
import toast from 'react-hot-toast';

const Product = ({ post }) => {
  const { items } = useSelector((state) => state.cart); // updated: cart.items
  const dispatch = useDispatch();

  const addToCart = () => {
    const item = {
      productId: post.id.toString(),
      title: post.title,
      price: post.price,
      image: post.image,
      description: post.description,
      quantity: 1
    };
    dispatch(addItemToServer(item));
    toast.success("Item added to cart");
  };

  const removeFromCart = () => {
    dispatch(removeItemFromServer(post.id.toString()));
    toast.error("Item removed from cart");
  };

  return (
    <div className='flex flex-col items-center justify-between hover:scale-110 transition duration-300 ease-in 
      hover:shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] gap-3 p-4 mt-10 ml-5 rounded-xl outline'>
      
      <div>
        <p className='text-gray-900 font-semihold text-lg text-left truncate w-40 mt-1'>
          {post.title.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>

      <div>
        <p className='w-40 text-gray-400 font-normal text-[10px] text-left'>
          {post.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>

      <div className='h-[180px]'>
        <img src={post.image} className='h-full w-full' alt={post.title} />
      </div>

      <div className='flex justify-between gap-12 items-center w-full mt-5'>
        <div>
          <p className='text-green-600 font-semibold'>${post.price}</p>
        </div>

        {
          items.some((p) => p.productId === post.id.toString()) ?
            (<button
              className='text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase
                hover:bg-gray-700 hover:text-white transition duration-300 ease-in'
              onClick={removeFromCart}>
              Remove Item
            </button>) :
            (<button
              className='text-gray-700 border-2 border-gray-700 rounded-full font-semibold text-[12px] p-1 px-3 uppercase
                hover:bg-gray-700 hover:text-white transition duration-300 ease-in'
              onClick={addToCart}>
              Add to Cart
            </button>)
        }
      </div>

    </div>
  );
};

export default Product;


