import React, { useContext, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import Footer from "../Common/Footer"
import HeaderTwo from "../Common/HeaderTwo"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { Cookies, useCookies } from "react-cookie"
import { loginContext } from "../Context/MainContext"

function Login() {
  let { tokenvalue, settokenvalue } = useContext(loginContext)
  let nav = useNavigate()
  let cookies = new Cookies()
  let loginHandler = (event) => {
    event.preventDefault()
    let data = {
      email: event.target.uemail.value,
      password: event.target.upassword.value,
    }
    axios
      .post("http://localhost:5000/api/fronted/users/login", data)
      .then((result) => {
        if (result.data.status == true) {
          let token = result.data.token
          console.log(token)
          settokenvalue(token)
          localStorage.setItem("token", token)
          // cookies.set("token", result.data.token)
          toast.success("login success fully")
          nav("/")
        } else {
          toast.error(result.data.message)
        }
      })
      .catch((error) => {
        toast.error("someyjing want wrong")
      })
  }
  useEffect(() => {
    // var token = cookies.get("token")
    var token = localStorage.getItem("token")
    if (token != undefined) {
      nav("/")
    }
  }, [tokenvalue])
  return (
    <>
      <HeaderTwo />

      <section class=" ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                action="#"
                onSubmit={loginHandler}
              >
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="uemail"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="upassword"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-start">
                    <div class="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="remember"
                        class="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a href="#" class="text-sm font-medium text-white">
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  class="w-full font-medium bg-gray-300 rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign in
                </button>
                <p class="text-sm font-light text-gray-300 dark:text-gray-300">
                  Don’t have an account yet?{" "}
                  <Link
                    to={"/register"}
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  )
}

export default Login
