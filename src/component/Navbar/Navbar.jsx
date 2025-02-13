import { Link, NavLink } from 'react-router-dom'
import freshCartLogo from '../../assets/images/freshcart-logo.svg'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/user.context'
import { CartContext } from '../../context/cart.context'
export default function Navbar() {
    let { token, logOut } = useContext(UserContext)
    let { cartInfo , getCartProducts } = useContext(CartContext)
    useEffect(()=>{
        getCartProducts()
    },[])
    return (
        <nav className='navbar py-3 bg-slate-100 shadow-sm fixed top-0 left-0 right-0 z-50 shadow'>
            <div className="container flex items-center gap-12">
                <a to="">
                    <img src={freshCartLogo} alt="FreshCart Logo" />
                </a>
                {token && <>
                    <ul className='flex items-center gap-5'>
                        <li><NavLink className={({ isActive }) => {
                            return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                        }} to="/">Home</NavLink></li>
                        <li><NavLink className={({ isActive }) => {
                            return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                        }} to="/products">Products</NavLink></li>
                        <li><NavLink className={({ isActive }) => {
                            return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                        }} to="/category">Categories</NavLink></li>
                        <li><NavLink className={({ isActive }) => {
                            return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                        }} to="/brands">Brands</NavLink></li>
                        <li><NavLink className={({ isActive }) => {
                            return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                        }} to="/allorders">Orders</NavLink></li>
                        <li><NavLink className={({ isActive }) => {
                            return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                        }} to="/wishlist">Wishlist</NavLink></li>
                        
                        
                    </ul>

                    <Link to='/cart' className='cart ml-auto cursor-pointer relative'>
                        <i className='fa-solid fa-cart-shopping text-lg'></i>
                        <div className="cart-counter h-5 w-5 rounded-full flex justify-center items-center bg-primary-800 text-white absolute right-0 top-0 translate-x-1/2 -translate-y-1/2">
                            {cartInfo == null ? <i className='fa-solid fa-spinner fa-spin'></i> : <span className='text-sm font-semibold'>{cartInfo.numOfCartItems}</span>}
                        </div>
                    </Link>
                </>}


                <ul className={`flex items-center gap-5 ${!token && "ms-auto"}`}>
                    <li>
                        <a href="https://instagram.com" target='_blank'>
                            <i className='fa-brands fa-instagram'></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://facebook.com" target='_blank'>
                            <i className='fa-brands fa-facebook'></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://tiktok.com" target='_blank'>
                            <i className='fa-brands fa-tiktok'></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://twitter.com" target='_blank'>
                            <i className='fa-brands fa-twitter'></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://linkedin.com" target='_blank'>
                            <i className='fa-brands fa-linkedin'></i>
                        </a>
                    </li>
                    <li>
                        <a href="https://youtube.com" target='_blank'>
                            <i className='fa-brands fa-youtube'></i>
                        </a>
                    </li>
                </ul>

                <ul className='flex items-center gap-5'>
                    {!token && <>
                        <li>
                            <NavLink className={({ isActive }) => {
                                return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                            }} to="/signup">Signup</NavLink>
                        </li>
                        <li>
                            <NavLink className={({ isActive }) => {
                                return `relative before:absolute before:w-0 before:h-0.5 hover:before:w-full before:transition-[width] before:duration-300 before:bg-primary-800 before:left-0 before:-bottom-1 ${isActive ? 'before:!w-full font-semibold ' : ""}`
                            }} to="/login">Login</NavLink>
                        </li>
                    </>}
                    {token && <>
                        <li onClick={logOut}>
                            <NavLink to=""><i className='fa-solid fa-right-from-bracket text-lg'></i></NavLink>
                        </li>
                    </>}

                </ul>
            </div>
        </nav>
    )
}
