import { useContext, useEffect } from "react";
import WishlistItem from "../../component/WishlistItem/WishlistItem";
import { WishListContext } from "../../context/wishlist.context";
import Loading from "../../component/Loading/Loading";
import { Link } from "react-router-dom";

export default function Wishlist() {
    let { getWishListProducts, wishListInfo, removeFromWishList } = useContext(WishListContext)
    useEffect(() => {
        getWishListProducts()
    }, [removeFromWishList])
    return <>
        {wishListInfo == null ? <Loading /> : <section className="bg-gray-100 p-4 rounded-lg">
            <header className="mb-4">
                <h2 className="text-2xl font-bold">My Wishlist</h2>
            </header>
            {wishListInfo.count == 0 ? 
            (
                <div className="mt-6 bg-gray-100 p-6 rounded-md shadow flex justify-center items-center flex-col gap-3">
                    <h2>Oops! Your cart is empty. Start shopping now by clicking the button below and find something you love!</h2>
                    <Link to='/' className="btn bg-primary-700 hover:bg-primary-800 transition-colors duration-300 text-white">Back to Home</Link>
                </div>
            ) : <>{wishListInfo.data.map((product) => <WishlistItem key={product.id} productInfo={product} />)}</>}
            
            </section>}
    </>
}
