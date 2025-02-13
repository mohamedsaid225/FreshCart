import sliderImg1 from '../../assets/images/slider-image-1.jpeg'
import sliderImg2 from '../../assets/images/slider-image-2.jpeg'
import sliderImg3 from '../../assets/images/slider-image-3.jpeg'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function HomeSlider() {
    return <>
        <section className="grid grid-cols-12 mb-8">
            <div className="col-span-8">
                <Swiper slidesPerView={1} loop={true} autoplay={true} modules={[Autoplay]}>
                <SwiperSlide>
                    <img className='w-full h-full object-cover' src={sliderImg3} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-full object-cover' src={sliderImg3} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='w-full h-full object-cover' src={sliderImg3} alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
        <div className="col-span-4">
            <img className='w-full' src={sliderImg1} alt="" />
            <img className='w-full' src={sliderImg2} alt="" />
        </div>
    </section >
    </>
}
