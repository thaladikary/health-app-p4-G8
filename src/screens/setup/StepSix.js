import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';




export default function StepSix({ navigation }){
    // const inputAge = route.params.inputAge
    // const meansurement = route.params.meansurement
    //these are the variables used 
    const [selectedOption, setSelectedOption] = useState(null);
    // const navigation = useNavigation();
    const currentStep = 6;

    

    //can add more options if needed
    const goals = ['Stay Healthy', 'Lose Weight', 'Gain Weight'];
    // useEffect(()=>{
    //     console.log(selectedOption)
    // },[selectedOption])

    //using goals.map because it will be easier to add more options in the future
    const handleFinishButton = () =>{
        if(selectedOption!== null){
            console.log(selectedOption)
        }
    }
    //might need to do: KeyboardAvoidingView
    return(


        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.progressContainer}>
                {[...Array(7)].map((_, index) => (
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
            <Text style={styles.steTextNumber}>Step 6 of 7</Text>



            <View style={styles.mainLabelContainer}>
                <Image source={require('../../assets/Setup-pages/goal.png')} style={styles.mainLabelIcon}/>
                <Text style={styles.mainLabel}>Now lets set up a GOAL</Text>
            </View>
                
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

            <View
            style={styles.buttonContainer}>

            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepSeven')}
            >
                <Text style={styles.previousButtonText}>Next Step</Text>
            </TouchableOpacity> 

                
            <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('StepFive')}
                // ,{inputAge}
            >
                <Text style={styles.previousButtonText}>Previous Step</Text>
            </TouchableOpacity> 
            
            </View>
            

        </KeyboardAvoidingView>
    )
}

//this CSS part will be changed according to the output or will just use the CSS file 
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
    





    previousButton: {
        backgroundColor: "deepskyblue",
        margin: 5,
        //marginTop: 30, 
        padding: 10,
        borderRadius: 30,
        alignSelf: 'center',
        width: '75%',
        top: -19,
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
    inputContainer: {
        marginBottom: 15,
        top: 250,
    },

    buttonContainer: {

        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignContent: 'center',
        
    
      },
  });
