/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useFormik } from "formik"
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";

export default function VerfiyCode() {
    const [error, seterror] = useState(null)
    const navigate = useNavigate()

    const validationSchema = object({
        resetCode: string().required('Code is required')
    })
    async function onSubmit(values) {
        const loadingToastId = toast.loading('Waiting...')
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                method: "POST",
                data: values
            };
            let { data } = await axios.request(options);
            console.log(data);
            if (data.status == 'Success') {
                navigate('/resetPassword')
            }
        

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
        resetCode: "",
    },
    validationSchema,

    onSubmit,
});
return <>
    <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i> Verify Code :
    </h1>
    <form className="space-y-3" onSubmit={formik.handleSubmit}>
        {error ? (
            <div className="text-red-600 font-semibold my-2">
                {error}
            </div>
        ) : ''}
        <div className="resetCode">
            <input type="phone"  className="form-control w-full" placeholder="Enter the Code" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} name="resetCode" />
            {formik.errors.resetCode && formik.touched.resetCode && <p className="text-red-500 mt-1 text-sm">*{formik.errors.resetCode}</p>}
        </div>
        <button type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white">Submit</button>

    </form>

</>
}
