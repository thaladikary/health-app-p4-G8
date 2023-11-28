import { useState } from 'react';
import { View, Text, StyleSheet,Image, Dimensions, StatusBar, KeyboardAvoidingView, TouchableOpacity, TextInput, Keyboard, FlatList, ImageBackground} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function FirstPage({ navigation }) {
    return (

        <ImageBackground
        source={require('../../assets/Setup-pages/white-background-2.jpg')}
        style={styles.backgroundImage}
        >
            <View style={styles.container}>
            
                <Image source={require('../../assets/Setup-pages/human-fruit-gym-WHITE.jpg')} style={styles.logo} />
                <Text style={styles.appName}>FITNESS CLUB</Text>

                <Text style={styles.middleText}>BE STRONGER </Text>
                <Text style={styles.middleText}> BE HEALTHIER </Text>
                {/* <Text style={styles.middleText}> BE SMARTER, </Text>*/}

  
                <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Login')}>
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                style={styles.button} 
                onPress={() => navigation.navigate('Register')}>
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

    middleText: {
        //padding: 30,
        fontSize: 28,
        textAlign: 'left',
        fontWeight: 'bold',
        marginBottom: 50,
        margin: 10,
    
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


    logo: {
        width: 150,
        height: 80,
        resizeMode: 'contain',
        //margin: 1,
        borderRadius: 50,
        marginTop: 100,
      },
    
    
      appName: {
        fontSize: 40,
        margin: 1,
        //marginVertical: 10,
        fontFamily: 'Georgia',
        marginBottom: 70,
      },
  });