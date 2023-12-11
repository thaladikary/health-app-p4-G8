import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function StepSeven({ navigation }){

    const [selectedOption, setSelectedOption] = useState(null);


    const goals = [
      'Lose 2 lbs per week',
      'Lose 1.5 lbs per week',
      'Lose 1 lb per week',
      'Lose 0.5 lbs per week',
      'Maintain current weight',
    ];
    const currentStep = 7;


    return (
        <View style={styles.container} behavior='padding'>
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
          <Text style={styles.steTextNumber}>Step 7 of 7</Text>


          <View style={styles.mainLabelContainer}>
                <Image source={require('../../assets/Setup-pages/target.png')} style={styles.mainLabelIcon}/>
                <Text style={styles.mainLabel}>What's the weight goal</Text>
            </View>



<View style={styles.inputContainer}>

<TouchableOpacity
    style={[
    styles.gainWeightButton,
    selectedOption === 'Lose 2 lbs per week' ? styles.gainWeightSelected : styles.gainWeightUnselected,
    ]}
    onPress={() => setSelectedOption('Lose 2 lbs per week')}
>
    <Text style={[
        styles.gainWeightText,
        selectedOption === 'Lose 2 lbs per week' ? styles.gainWeightSelectedText : styles.gainWeightUnselectedText,
    ]}>
        Lose 2 lbs per week
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.loseWeightButton,
    selectedOption === 'Lose 1.5 lbs per week' ? styles.loseWeightSelected : styles.loseWeightUnselected,
    ]}
    onPress={() => setSelectedOption('Lose 1.5 lbs per week')}
>
    <Text style={[
    styles.loseWeightText,
    selectedOption === 'Lose 1.5 lbs per week' ? styles.loseWeightSelectedText : styles.loseWeightUnselectedText,
    ]}>
        Lose 1.5 lbs per week
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.stayHealthyButton,
    selectedOption === 'Lose 1 lb per week' ? styles.stayHealthySelected : styles.stayHealthyUnselected,
    ]}
    onPress={() => setSelectedOption('Lose 1 lb per week')}
>
    <Text style={[
        styles.stayHealthyText,
        selectedOption === 'Lose 1 lb per week' ? styles.stayHealthySelectedText : styles.stayHealthyUnselectedText,
    ]}>
        Lose 1 lb per week
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.stayHealthyButton,
    selectedOption === 'Lose 0.5 lbs per week' ? styles.stayHealthySelected : styles.stayHealthyUnselected,
    ]}
    onPress={() => setSelectedOption('Lose 0.5 lbs per week')}
>
    <Text style={[
        styles.stayHealthyText,
        selectedOption === 'Lose 0.5 lbs per week' ? styles.stayHealthySelectedText : styles.stayHealthyUnselectedText,
    ]}>
        Lose 0.5 lbs per week
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.stayHealthyButton,
    selectedOption === 'Maintain current weight' ? styles.stayHealthySelected : styles.stayHealthyUnselected,
    ]}
    onPress={() => setSelectedOption('Maintain current weight')}
>
    <Text style={[
        styles.stayHealthyText,
        selectedOption === 'Maintain current weight' ? styles.stayHealthySelectedText : styles.stayHealthyUnselectedText,
    ]}>
        Maintain current weight
    </Text>
</TouchableOpacity>
</View>






          <View
          style={styles.buttonContainer}>

          <TouchableOpacity
                style={styles.previousButton}
                onPress={() => navigation.navigate('CalculateBMR')}
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
    
    // Styles for "Stay Healthy" option
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