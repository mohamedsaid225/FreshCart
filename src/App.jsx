import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound/NotFound";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import VerfiyCode from "./pages/VerfiyCode/VerfiyCode";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ProtectedRoute from "./component/ProtectedRoute/ProtectedRoute";
import GuestRoute from "./component/GuestRoute/GuestRoute";
import UserProvider from "./context/user.context.jsx";
import CartProvider from "./context/cart.context.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Offline from "./component/Offline/Offline.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Wishlist from "./pages/Wishlist/Wishlist.jsx";
import WishListProvider from "./context/wishlist.context.jsx";
import Category from "./pages/Category/Category.jsx";
import Brands from "./pages/Brands/Brands.jsx";
import Products from "./pages/Products/Products.jsx";



export default function App() {
  const router = createBrowserRouter([
    {
      path: "/", element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>), children: [
          { index: true, element: <Home /> },
          { path: 'cart', element: <Cart /> },
          { path: 'productDetails/:id', element: <ProductDetails /> },
          { path: 'checkout', element: <Checkout /> },
          { path: '*', element: <NotFound /> },
          { path: 'allorders', element: <Orders /> },
          { path: 'wishlist', element: <Wishlist /> },
          {path:'category',element:<Category/>},
          {path:'brands',element:<Brands/>},
          {path:'products',element:<Products/>},
        ]
    },
    {
      path: '/',
      element: (<GuestRoute>
        <Layout />
      </GuestRoute>),
      children: [
        { path: 'signup', element: <Signup /> },
        { path: 'login', element: <Login /> },
        { path: 'forgetPassword', element: <ForgetPassword /> },
        { path: 'verifyCode', element: <VerfiyCode /> },
        { path: 'resetPassword', element: <ResetPassword /> }
      ]
    },

  ])


  const myClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={myClient}>
        <UserProvider>
          <CartProvider>
            <WishListProvider>
              <RouterProvider router={router} />
            </WishListProvider>
          </CartProvider>
        </UserProvider>
        <Toaster />

        <Offline>
          <div className="p-4 fixed right-8 bottom-8 z-50 rounded-lg shadow bg-gray-200 text-gray-600 font-semibold">
            <i className="fa-solid fa-wifi mr-2"></i>
            <span>Check Your Internet Connection</span>
          </div>
        </Offline>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}
