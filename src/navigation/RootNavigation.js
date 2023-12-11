import React, { useState, useEffect, useRef } from "react";
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
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackActions } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
} from "react-native";
import Spinner from "../components/Spinner";
const RootStack = createStackNavigator();
export default function RootNavigation() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null); // Add a state variable for user info
  const [loading, setLoading] = useState(false); // Initialize loading to false

  const getUserInfoSnapshot = async (userId) => {
    return await getDocs(collection(db, "users", userId, "userInfo"));
  };

  useEffect(() => { // Add a useEffect hook
    if (user) {
      console.log("login successful");
      const userId = user.uid;
      setLoading(true); // Set loading to true when starting to fetch data
      getUserInfoSnapshot(userId).then((querySnapShot) => {
        setUserInfo(querySnapShot); // Update the state variable when the Promise resolves
        setLoading(false); // Update the loading status
      });
    }
  }, [user]); // Re-run the effect when `user` changes

  if (loading) {
    return <Spinner/>; // Render a loading indicator while waiting for the data
  }

  if (user) {
    if (userInfo?.empty) {
      console.log("No documents found in the snapshot");
      return (
        <NavigationContainer>
          <UserContext.Provider value={user}>
            <DataProvider>
              <RootStack.Navigator initialRouteName="Setup" screenOptions={{ headerShown: false }}>
                <RootStack.Screen name="Setup" component={SetupStack} />
                <RootStack.Screen name="User" component={UserStack} />
              </RootStack.Navigator>
            </DataProvider>
          </UserContext.Provider>
        </NavigationContainer>
      );
    } else {
      console.log("Documents found in the snapshot", userInfo);
      return (
        <NavigationContainer>
          <UserContext.Provider value={user}>
            <DataProvider>
              <UserStack/>
            </DataProvider>
          </UserContext.Provider>
        </NavigationContainer>
      );
    }
  }

  return <AuthStack />;
}