import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard, FlatList, ImageBackground} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default function Login({ navigation }){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
    // Implement your login logic here
    // just going to use navgation here
    console.log('Login pressed');
    };

    //TO DO : make it go to Register with navigation
    const handleRegister = () => {
    // Implement your registration logic here
    console.log('Register pressed');
    };

      return (

        <ImageBackground
        source={require('../../assets/Setup-pages/white-background-2.jpg')}
        style={styles.backgroundImage}
        >

    
        <View style={styles.container} behavior="padding">
          <StatusBar barStyle="dark-content" />

          <Image source={require('../../assets/Setup-pages/human-fruit-gym-BLACK.jpg')} style={styles.logo} />
          <Text style={styles.appName}>FITNESS CLUB</Text>
          <Text style={styles.middleText}>Welcome Back!</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="********"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>

            {/* LOGIN BUTTON */}
        <TouchableOpacity style={styles.button} 
        onPress={() => navigation.navigate('FirstPage')} >
            <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    
    
  );
}

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    
  },

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },


  logo: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    marginTop: 100,
  },


  appName: {
    fontSize: 40,
    margin: 1,
    fontFamily: 'Georgia',
    marginBottom: 50,
  },


  instructionsText: {
    fontSize: 14,
    textAlign: 'left',
  },

  inputContainer: {
      width: '75%',
      marginVertical: 25,
    },


    input: {
      height: 50,
      borderColor: 'white',
      borderWidth: 3,
      marginVertical: -0.5, 
      padding: 15,
      borderRadius: 5,
      marginTop: 6.5,
    },

   
    button: {
      backgroundColor: 'deepskyblue',
      padding: 12,
      marginVertical: 3, 
      borderRadius: 25,
      width: '60%',
      alignItems: 'center',
    },


    buttonText: {
      color: 'black',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    middleText: {
      fontSize: 28,
      textAlign: 'left',
      fontWeight: 'bold',
      marginBottom: 15,
      margin: 10,
  
  },
    
    
});