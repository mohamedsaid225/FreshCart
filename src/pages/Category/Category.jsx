import axios from "axios";
import CategoryItem from "../../component/CategoryItem.jsx/CategoryItem";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../component/Loading/Loading";
import { Helmet } from "react-helmet";

export default function Category() {
     function getAllCategory() {
        const options = {
            url: 'https://ecommerce.routemisr.com/api/v1/categories',
            method: 'GET'
        }
        return axios.request(options)
    }

    let { data, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: getAllCategory,
        refetchOnMount: true
    });
    if (isLoading) return <Loading />;
    return <>
        <Helmet>
            <title>Category Page</title>
            <meta name="description" content="FreshCart| Category Page , ...." />
            <meta name="keywords" content='E-commerce, FreshCart' />
        </Helmet>
        <header className="text-center font-bold text-4xl text-primary-700 mb-6">All Categories</header>
        <div className="grid grid-cols-12 gap-4">
           {data.data.data.map((product)=><CategoryItem productInfo={product} key={product._id}/>)} 
        </div>
    </>
}
