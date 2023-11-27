import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Navbar from './components/Navbar';
import UserStack from './navigation/UserStack';
import SetupStack from './navigation/SetupStack';
import LoginRegisterStack from './navigation/LoginRegisterStack';


// so its gonna be login/register stack -> if true->
// check if its first time -> if true ->  show setup stack
// if false load from firebase
export default function App() {
  return (


        //<LoginRegisterStack>

        <LoginRegisterStack/>
        //<SetupStack/> // -> for balki, uncomment this one and comment out the top
        
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
