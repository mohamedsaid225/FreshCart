import axios from "axios";
import Card from "../../component/Card/Card";
import Loading from "../../component/Loading/Loading";
import HomeSlider from "../../component/HomeSlider/HomeSlider";
import CategorySlider from "../../component/categorySlider/categorySlider";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  async function getProducts() {
    const options = {
      url: 'https://ecommerce.routemisr.com/api/v1/products',
      method: 'GET'
    }
    return axios.request(options)
  }

  let { data, isLoading } = useQuery({
    queryKey: ['allproducts'],
    queryFn: getProducts,
    staleTime: 10000,
    refetchOnMount: false
  });

  if (isLoading) return <Loading />;
  return <>
    <Helmet>
      <title>Home Page</title>
      <meta name="description" content="FreshCart| Home Page , ...." />
      <meta name="keywords" content='E-commerce, FreshCart' />
    </Helmet>
    <HomeSlider />
    <CategorySlider />
    <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {data.data.data.map((product) => <Card productInfo={product} key={product.id} />)}
    </div>

  </>


}
