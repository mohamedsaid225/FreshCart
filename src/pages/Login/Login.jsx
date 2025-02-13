/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useFormik } from "formik"
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { UserContext } from "../../context/user.context";

export default function Login() {
  let {setToken}= useContext(UserContext)
  const navigate = useNavigate()
  const [IncorrectEmailOrPassword,setIncorrectEmailOrPassword]=useState(null)

  const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required('Email is required').email('Email is invalid'),
    password: string().required('Password is required').matches(passwordRegex, 'Password should be at least eight characters, at least one upper case English letter, one lower case English letter, one number and one special character'),
  })

  async function sendDataToLogin(values) {
    const loadingToastId = toast.loading('Waiting...')
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values
      };
      let { data } = await axios.request(options);
      if (data.message == "success") {
        localStorage.setItem('token',data.token)
        setToken(data.token)
        toast.success("User Logged in successfully")
        setTimeout(() => {
          navigate('/')
        }, 2000)}


      } catch (error) {
        toast.error(error.response.data.message)
        setIncorrectEmailOrPassword(error.response.data.message)

      } finally {
        toast.dismiss(loadingToastId);
      }
    }

  const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,

      onSubmit: sendDataToLogin
    });
    return <>
      <h1 className="text-xl text-slate-700 font-semibold mb-5">
        <i className="fa-regular fa-circle-user mr-2"></i> Login :
      </h1>
      <form className="space-y-3" onSubmit={formik.handleSubmit}>
        <div className="email">
          <input type="email" className="form-control w-full" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} name="email" />
          {formik.errors.email && formik.touched.email && <p className="text-red-500 mt-1 text-sm">*{formik.errors.email}</p>}
        </div>
        <div className="password">
          <input type="password" className="form-control w-full" placeholder="Enter your password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} name="password" />
          {formik.errors.password && formik.touched.password && <p className="text-red-500 mt-1 text-sm">*{formik.errors.password}</p>}
          {IncorrectEmailOrPassword&&<p className="text-red-500 mt-1 text-sm">*{IncorrectEmailOrPassword}</p>}
        </div>
        <div className="flex justify-between items-center">
        <button type="submit" className="btn bg-primary-700 hover:bg-primary-800 text-white">Login</button>
        <Link to={'/forgetPassword'} className="text-blue-700 underline">forget password </Link>
        </div>

      </form>

    </>
  }
