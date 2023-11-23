import React from "react";

export const UserContext = React.createContext()

export function useUser (){
    return React.useContext(UserContext)
}