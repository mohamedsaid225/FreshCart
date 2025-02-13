/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { UserContext } from "./user.context";
import axios from "axios";
import toast from "react-hot-toast";

export const WishListContext = createContext(null);


export default function WishListProvider({ children }) {

    const { token } = useContext(UserContext)
    const [wishListInfo,setWishListInfo]=useState(null)
    const[liked,setLiked]=useState({})

    async function addToWishList({ productId }) {
        const toastId = toast.loading('Adding product...')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: 'POST',
                headers: {
                    token: token
                },
                data: {
                    productId,
                }
            }
            let { data } = await axios.request(options);
            if(data.status=='success'){
                toast.success(data.message)
                getWishListProducts()
                setLiked((prev) => ({
                    ...prev,
                    [productId]: true,
                }));
            }

        } catch (error) {
            console.log(error);
        }
        finally{
            toast.dismiss(toastId)
        }
    }
    async function getWishListProducts() {
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/wishlist`,
                method:'GET',
                headers:{
                    token,
                }
            }
            let {data} = await axios.request(options)
            setWishListInfo(data)
        } catch (error) {
            console.log(error);
            
        }
    }
    async function removeFromWishList({productId}) {
        let toastId = toast.loading('Deleting Product From Wishlist...')
        try {
            const options = {
                url:`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                method:'DELETE',
                headers:{
                    token,
                }
            }
            let {data} = await axios.request(options)
            if (data.status=='success') {
                setWishListInfo(data)
                setLiked((prev) => {
                    const updatedLiked = { ...prev };
                    delete updatedLiked[productId];
                    return updatedLiked;
                });

            }
        } catch (error) {
           console.log(error);
        }
        finally{
            toast.dismiss(toastId)
        }
    }




    return <WishListContext.Provider value={{ addToWishList , getWishListProducts , wishListInfo , removeFromWishList , liked , setLiked}}>
        {children}
    </WishListContext.Provider>
}