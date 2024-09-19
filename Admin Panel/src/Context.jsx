import React, { createContext, useEffect, useState } from "react"
import { data } from "./Common/MenuData"
let mainContext = createContext()
function Context(props) {
  let mydata = data
  let [changemenu, setchangeMenu] = useState(false)
  let [menu, setMenu] = useState(mydata[0].id)

  const [loginstatus, setloginstatus] = useState(false)
  useEffect(() => {
    setMenu(0)
  }, [])

  return (
    <mainContext.Provider
      value={{
        changemenu,
        setchangeMenu,
        menu,
        setMenu,
        mydata,
        loginstatus,
        setloginstatus,
      }}
    >
      {props.children}
    </mainContext.Provider>
  )
}

export default Context

export { mainContext }
