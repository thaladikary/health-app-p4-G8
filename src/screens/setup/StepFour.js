import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function StepFour({ navigation, route }){

    const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };


    return(
        <KeyboardAvoidingView style={styles.container} behavior='padding'>

            <View style={styles.steText}>
                <View style={styles.progressLine} />
                <View style={styles.progressLine} />
                <View style={styles.progressLine} />
            </View>

            <Text style={styles.steTextNumber}>Step 4 of 8</Text>
            <Text style={styles.mainLabel}>Select your Gender</Text>


            <View style={styles.genderOptionsContainer}>



            <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'male' && { backgroundColor: 'grey' },
          ]}
          onPress={() => handleGenderSelect('male')}
        >

        <Image source={require('../../assets/Setup-pages/man_gym.png')} style={styles.genderImage} />


          <Text style={styles.genderOptionText}></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.genderOption,
            selectedGender === 'female' && { backgroundColor: 'grey' },
          ]}
          onPress={() => handleGenderSelect('female')}
        >


        <Image source={require('../../assets/Setup-pages/woman_gym.png')} style={styles.genderImage} />




          <Text style={styles.genderOptionText}></Text>
        </TouchableOpacity>
        </View>





        <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepFive')}
                // onPress={handleNextStep}
            >
                <Text style={styles.previousButtonText}>Next Step</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepThree')}
            >
                <Text style={styles.previousButtonText}>Previous Step</Text>
            </TouchableOpacity>


        
        </KeyboardAvoidingView>







    ) 
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },

    mainLabel: {
        fontSize: 30,
        marginTop: 30,
        position: 'absolute',
        top: 130,
        fontWeight: 'bold',
    },



    steText: {
        flexDirection: 'row',
        fontSize: 18,
        marginBottom: 20,
        position: 'absolute',
        top: 86,
        color: 'dodgerblue',
        width: '85%',
        fontFamily: 'Georgia',
        fontWeight: '500',

        flexDirection: 'row', // Use row direction for horizontal layout
        alignItems: 'center', // Align items in the center
        
    },

    progressLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'dodgerblue',
    },

    steTextNumber: {
        fontSize: 18,
        marginLeft: 10, // Adjust the spacing between the lines and the number
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        top: 41.5,
        position: 'absolute',
    },



    genderOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '85%',
        marginTop: 20,
        
      },
    
      genderOption: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10,
        margin: 5,
        marginBottom: 30,
        borderRadius: 40,
      },
    
      genderOptionText: {
        fontSize: 14,  // Adjusted font size
        textAlign: 'center',
        color: 'black',
      },




      previousButton: {
        backgroundColor: "deepskyblue",
        margin: 5,
        //marginTop: 30, 
        padding: 10,
        borderRadius: 30,
        width: '75%',
    },

    previousButtonText: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',

    },


    genderImage: {
        width: 100, // Adjust the width as needed
        height: 100, // Adjust the height as needed
        marginBottom: 0, // Adjust the margin as needed
        alignSelf: 'center',

      },

    });