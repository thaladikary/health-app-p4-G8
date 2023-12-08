import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Dimensions, StatusBar, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { useUser } from '../../context/userContext';
import { db } from '../../config/firebase';
import { addDoc,collection } from '@firebase/firestore';


export default function StepTwo({ navigation, route }){

    //creating the variables used in this function
    // const inputAge = route.params.inputAge
   
    const [measurement, setMeasurement] = useState({
        weight: '',
        unit: 'kg',
    });

    const currentStep = 2;

    const handleNextStep = () => {
      
       if(measurement.weight.trim()!==''){
            // console.log(measurement)
            // console.log(inputAge)
            // navigation.navigate('StepThree',{measurement,inputAge});
            navigation.navigate('StepThree');
            
            
       }else{
            console.warn('Please enter your weight');
       }
    };
    return(
        <View style={styles.container} behavior='padding'>

            {/* Steps line here */}
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



            <Text style={styles.steTextNumber}>Step 2 of 8</Text>

            <View style={styles.mainLabelContainer}>
                <Image source={require('../../assets/Setup-pages/weight-scale.png')} style={styles.mainLabelIcon}/>
                <Text style={styles.mainLabel}>Enter your weight</Text>
            </View>
            <View style={styles.inputContainer}>

                {/* getting the input for weight, we store the value in Weight, we also store the unit in setUnit*/}
                <TextInput
                    style={styles.inputWeight}
                    placeholder='58'
                    keyboardType='numeric'
                    value={measurement.weight}
                    onChangeText={(text) => setMeasurement((prev) => ({ ...prev, weight: text }))}
                    onFocus={() => {}}
                >
                </TextInput>

                <TouchableOpacity
                    style={[styles.unitButton, measurement.unit === 'lb' ? styles.selectedUnit : styles.unselectedUnit]}
                    onPress={() => setMeasurement((prev) => ({ ...prev, unit: 'lb' }))}
                >
                    <Text style={[styles.unitText, measurement.unit === 'lb' ? styles.selectedText : styles.unselectedText]}
                    >lb</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.unitButton, measurement.unit === 'kg' ? styles.selectedUnit : styles.unselectedUnit]}
                    onPress={() => setMeasurement((prev) => ({ ...prev, unit: 'kg' }))}
                >
                    <Text style={[styles.unitText, measurement.unit === 'kg' ? styles.selectedText : styles.unselectedText]}
                    >kg</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextStep}
            >
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepOne')}
            >
                <Text style={styles.previousButtonText}>Previous Step</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({


  container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 20,

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
    


//ste stands for Step
    steTextNumber: {
        fontSize: 18,
        marginLeft: 10, // Adjust the spacing between the lines and the number
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        top: 41.5,
        position: 'absolute',
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

    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginBottom: 20,
        top: 20,
    },

    inputWeight: {
        fontSize: 26,
        borderBottomWidth: 1,
        marginRight: 10,
        textAlign: 'center',
        flex: 1, // make it look long
    },


    unitButton: {
        padding: 10,
        //need more
        marginBottom: 20,
    },


    selectedUnit: {
        borderBottomWidth: 2,
        borderColor: 'black',
    },


    unselectedUnit: {
        borderBottomWidth: 1,
        borderColor: 'grey',
    },

    unitText: {
        fontSize: 25,
        bottom: -10,
    },

    selectedText: {
        fontWeight: 'bold',
        color: 'black',
    },

    unselectedText: {
        color: 'grey',
    },





  nextButton: {
        backgroundColor: "deepskyblue",
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
        width: '75%',
        borderRadius: 25,
    },


    nextButtonText: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',

    },

    previousButton: {
        backgroundColor: "deepskyblue",
        margin: 10,
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
    })
    ;





  