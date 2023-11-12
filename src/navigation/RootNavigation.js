import React from "react"
import UserStack from "./UserStack"
import AuthStack from "./AuthStack"
import{useAuth} from "../hooks/useAuth"


export default function RootNavigation() {
    const { user } = useAuth();
    console.log(user)
    if(user){
        console.log("login successful")
        return <UserStack/>
    }
    return(
        <AuthStack/>
    )

}