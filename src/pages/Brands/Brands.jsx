import axios from "axios";
import BrandsItem from "../../component/BrandsItem/BrandsItem";
import Loading from "../../component/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

export default function Brands() {
    function getAllBrands() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/brands`,
            method: 'GET',
        }
        return axios.request(options)
    }
    let { data, isLoading } = useQuery({
        queryKey: ['Brands'],
        queryFn: getAllBrands,
    });
    if (isLoading) return <Loading />
    console.log(data);

    return <>
        <Helmet>
            <title>Brands Page</title>
            <meta name="description" content="FreshCart| Brands Page , ...." />
            <meta name="keywords" content='E-commerce, FreshCart' />
        </Helmet>
        <header className="text-center font-bold text-4xl text-primary-700 mb-6">All Brands</header>
        <div className="grid grid-cols-12 gap-4">
            {data.data.data.map((product) => <BrandsItem key={product._id} productInfo={product} />
            )}
        </div>

    </>
}
