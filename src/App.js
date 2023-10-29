import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navbar from './components/Navbar';
import UserStack from './navigation/UserStack';

// so its gonna be login/register stack -> if true->
// check if its first time -> if true ->  show setup stack
// if false load from firebase
export default function App() {
  return (
    <UserStack/>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
