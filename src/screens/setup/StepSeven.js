import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function StepSeven({ navigation }){

    const [inputGoalValue, setInputGoalValue] = useState('0');

    const currentStep = 7;


    return (
        <View style={styles.container} behavior='padding'>
            <View style={styles.progressContainer}>
                {[...Array(8)].map((_, index) => (
                <View
                key={index}
                style={[
                    styles.progressLine,
                    index < currentStep - 1 && styles.filledLine,
                    index === currentStep - 1 && styles.currentLine,
                ]}
                />
                ))}
            </View>
          <Text style={styles.steTextNumber}>Step 7 of 8</Text>


          <View style={styles.mainLabelContainer}>
                <Image source={require('../../assets/Setup-pages/target.png')} style={styles.mainLabelIcon}/>
                <Text style={styles.mainLabel}>What's the weight goal</Text>
            </View>


          <Text style={styles.explanationText}>Select the amount you want to Gain/Reduce</Text>

          <TextInput
                style={styles.inputGoalValue}
                placeholder="12 kg"
                keyboardType="numeric"
                value={inputGoalValue}
                onChangeText={(text) => setInputGoalValue(text)}
                onFocus={() => {}}
                // onBlur={Keyboard.dismiss}
            ></TextInput>


          <View
          style={styles.buttonContainer}>

          <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepEight')}
            >
                <Text style={styles.previousButtonText}>Next Step</Text>
            </TouchableOpacity> 

                
            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepSix')}
                // ,{inputAge}
            >
                <Text style={styles.previousButtonText}>Previous Step</Text>
            </TouchableOpacity> 

          </View>

          </View>
    )



    
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        margin: 20,
        position: 'relative',
    },

    

    mainLabel: {
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold',
        // top: -120,
      },


    mainLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 110,
      },
    
      mainLabelIcon: {
        width: 60,
        height: 60,
        marginRight: 5,
        resizeMode: 'contain',
         top: 10,
      },



    progressContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        top: 70,
        position: 'absolute',
      },
    
      progressLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
      },
    
      filledLine: {
        backgroundColor: 'dodgerblue',
      },
    
      currentLine: {
        backgroundColor: 'dodgerblue',
      },

    steTextNumber: {
        fontSize: 18,
        marginLeft: 10, // Adjust the spacing between the lines and the number
        color: 'dodgerblue',
        fontWeight: '500',
        top: 41.5,
        position: 'absolute',
    },

    explanationText: {
        fontSize: 10,
        fontWeight: '300',
        textAlign: 'left',
        top: 240,
    },


    inputGoalValue: {
        fontSize: 26,
        textAlign: 'center',
        borderBottomWidth: 1,
        width: '70%',
        //marginVertical: 200,
        margin: 10,
        // top: -10,
    },

    
    previousButton: {
        backgroundColor: "deepskyblue",
        margin: 5,
        //marginTop: 30, 
        padding: 10,
        borderRadius: 30,
        width: '75%',
        alignSelf: 'center',
    },

    previousButtonText: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',

    },

    buttonContainer: {

      justifyContent: 'space-between',
      alignSelf: 'stretch',
      alignContent: 'center',
  
    },

});