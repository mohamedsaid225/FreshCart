import axios from "axios"
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import { useQuery } from "@tanstack/react-query";



export default function CategorySlider() {
    async function getCategory() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET'
        }
        return axios.request(options)

    }
    let { data,  isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategory,
        refetchOnMount: false,
        staleTime: 60 * 60 * 1000,
    })
    if (isLoading) return <Loading />;

    return <>
        <section className="my-8">
            <h2 className="mb-5 text-lg text-gray-600 font-semibold">Shop Popular Categories</h2>
            <Swiper slidesPerView={6} loop={true} autoplay={true} modules={[Autoplay]}>
                {data.data.data.map((category) => <SwiperSlide key={category._id}>
                    <div className="h-64">
                        <img className="w-full h-full object-cover" src={category.image} alt="" />
                    </div>
                    <h3 className="mt-2">{category.name}</h3>
                </SwiperSlide>)}
            </Swiper>
        </section>
    </>
}
