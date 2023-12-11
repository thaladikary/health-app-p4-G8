import React from "react";
import UserStack from "./UserStack";
import AuthStack from "./AuthStack";
import { useAuth } from "../hooks/useAuth";
import { UserContext } from "../context/userContext";
import {
  doc,
  getDoc,
  collection,
  query,
  getDocs,
  where,
} from "@firebase/firestore";
import { db } from "../config/firebase";
import SetupStack from "./SetupStack";
import { DataProvider } from "../context/DataContext";
import CalculateBMR from "../screens/setup/CalculateBMR";
export default function RootNavigation() {
  const { user } = useAuth();

  // make sure to not include everything later in this user log because it contains api key
  const getUserInfoSnapshot = async (userId) => {
    return await getDocs(collection(db, "users", userId, "userInfo"));
  };

  if (user) {
    console.log("login successful");
    const userId = user.uid;
    const userInfoSnapShot = getUserInfoSnapshot(userId);

    return (
      <UserContext.Provider value={user}>
        <DataProvider>
          <CalculateBMR />

          <SetupStack></SetupStack>
        </DataProvider>
        {/* <UserStack /> */}
      </UserContext.Provider>
    );
  }
  return <AuthStack />;
}
