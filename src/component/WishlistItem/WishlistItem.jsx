/* eslint-disable react/prop-types */
import { useContext } from "react"
import { WishListContext } from "../../context/wishlist.context"
import { CartContext } from "../../context/cart.context"

export default function WishlistItem({ productInfo }) {
    const { price, title, imageCover, id } = productInfo;
    let { removeFromWishList } = useContext(WishListContext)
    let { addProductToCart } = useContext(CartContext)
    return <>
        <div className="border-2 border-gray-200 p-3">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-2">
                    <img className="w-full" src={imageCover} alt="" />
                </div>
                <div className="col-span-10 space-y-4 flex flex-col">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                    <span className="text-lg font-semibold text-primary-700">{price} EGP</span>
                    <div className="space-x-4">
                        <button
                            onClick={() => {
                                addProductToCart({ productId: id })
                            }}
                            className="btn bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-300 font-semibold">ADD TO CART</button>
                        <button
                            onClick={() => {
                                removeFromWishList({ productId: id })
                            }}
                            className="btn  bg-red-500 text-white hover:bg-red-600 transition-colors duration-300 font-semibold   "><i className="fa-solid fa-trash mr-1"></i>REMOVE</button>
                    </div>

                </div>
            </div>
        </div>
    </>
}
