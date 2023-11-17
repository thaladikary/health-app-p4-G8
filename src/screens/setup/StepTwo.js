import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, Dimensions, StatusBar, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



export default function StepTwo({ navigation }){

    //creating the variables used in this function
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('Kg'); //we set kg as default


    return(
        <KeyboardAvoidingView style={styles.container} behavior='padding'>

        {/* Progress Lines 2/3 */}
            <View style={styles.steText}>
                <View style={styles.progressLine} />
                <View style={styles.progressLine} />
                <View style={styles.emptyLine} />  
            </View>

            <Text style={styles.steTextNumber}>Step 2 of 3</Text>
            <Text style={styles.mainLabel}>Enter your weight</Text>

            <View style={styles.inputContainer}>

                {/* getting the input for weight, we store the value in Weight, we also store the unit in setUnit*/}
                <TextInput
                    style={styles.inputWeight}
                    placeholder='58 Kg'
                    keyboardType='numeric'
                    value={weight}
                    onChangeText={setWeight}
                    onFocus={() => {}}
                >
                </TextInput>

                <TouchableOpacity

                    // This is what lets the user pick between the two unit Buttons
                    style={[styles.unitButton, unit === 'lb' ? styles.selectedUnit : styles.unselectedUnit]}
                    onPress={() => setUnit('lb')}
                >
                    <Text style={[styles.unitText, unit === 'lb' ? styles.selectedText : styles.unselectedText]}
                    >lb</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.unitButton, unit === 'kg' ? styles.selectedUnit : styles.unselectedUnit]}
                    onPress={() => setUnit('kg')}

                >
                    <Text style={[styles.unitText, unit === 'kg' ? styles.selectedText : styles.unselectedText]}
                    >kg</Text>
                </TouchableOpacity>
            </View>

            {/* NEXT Button */}
            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('StepThree')}
            >
                <Text style={styles.nextButtonText}>Next Step</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepOne')}
            >
                <Text style={styles.previousButtonText}>Previous Step</Text>
            </TouchableOpacity>
            
        </KeyboardAvoidingView>
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
        position: 'absolute',
        top: 170,
        fontWeight: 'bold',
    },


//ste stands for Step
    steText: {
        flexDirection: 'row',
        fontSize: 18,
        marginBottom: 20,
        position: 'absolute',
        top: 70,
        color: 'dodgerblue',
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

    emptyLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#ccc',
    },

    steTextNumber: {
        fontSize: 18,
        marginLeft: 10, // Adjust the spacing between the lines and the number
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        top: -233,
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





  