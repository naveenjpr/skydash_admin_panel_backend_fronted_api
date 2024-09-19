import React from "react"
import Footer from "../Common/Footer"
import HeaderTwo from "../Common/HeaderTwo"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify"
import { Cookies } from "react-cookie"

function Register() {
  let nav = useNavigate()
  let cookies = new Cookies()
  let registerWebsite = (event) => {
    event.preventDefault()
    let data = {
      name: event.target.name.value,
      email: event.target.uemail.value,
      mobile_number: event.target.mobile_number.value,
      password: event.target.upassword.value,
    }
    axios
      .post("http://localhost:5000/api/fronted/users/register", data)
      .then((result) => {
        console.log(result)
        if (result.data.status == true) {
          cookies.set("token", result.data.token)
          toast.success("register success fully")

          nav("/login")
        } else {
          toast.error(result.data.message)
        }
      })
      .catch((error) => {
        toast.error(error)
      })
  }

  return (
    <>
      <HeaderTwo />

      <section class=" ">
        <ToastContainer />
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form
                class="space-y-4 md:space-y-6"
                action="#"
                onSubmit={registerWebsite}
              >
                <div>
                  <label
                    for=""
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="yogesh saini"
                  />
                </div>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    email
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
                    for="upassword"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    mobile_number
                  </label>
                  <input
                    type="number"
                    name="mobile_number"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                        I accept the Terms and Conditions
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  class="w-full font-medium bg-gray-300 rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Create An Account
                </button>
                <p class="text-sm font-light text-gray-300 dark:text-gray-300">
                  Already have an account?{" "}
                  <Link
                    to={"/login"}
                    class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Register
