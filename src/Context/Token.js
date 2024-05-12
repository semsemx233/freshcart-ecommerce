import { createContext, useState } from "react";


export let TokenContext = createContext()

export default function TokenContextProvider(props) {

    let [token, setToken] = useState(null)

    return <TokenContext.Provider value={{token, setToken}}>
        {props.children}
    </TokenContext.Provider>
}