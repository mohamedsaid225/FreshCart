import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import Loading from '../../component/Loading/Loading'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../context/cart.context'
import ReactImageGallery from 'react-image-gallery'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from '../../component/Card/Card'
import 'swiper/css';
import useOnline from '../../hooks/useOnline'
import { Helmet } from 'react-helmet'
export default function ProductDetails() {
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const { addProductToCart } = useContext(CartContext)
    let { id } = useParams()
    async function getProductDetails() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
                method: 'GET',

            }
            let { data } = await axios.request(options)
            setProductDetails(data.data)

        } catch (error) {
            console.log(error);

        }
    }
    async function getRelatedProducts() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
                method: 'GET',
            }
            let { data } = await axios.request(options)
            setRelatedProducts(data.data)
        } catch (error) {
            console.log(error);

        }
    }
    //* intial renders + update ==> state Id
    useEffect(() => {
        getProductDetails()
    }, [id])

    //* Update ==> productDetails  

    useEffect(() => {
        if (productDetails == null) return;
        getRelatedProducts();
    }, [productDetails])

    let isOnline = useOnline()

    return (<>
        <Helmet>
            <title>Product Details</title>
        </Helmet>



        {productDetails ? (
            <>
                <Helmet>
                    <title>{productDetails.title}</title>
                </Helmet>
                <section className="grid grid-cols-12 gap-5">
                    <div className="col-span-3">
                        <ReactImageGallery showFullscreenButton={false} showPlayButton={false} showNav={false} items={productDetails.images.map((image) => {
                            return {
                                original: image,
                                thumbnail: image
                            }
                        })} />
                    </div>
                    <div className="col-span-9 space-y-4">
                        <div>
                            <h2 className='title text-2xl font-semibold text-gray-600'>
                                {productDetails.title}
                            </h2>
                            <h3 className='category text-primary-700 font-semibold'>{productDetails.category.name}</h3>
                        </div>
                        <p className='text-gray-400'>{productDetails.description}</p>
                        <div className='flex justify-between items-center'>
                            <span>{productDetails.price} L.E</span>
                            <div>
                                <i className='fa-solid fa-star mr-2 text-yellow-500'></i>
                                <span>{productDetails.ratingsAverage}</span>
                            </div>
                        </div>
                        {isOnline && <button onClick={() => {
                            addProductToCart({ productId: id })
                        }} className='btn bg-primary-600 w-full text-white font-semibold hover:bg-primary-700 transition-colors duration-300'>ADD TO CART</button>}
                    </div>
                </section>
                <section>
                    <h2 className='text-2xl font-semibold text-gray-600 my-8'>Related Products</h2>
                    {relatedProducts ?
                        <Swiper slidesPerView={6} spaceBetween={20}>
                            {relatedProducts.map((product) => <SwiperSlide key={product.id}>
                                <Card productInfo={product} />
                            </SwiperSlide>)}
                        </Swiper> : <Loading />}
                </section>
            </>
        ) :
            (<Loading />)}


    </>
    )
}
