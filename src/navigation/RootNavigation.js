import React from "react"
import UserStack from "./UserStack"
import AuthStack from "./AuthStack"
import{useAuth} from "../hooks/useAuth"
import {UserContext} from "../context/userContext"

export default function RootNavigation() {
    const { user } = useAuth();
    console.log(user)
    // make sure to not include everything later in this user log because it contains api key
    if(user){
        console.log("login successful")
        return (
            <UserContext.Provider value={user}>
                <UserStack/>
            </UserContext.Provider>
        )
    }
    return(
        <AuthStack/>
    )

}