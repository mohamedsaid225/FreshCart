import { useContext} from "react"
import { CartContext } from "../../context/cart.context"
import { Link } from "react-router-dom"
import { WishListContext } from "../../context/wishlist.context"

/* eslint-disable react/prop-types */
export default function Card({ productInfo }) {
  const { imageCover, title, price, category, description, ratingAverage, id } = productInfo
  let { addProductToCart } = useContext(CartContext)
  let { addToWishList , liked , removeFromWishList } = useContext(WishListContext)
  return ( 
    <>
      <div className="card group/card rounded-lg overflow-hidden shadow-lg">
        <div className='relative'>
          <img className='w-full' src={imageCover} alt="" />
          <div className='layer group-hover/card:opacity-100 bg-opacity-40 opacity-0 transition-opacity duration-300 gap-4 flex justify-center items-center absolute w-full h-full left-0 top-0 bg-slate-400'>
            <div
              onClick={() => {
                liked[id] ? removeFromWishList({productId:id}) : addToWishList({productId:id});
                
              }}
              className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-700 text-white flex justify-center items-center">
              <i className={`fa-solid fa-heart ${liked[id] ? 'text-red-500':''}`} ></i>
            </div>
            <div onClick={() => {
              addProductToCart({ productId: id })
            }} className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-700 text-white flex justify-center items-center">
              <i className='fa-solid fa-cart-plus'></i>
            </div>
            <Link to={`/productDetails/${id}`} className="icon cursor-pointer w-8 h-8 rounded-full bg-primary-700 text-white flex justify-center items-center">
              <i className='fa-regular fa-eye'></i>
            </Link>
          </div>

        </div>
        <div className="card-body p-4 space-y-3">
          <header>
            <h3 className='text-lg text-gray-600 font-semibold line-clamp-1'><Link to={`/productDetails/${id}`}>{title}</Link></h3>
            <h4 className='text-primary-700 font-semibold'>{category.name}</h4>
          </header>
          <p className='text-gray-400 text-sm line-clamp-2'>{description}</p>
          <div className='flex justify-between items-center'>
            <span>{price} L.E</span>
            <div>
              <i className='fa-solid fa-star mr-1 text-yellow-500'></i>
              <span>{ratingAverage}</span>
            </div>
          </div>
        </div>
      </div>




    </>
  )
}
