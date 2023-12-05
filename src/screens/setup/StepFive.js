import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, KeyboardAvoidingView, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function StepFive({ navigation }){

    const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.steText}>
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />
      </View>

      <Text style={styles.steTextNumber}>Step 5 of 8</Text>


      <View style={styles.mainLabelContainer}>
        <Image source={require('../../assets/Setup-pages/muscle-icon.jpg')} style={styles.mainLabelIcon} />
        <Text style={styles.mainLabel}>How Active are You?</Text>
      </View>



      {/* Display the options and allow the user to select one */}
      {activityOptions.map((option, index) => (
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
      ))}

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
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
      },
    
    //   mainLabel: {
    //     fontSize: 30,
    //     marginTop: 30,
    //     position: 'absolute',
    //     top: 130,
    //     fontWeight: 'bold',
    //   },
    

    mainLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      mainLabelIcon: {
        width: 60,
        height: 60,
        marginRight: 5,
        resizeMode: 'contain',
        top: -20,
      },
    
      mainLabel: {
        fontSize: 30,
        marginTop: 30,
        fontWeight: 'bold',
        top: -40,
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
        marginLeft: 10,
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        top: 54.5,
        position: 'absolute',

      },
    
      activityOption: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'dodgerblue',
        backgroundColor: 'white',
        fontFamily: 'Georgia',
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
      },
    
      previousButtonText: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',
      },

      optionText: {

        alignSelf: 'center',
      },
    });

    
    const activityOptions = [
      'Sedentary',
      'Lightly Active',
      'Moderately Active',
      'Very Active',
      'Extra Active',
    ];