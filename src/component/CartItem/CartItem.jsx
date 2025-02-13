/* eslint-disable no-unused-vars */

import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

/* eslint-disable react/prop-types */
export default function CartItem({productInfo}) {
    const {count,price,product} = productInfo;
    const {title,imageCover,category,id} = product
    let {removeProductFromCart , updateProductCount} = useContext(CartContext)
    return <>
        <div className='flex gap-2'>
            <div className="card-item flex grow justify-between items-center bg-gray-100 py-4 px-6 rounded-lg">
                <img className='w-24 h-24 object-cover rounded-full border-4 border-white' src={imageCover} alt={title} />
                <h3 className='text-lg text-gray-700 font-semibold'>{title}</h3>
                <h4 className='text-gray-500 font-semibold'>{category.name}</h4>

                <div className='count flex gap-5 items-center'>
                    <span className='text-lg font-bold'>{count}</span>
                    <div className='icons space-y-4'>
                        <div onClick={()=>{
                            updateProductCount({productId:id,count:count+1})
                        }} className='plus cursor-pointer w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center'>
                            <i className='fa-solid fa-plus'></i>
                        </div>
                        <div onClick={()=>{
                            updateProductCount({productId:id,count:count-1})
                        }} className="minus cursor-pointer w-6 h-6 rounded-full bg-gray-700 text-white flex justify-center items-center">
                            <i className='fa-solid fa-minus'></i>
                        </div>
                    </div>
                </div>
                <span>{price} L.E</span>
            </div>

            <button onClick={()=>{
                removeProductFromCart({productId:id})
            }} className='rounded-md bg-gray-100 hover:bg-gray-200 transition-colors duration-300 p-3'>
                <i className='fa-solid fa-xmark'></i>
            </button>

        </div>

    </>
}
