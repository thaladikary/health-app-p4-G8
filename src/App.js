import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import RootNavigation from "./navigation/RootNavigation";
import SetupStack from "./navigation/SetupStack";
import AuthStack from "./navigation/AuthStack";
import CalculateBMR from "./screens/setup/CalculateBMR";
import { DataProvider } from "./context/DataContext";

// so its gonna be login/register stack -> if true->
// check if its first time -> if true ->  show setup stack
// if false load from firebase
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <DataProvider>
        <CalculateBMR />

        <SetupStack></SetupStack>
      </DataProvider>
      {/*           
           <RootNavigation/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
