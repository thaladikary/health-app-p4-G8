import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "../../config/firebase"



export default function LoginPage ()  {
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState("testest");

   async function handleLogin (){
    if (email !== "" && password !== ""){
      console.log("test")
    try{
      await signInWithEmailAndPassword(auth,email,password)
    } catch (e) {
      console.log('error')
    }

  };
}
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <Text style={styles.label}>Password:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        
      />
      <Button title="Login" onPress={handleLogin} />

      <Button title="Sign in with Google" />

    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 20,
  },
});




