import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import RootNavigation from './navigation/RootNavigation';
import SetupStack from './navigation/SetupStack';


// so its gonna be login/register stack -> if true->
// check if its first time -> if true ->  show setup stack
// if false load from firebase
export default function App() {
  return (

        <SafeAreaView style={styles.container}>

          <SetupStack></SetupStack>
           {/* <RootNavigation/> */}
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
