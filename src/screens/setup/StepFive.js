import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function StepFive({ navigation }){

    const [selectedOption, setSelectedOption] = useState(null);

    const currentStep = 5;

    const options = ['Sedentary',
    'Lightly Active',
    'Moderately Active',
    'Very Active',
    'Extra Active',];


  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
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

      <Text style={styles.steTextNumber}>Step 5 of 7</Text>


      <View style={styles.mainLabelContainer}>
        <Image source={require('../../assets/Setup-pages/man.png')} style={styles.mainLabelIcon} />
        <Text style={styles.mainLabel}>How Active are You?</Text>
      </View>








      {/* Display the options and allow the user to select one */}
      {/* {activityOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.activityOption,
            selectedOption === index + 1 && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelect(index + 1)}
        >
          <Text
            style={styles.optionText}>{`${option}`}</Text>
        </TouchableOpacity>
      ))} */}


<View style={styles.inputContainer}>

<TouchableOpacity
    style={[
    styles.gainWeightButton,
    selectedOption === 'Sedentary' ? styles.gainWeightSelected : styles.gainWeightUnselected,
    ]}
    onPress={() => setSelectedOption('Sedentary')}
>
    <Text style={[
        styles.gainWeightText,
        selectedOption === 'Sedentary' ? styles.gainWeightSelectedText : styles.gainWeightUnselectedText,
    ]}>
        Sedentary
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.loseWeightButton,
    selectedOption === 'Lightly Active' ? styles.loseWeightSelected : styles.loseWeightUnselected,
    ]}
    onPress={() => setSelectedOption('Lightly Active')}
>
    <Text style={[
    styles.loseWeightText,
    selectedOption === 'Lightly Active' ? styles.loseWeightSelectedText : styles.loseWeightUnselectedText,
    ]}>
        Lightly Active
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.stayHealthyButton,
    selectedOption === 'Moderately Active' ? styles.stayHealthySelected : styles.stayHealthyUnselected,
    ]}
    onPress={() => setSelectedOption('Moderately Active')}
>
    <Text style={[
        styles.stayHealthyText,
        selectedOption === 'Moderately Active' ? styles.stayHealthySelectedText : styles.stayHealthyUnselectedText,
    ]}>
        Moderately Active
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.stayHealthyButton,
    selectedOption === 'Very Active' ? styles.stayHealthySelected : styles.stayHealthyUnselected,
    ]}
    onPress={() => setSelectedOption('Very Active')}
>
    <Text style={[
        styles.stayHealthyText,
        selectedOption === 'Very Active' ? styles.stayHealthySelectedText : styles.stayHealthyUnselectedText,
    ]}>
        Very Active
    </Text>
</TouchableOpacity>

<TouchableOpacity
    style={[
    styles.stayHealthyButton,
    selectedOption === 'Extra Active' ? styles.stayHealthySelected : styles.stayHealthyUnselected,
    ]}
    onPress={() => setSelectedOption('Extra Active')}
>
    <Text style={[
        styles.stayHealthyText,
        selectedOption === 'Extra Active' ? styles.stayHealthySelectedText : styles.stayHealthyUnselectedText,
    ]}>
        Extra Active
    </Text>
</TouchableOpacity>
</View>








<View
          style={styles.buttonContainer}>


      <TouchableOpacity
        style={styles.previousButton}
        onPress={() => navigation.navigate('StepSix')}
      >
        <Text style={styles.previousButtonText}>Next Step</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.previousButton}
        onPress={() => navigation.navigate('StepFour')}
      >
        <Text style={styles.previousButtonText}>Previous Step</Text>
      </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
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

    mainLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // position: 'absolute',
        top: 120,

      },
    
      mainLabelIcon: {
        width: 60,
        height: 60,
        marginRight: 5,
        margin: 20,
        resizeMode: 'contain',
        top: -20,
        borderWidth: 0.1,
        borderColor: 'black',
        borderRadius: 15,
      

      },
    
      mainLabel: {
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold',
        top: -40,
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
        marginLeft: 10,
        color: 'dodgerblue',
        fontWeight: '500',
        top: 41.5,
        position: 'absolute',

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
      top: 50,
  },










    
      activityOption: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        // fontFamily: 'Georgia',
        fontWeight: '500',
        width: '50%',
        // textAlign: 'center',
       
      },
    
      selectedOption: {
        backgroundColor: 'grey',
      },
    
      previousButton: {
        backgroundColor: 'deepskyblue',
        margin: 5,
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

      // optionText: {

      //   alignSelf: 'center',
      // },

      buttonContainer: {

        justifyContent: 'space-between',
        alignSelf: 'stretch',
        alignContent: 'center',
        top: -20,
    
      },

      
    });

    
    const activityOptions = [
      'Sedentary',
      'Lightly Active',
      'Moderately Active',
      'Very Active',
      'Extra Active',
    ];