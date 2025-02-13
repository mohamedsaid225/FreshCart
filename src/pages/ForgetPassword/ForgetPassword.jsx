/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function forgetPassword() {
    const [error, seterror] = useState(null)
    const [messg, setmessg] = useState(null)
    const navigate = useNavigate()

    const validationSchema = object({
        email: string().required('Email is required').email('Email is invalid'),
    })

    async function onSubmit(values) {
        const loadingToastId = toast.loading('Waiting...')
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
                method: "POST",
                data: values
            };
            let { data } = await axios.request(options);
            setmessg(data.message)
            setTimeout(() => {
                if (data.statusMsg == 'success') {
                    navigate('/verifyCode')
                }
            }, 2000)

        }


        catch (error) {
            seterror(error.response.data.message)
            console.log(error);
        } finally {
            toast.dismiss(loadingToastId);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema,

        onSubmit,
    });
    return <>
        <h1 className="text-xl text-slate-700 font-semibold mb-5">
            <i className="fa-regular fa-circle-user mr-2"></i> Forget Password :
        </h1>
        <form className="space-y-3" onSubmit={formik.handleSubmit}>
            {messg ? (
                <div className="text-green-500 font-semibold my-2">
                    {messg}
                </div>
            ) : ''}
            {error ? (
                <div className="text-red-600 font-semibold my-2">
                    {error}
                </div>
            ) : ''}

            <div className="email">
                <input type="email" className="form-control w-full" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
                {formik.errors.email && formik.touched.email && <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>}
            </div>
            <button type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white">Submit</button>

        </form>

    </>
}
