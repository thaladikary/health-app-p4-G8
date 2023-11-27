import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Navbar from './components/Navbar';
import UserStack from './navigation/UserStack';
import SetupStack from './navigation/SetupStack';
<<<<<<< HEAD
import LoginRegisterStack from './navigation/LoginRegisterStack'
=======
import Scanner from './screens/main/Scanner';
import AuthStack from "./navigation/AuthStack"
import RootNavigation from './navigation/RootNavigation';
>>>>>>> 40f7a03da2f0a90496e9f97cdcee3a845bb43b50

// so its gonna be login/register stack -> if true->
// check if its first time -> if true ->  show setup stack
// if false load from firebase
export default function App() {
  return (

<<<<<<< HEAD
        //<LoginRegisterStack>

        <LoginRegisterStack/>
        //<SetupStack/> // -> for balki, uncomment this one and comment out the top
        
=======
      
      // <AuthStack/>
      //  <UserStack/>
    <SafeAreaView style={styles.container}>
       <RootNavigation/>
      </SafeAreaView>
      //  <SetupStack/>  -> for balki, uncomment this one and comment out the top
>>>>>>> 40f7a03da2f0a90496e9f97cdcee3a845bb43b50

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
