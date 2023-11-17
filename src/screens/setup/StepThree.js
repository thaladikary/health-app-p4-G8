import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



export default function StepThree(){

    //these are the variables used 
    const [selectedOption, setSelectedOption] = useState(null);
    const navigation = useNavigation();
    

    //can add more options if needed
    const goals = ['Stay Healthy', 'Lose Weight', 'Gain Weight'];


    //using goals.map because it will be easier to add more options in the future

    //might need to do: KeyboardAvoidingView
    return(
        <KeyboardAvoidingView style={styles.container} behavior='padding'>

            <View style={styles.steText}>
                <View style={styles.progressLine} />
                <View style={styles.progressLine} />
                <View style={styles.progressLine} />
            </View>

            <Text style={styles.steTextNumber}>Step 3 of 3</Text>
            <Text style={styles.mainLabel}>What is your Goal</Text>

                
                {/* 3 different buttons for the 3 different options that we have 
                    We store the selected goal in setSelectedOption*/}
            <View style={styles.inputContainer}>

                <TouchableOpacity
                    style={[
                    styles.gainWeightButton,
                    selectedOption === 'gainWeight' ? styles.gainWeightSelected : styles.gainWeightUnselected,
                    ]}
                    onPress={() => setSelectedOption('gainWeight')}
>
                    <Text style={[
                        styles.gainWeightText,
                        selectedOption === 'gainWeight' ? styles.gainWeightSelectedText : styles.gainWeightUnselectedText,
                    ]}>
                        Gain weight
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                    styles.loseWeightButton,
                    selectedOption === 'loseWeight' ? styles.loseWeightSelected : styles.loseWeightUnselected,
                    ]}
                    onPress={() => setSelectedOption('loseWeight')}
                >
                    <Text style={[
                    styles.loseWeightText,
                    selectedOption === 'loseWeight' ? styles.loseWeightSelectedText : styles.loseWeightUnselectedText,
                    ]}>
                        Lose weight
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                    styles.stayHealthyButton,
                    selectedOption === 'stayHealthy' ? styles.stayHealthySelected : styles.stayHealthyUnselected,
                    ]}
                    onPress={() => setSelectedOption('stayHealthy')}
                >
                    <Text style={[
                        styles.stayHealthyText,
                        selectedOption === 'stayHealthy' ? styles.stayHealthySelectedText : styles.stayHealthyUnselectedText,
                    ]}>
                        Stay Healthy
                    </Text>
                </TouchableOpacity>
            </View>

                {/* Finish Button and Previous buttons
                    The Finish Button points to this page for now.  */}
            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepThree')}
            >
                <Text style={styles.previousButtonText}>Finish</Text>
            </TouchableOpacity>
                
            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepTwo')}
            >
                <Text style={styles.previousButtonText}>Previous Step</Text>
            </TouchableOpacity> 
                

        </KeyboardAvoidingView>
    )
}

//this CSS part will be changed according to the output or will just use the CSS file 
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
        top: 170,
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
        top: -195,
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


    gainWeightButton: {
        padding: 10,
        marginBottom: 11,
    },

    gainWeightText: {
        fontSize: 25,
    },

    gainWeightSelected: {
        borderBottomWidth: 2,
        borderColor: 'black',
    },

    gainWeightUnselected: {
        borderBottomWidth: 1,
        borderColor: 'grey',
    },

    gainWeightSelectedText: {
        fontWeight: 'bold',
        color: 'black',
    },

    gainWeightUnselectedText: {
        color: 'grey',
    },

    // Styles for "Lose weight" option
    loseWeightButton: {
        padding: 10,
        marginBottom: 11,
    },

    loseWeightText: {
        fontSize: 25,
    },

    loseWeightSelected: {
        borderBottomWidth: 2,
        borderColor: 'black',
    },

    loseWeightUnselected: {
        borderBottomWidth: 1,
        borderColor: 'grey',
    },

    loseWeightSelectedText: {
        fontWeight: 'bold',
        color: 'black',
    },

    loseWeightUnselectedText: {
        color: 'grey',
    },

    // for "Stay Healthy" option
    stayHealthyButton: {
        padding: 10,
        marginBottom: 11,
    },
    stayHealthyText: {
        fontSize: 25,
    },
    stayHealthySelected: {
        borderBottomWidth: 2,
        borderColor: 'black',
    },
    stayHealthyUnselected: {
        borderBottomWidth: 1,
        borderColor: 'grey',
    },
    stayHealthySelectedText: {
        fontWeight: 'bold',
        color: 'black',
    },
    stayHealthyUnselectedText: {
        color: 'grey',
    },
  });
