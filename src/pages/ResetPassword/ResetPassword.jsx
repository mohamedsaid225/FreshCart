/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
import {  useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function ResetPassword() {
    const [error, seterror] = useState(null)
    const navigate = useNavigate()
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    const validationSchema = object({
        email: string().required('Email is required').email('Email is invalid'),
        newPassword: string().required('Password is required').matches(passwordRegex, 'Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
    })

    async function onSubmit(values) {
        const loadingToastId = toast.loading('Waiting...')
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                method: "PUT",
                data: values
            };
            let { data } = await axios.request(options);
            console.log(data);
            navigate('/login')



        }


        catch (error) {
            console.log(error);
            seterror(error.response.data.message)
        } finally {
            toast.dismiss(loadingToastId);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            newPassword: "",
        },
        validationSchema,

        onSubmit,
    });




    return (
        <>
            <h1 className="text-xl text-slate-700 font-semibold mb-5">
                <i className="fa-regular fa-circle-user mr-2"></i> Reset Password :
            </h1>
            <form className="space-y-3" onSubmit={formik.handleSubmit}>
                {error ? (
                    <div className="text-red-600 font-semibold my-2">
                        {error}
                    </div>
                ) : ''}
                <div className="email">
                    <input type="email" className="form-control w-full" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
                    {formik.errors.email && formik.touched.email && <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>}
                </div>
                <div className="password">
                    <input type="password" className="form-control w-full" placeholder="Enter your new password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="newPassword" />
                    {formik.errors.password && formik.touched.password && <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>}
                    {/* {IncorrectEmailOrPassword && <p className="text-red-500 mt-1 text-sm">*{IncorrectEmailOrPassword}</p>} */}
                </div>

                <button type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white">Login</button>


            </form>
        </>
    )
}
