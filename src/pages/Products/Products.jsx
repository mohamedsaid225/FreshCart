/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../component/Card/Card";
import Loading from "../../component/Loading/Loading";
import { Helmet } from "react-helmet";
// import toast from "react-hot-toast";



export default function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    // async function getAllProducts(page, searchTerm) {
    //     let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}`;

    //     if (searchTerm) {
    //         // جلب الـ IDs فقط عند البحث
    //         url = `https://ecommerce.routemisr.com/api/v1/products?fields=${searchTerm}`;

    //         const { data } = await axios.get(url);
    //         const productIds = data.data.map(product => product.id); // استخراج IDs
    //         console.log(productIds);


    //         // إذا لم يتم العثور على نتائج
    //         if (productIds.length === 0) return [];

    //         // جلب تفاصيل المنتجات باستخدام API آخر
    //         async function fetchProductDetails(id) {
    //             try {
    //                 const response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    //                 const data = await response.json();
    //                 console.log(data); // هنا يمكنك عرض البيانات أو تخزينها
    //             } catch (error) {
    //                 console.error(`Error fetching product ${id}:`, error);
    //             }
    //         };
    //         async function fetchAllProductsParallel() {
    //             const promises = productIds.map(id => fetchProductDetails(id));
    //             const results = await Promise.all(promises);
    //             console.log(results);
    //         };



    //         // const detailsUrl = `https://ecommerce.routemisr.com/api/v1/products/${productIds}`;
    //         // const detailsResponse = await axios.get(detailsUrl);

    //         // return detailsResponse.data; // إرجاع بيانات المنتجات الكاملة
    //     }

    //     // الحالة العادية بدون بحث
    //     const { data } = await axios.get(url);
    //     return data.data;
    // }
    // useEffect(() => {
    //     fetchAllProductsParallel();
    // }, [])
    // useEffect(() => {
    //     const handler = setTimeout(() => {
    //         setDebouncedSearch(searchTerm);
    //     }, 1000);

    //     return () => clearTimeout(handler);
    // }, [searchTerm]);

    // const { data: products, error, isLoading } = useQuery({
    //     queryKey: ["products", currentPage, debouncedSearch],
    //     queryFn: () => getAllProducts(currentPage, debouncedSearch),
    //     keepPreviousData: true,
    //     refetchOnMount: false
    // });

    // if (isLoading) return <Loading />;
    // console.log(error);

    // async function getAllProducts(page, searchTerm) {
    //     let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}`;

    //     if (searchTerm) {
    //         url = `https://ecommerce.routemisr.com/api/v1/products?title=${searchTerm}`;
    //         try {
    //             const { data } = await axios.get(url);
    //             const productsId = data.data.map(product => product.id); // استخراج الـ IDs
    //             return productsId; // إرجاع IDs
    //         } catch (error) {
    //             console.error("Error fetching product IDs:", error);
    //             return [];
    //         }
    //     }
    //     let { data } = await axios.get(url);
    //     return data.data;
    // }
    async function getAllProducts(page, searchTerm) {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products?page=${page}`,
            method: 'GET'
        }
        if (searchTerm) {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/products?title=${searchTerm.split(" ")
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                    }`,
                method: 'GET'
            }
            let { data } = await axios.request(options)
            console.log(data.data);

            return data.data
        }
        let { data } = await axios.request(options)
        return data.data

    }
    // دالة لجلب تفاصيل منتج واحد
    // async function fetchProductDetails(id) {
    //     try {
    //         const options = {
    //             url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
    //             method: 'GET',
    //         }
    //         let { data } = await axios.request(options);
    //         return data.data; // إرجاع البيانات بدلًا من `console.log`
    //     } catch (error) {
    //         console.error(`Error fetching product ${id}:`, error);
    //         return null;
    //     }
    // }

    // // دالة لجلب كل المنتجات بالتوازي
    // async function fetchAllProductsParallel(productsId) {        
    //     try {
    //         const promises = productsId.map(id => fetchProductDetails(id));
    //         const results = await Promise.all(promises);
    //         return results;
    //     } catch (error) {
    //         console.error("Error fetching all products:", error);
    //         return [];
    //     }
    // }
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 2000);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    // const { data, error, isLoading } = useQuery({
    //     queryKey: ["products", currentPage, debouncedSearch],
    //     queryFn: async () => {
    //         getAllProducts(currentPage, debouncedSearch)
    //         const ids = await getAllProducts(currentPage, debouncedSearch);
    //         return fetchAllProductsParallel(ids); // جلب التفاصيل مباشرة
    //     },
    //     keepPreviousData: true,
    //     refetchOnMount: false,
    // });
    const { data, error, isLoading } = useQuery({
        queryKey: ["products", currentPage, debouncedSearch],
        queryFn: async () => {
            // إذا لم يكن هناك بحث، اجلب كل المنتجات مباشرة
            if (!debouncedSearch) {
                return getAllProducts(currentPage); // البيانات تأتي مباشرة بدون الحاجة لجلب تفاصيل المنتجات
            }
            // const ids = await getAllProducts(currentPage, debouncedSearch);
            // return fetchAllProductsParallel(ids);
            return getAllProducts(currentPage, debouncedSearch)
        },
        keepPreviousData: true,
        refetchOnMount: false,
    });

    if (isLoading) return <Loading />;
    if (error) console.log(error);

    return <>
        <Helmet>
            <title>Products Page</title>
            <meta name="description" content="FreshCart| Products Page , ...." />
            <meta name="keywords" content='E-commerce, FreshCart' />
        </Helmet>
        <section className="space-y-6">
            <header className="text-center font-bold text-4xl text-primary-700 mb-6">
                All Products
            </header>

            <input type="text" className="form-control w-full" placeholder="Search..." value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />

            <div className="grid sm:gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                {data.length > 0 ? (
                    data.map(product => (
                        <Card productInfo={product} key={product.id} />
                    ))
                ) : (
                    <p className=" font-semibold mt-6">No products found.</p>
                )}


            </div>

            {/* Pagination (Hidden when searching) */}
            {!debouncedSearch && (
                <div className="pagination flex justify-center items-center gap-4 mt-4">
                    <button
                        className="w-20 h-10 rounded-full bg-gray-300 font-bold"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>

                    <span className="font-bold text-lg">Page {currentPage}</span>

                    <button
                        className="w-20 h-10 rounded-full bg-gray-300 font-bold"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            )}

        </section>
    </>


};

{/* import { useEffect, useState } from "react";
import axios from "axios";

function Products({ searchTerm }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    // ✅ دالة لجلب المنتجات، سواء كل المنتجات أو البحث
    async function getAllProducts(page, searchTerm) {
        let url = `https://ecommerce.routemisr.com/api/v1/products?page=${page}`;
        
        if (searchTerm) {
            url = `https://ecommerce.routemisr.com/api/v1/products?fields=${searchTerm}`;
        }

        setLoading(true);
        try {
            const { data } = await axios.get(url);
            const products = data.data;

            // ✅ إذا كان البحث، جلب تفاصيل كل منتج عبر ID
            if (searchTerm) {
                const detailedProducts = await Promise.all(products.map(async (product) => {
                    return await getProductDetails(product.id);
                }));
                setProducts(detailedProducts);
            } else {
                setProducts(products);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    }

    // ✅ دالة لجلب تفاصيل المنتج باستخدام ID
    async function getProductDetails(productId) {
        const url = `https://ecommerce.routemisr.com/api/v1/products/${productId}`;
        try {
            const { data } = await axios.get(url);
            return data.data;
        } catch (error) {
            console.error(`Error fetching product details for ID ${productId}:`, error);
            return null;
        }
    }

    // ✅ استخدام useEffect لجلب البيانات عند تحميل الصفحة أو البحث
    useEffect(() => {
        getAllProducts(page, searchTerm);
    }, [page, searchTerm]);

    return (
        <div>
            <h2>Products List</h2>
            {loading ? <p>Loading...</p> : (
                <div className="product-grid">
                    {products.length > 0 ? products.map((product) => (
                        <div key={product.id} className="product-card">
                            <img src={product.imageCover} alt={product.title} />
                            <h3>{product.title}</h3>
                            <p>{product.description}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                    )) : <p>No products found</p>}
                </div>
            )}
            <button onClick={() => setPage(page + 1)}>Next Page</button>
        </div>
    );
}

export default Products;
*/}

