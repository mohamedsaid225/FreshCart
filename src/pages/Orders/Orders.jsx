import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/user.context';
import { jwtDecode } from 'jwt-decode';
import Loading from '../../component/Loading/Loading';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Orders() {
    const { token } = useContext(UserContext)
    const [orders, setorders] = useState(null)
    let { id } = jwtDecode(token)


    async function getUserOrders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: 'GET',
            }
            let { data } = await axios.request(options)
            setorders(data)

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        getUserOrders()
    }, [])

    return <>
        <Helmet>
            <title>Orders Page</title>
        </Helmet>




        {orders ? <section className='space-y-4'>
            {orders.map((order) => <div key={order.id} className="order p-2 border-2 border-gray-500 border-opacity-25 rounded-lg ">
                <header className="flex justify-between items-center">
                    <div>
                        <h2 className="text-gray-500">Order ID</h2>
                        <span className="text-lg font-semibold text-gray-700">#{order.id}</span>
                    </div>
                    <div className="space-x-2">
                        {order.isPaid ? <span className="font-cairo inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full">
                            تم الدفع
                        </span> : <span className="font-cairo inline-block px-3 py-1 bg-red-500 text-white font-semibold rounded-full">
                            غير مدفوع
                        </span>}


                        {order.isDelivered ? <span className="font-cairo inline-block px-3 py-1 bg-lime-500 text-white font-semibold rounded-full">
                            تم الإستلام
                        </span> : <span className="font-cairo inline-block px-3 py-1 bg-blue-500 text-white font-semibold rounded-full">
                            قيد التوصيل
                        </span>}
                    </div>
                </header>
                <div className='mt-4 grid md:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6'>
                    {order.cartItems.map((product) => <div key={product._id} className="product-item overflow-hidden border-2 border-gray-400 border-opacity-30 p-4 rounded-lg">
                        <img className='w-full' src={product.product.imageCover} alt="" />
                        <div className='p-2'>
                            <h3 className='text-lg font-semibold line-clamp-2'><Link to={`/productDetails/${product.product.id}`}>{product.product.title}</Link></h3>
                            <div className='flex justify-between items-center mt-2'>
                                <p className='font-semibold'><span className='font-bold underline mr-1'>Count :</span>{product.count}</p>
                                <p className='font-semibold'>
                                    <span className='text-primary-600 font-bold mr-1'>
                                        {product.price}
                                    </span>L.E
                                </p>
                            </div>
                        </div>
                    </div>)}
                </div>
                <p className='text-lg mt-4'>Your Total Order Price is <span className='mx-1 font-bold text-primary-600'>{order.totalOrderPrice}</span>L.E</p>
            </div>)}
        </section> : <Loading />}
    </>
}
