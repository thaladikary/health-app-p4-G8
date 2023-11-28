import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard, FlatList, ImageBackground} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function Register({ navigation }){


    const [firstName, setFirstName, lastName, setLastName, email, setEmail, age, setAge, password, setPassword ] = useState('');

    return(
        <ImageBackground
        source={require('../../assets/Setup-pages/white-background-2.jpg')}
        style={styles.backgroundImage}
        >

    
        <View style={styles.container} behavior="padding">
          <StatusBar barStyle="dark-content" />

            {/* APP logo here */}
          <Image source={require('../../assets/Setup-pages/human-fruit-gym-BLACK.jpg')} style={styles.logo} />

            {/* ALL the functions need to be set up according to the logic  */}
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              onChangeText={(text) => setFirstName(text)}
              value={email}
            />
            <TextInput
              style={styles.input}
    
              placeholder="Last Name"
              secureTextEntry={true}
              onChangeText={(text) => setLastName(text)}
              value={password}
            />
            <TextInput
              style={styles.input}
    
              placeholder="email"
              secureTextEntry={true}
              onChangeText={(text) => setEmail(text)}
              value={password}
            />
            <TextInput
              style={styles.input}
    
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />


            {/* MIGHT HAVE TO DO SOMETHING HERE for comfirm password*/}
            <TextInput
              style={styles.input}
    
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />

            <TextInput
              style={styles.input}
    
              placeholder="Age"
              secureTextEntry={true}
              onChangeText={(text) => setAge(text)}
              value={password}
            />
          </View>

            {/* TO DO: TO set it up to the desired page, now it just returns to the first page */}

            <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
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



  appName: {
    fontSize: 40,
    margin: 1,
    fontFamily: 'Georgia',
    marginBottom: 1,
  },
  
  logo: {
    width: 150,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 50,
    marginTop: 100,
  },

   
    inputContainer: {
        width: '75%',
       marginVertical: 5,
      },
  
  
      input: {
        height: 50,
        borderColor: 'white',
        borderWidth: 3,
        marginVertical: -0.5, 
        padding: 15,
        marginTop: 6.5,
        borderRadius: 5,
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
  });