import { useFormik } from "formik"
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { object, string } from "yup";


export default function Checkout() {
    const { cartInfo } = useContext(CartContext)
    const { token } = useContext(UserContext)
    const navigate = useNavigate()
    const [paymentMethod, setPaymentMethod] = useState(null)
    // const phoneRegex = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/

    // const validationSchema = object({
    //     city: string().required('City is required').min(3, 'City must be at least 3 characters').max(25, 'Name can not be more than 25 characters'),
    //     details: string().required('City is required').min(3, 'City must be at least 3 characters').max(25, 'Name can not be more than 25 characters'),
    //     phone: string().required('Phone is required').matches(phoneRegex)
    // })

    async function createCashOrder(values) {
        let toastId = toast.loading('We are creating your order...')
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: 'POST',
                headers: {
                    token,
                },
                data: values
            }
            let { data } = await axios.request(options)
            if (data.status == 'success') {
                toast.success('Your order has been created')
                setTimeout(() => {
                    navigate('/allorders')
                }, 2000)
            }
            console.log(data);

        } catch (error) {
            console.log(error);
        }
        finally {
            toast.dismiss(toastId)
        }
    }

    async function handleOnlinePayment(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: 'POST',
                headers: {
                    token
                },
                data: values
            }
            let { data } = await axios.request(options)
            if (data.status == 'success') {
                toast.loading('redirecting you to stripe...')
                setTimeout(() => {
                    location.href = data.session.url
                }, 2000)
            }
            console.log(data);

        } catch (error) {
            console.log(error);

        }
    }

    const formik = useFormik({
        initialValues: {
            "shippingAddress": {
                "details": "",
                "phone": "",
                "city": ""
            }
        },
        onSubmit: (values)=>{
            if(paymentMethod=='cash') createCashOrder(values);
            else handleOnlinePayment(values)
        },
    })

    return <>
        <section>
            <h1 className="text-xl text-gray-600 font-semibold mb-4">Shipping Address</h1>
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
                <div className="city">
                    <input type="text" className="form-control w-full" placeholder="City" value={formik.values.shippingAddress.city} onChange={formik.handleChange} onBlur={formik.handleBlur} name="shippingAddress.city" />
                </div>
                <div className="phone">
                    <input type="tel" className="form-control w-full" placeholder="Phone" value={formik.values.shippingAddress.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} name="shippingAddress.phone" />
                </div>
                <div className="details">
                    <textarea type="text" className="form-control w-full" placeholder="Details" value={formik.values.shippingAddress.details} onChange={formik.handleChange} onBlur={formik.handleBlur} name="shippingAddress.details" />
                </div>
                <button onClick={() => {
                    setPaymentMethod('cash')
                }} type="submit" className="btn mr-3 bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-white font-semibold">Cash Order </button>
                <button onClick={() => {
                    setPaymentMethod('Online')
                }} type="submit" className="btn bg-lime-500 hover:bg-lime-600 transition-colors duration-300 text-white font-semibold">Online Payment </button>
            </form>
        </section>
    </>
}
