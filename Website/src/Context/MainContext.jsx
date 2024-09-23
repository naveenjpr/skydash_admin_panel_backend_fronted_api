import React, { createContext, useState } from "react"
import { Cookies } from "react-cookie"
export let loginContext = createContext()
export default function MainContext({ children }) {
  let token =localStorage.getItem('token')

  const [tokenvalue, settokenvalue] = useState(token ?? "")
  console.log(tokenvalue)
  let obj = {
    tokenvalue,
    settokenvalue,
  }
  return <loginContext.Provider value={obj}>{children}</loginContext.Provider>
}
