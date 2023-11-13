import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';



export default function StepThree(){

    //these are the variables used 
    const [selectedGoal, setSelectedGoal] = useState(null);
    const navigation = useNavigation();

    //can add more options if needed
    const goals = ['Stay Healthy', 'Lose Weight', 'Gain Weight'];


    //using goals.map because it will be easier to add more options in the future

    return(
        <View style={StyleSheet.container}>
            <Text style={styles.stepText}>Step 3 of 3</Text>
            <Text style={styles.label1}>What is your Goal</Text>

            <Picker 
                selectedValue={selectedGoal}
                onValueChange={(itemValue) => setSelectedGoal(itemValue)}
            >


                {goals.map((goal, index) => (
                    <Picker.Item key={index} label={goal} value={goal} />
                ))}

                </Picker>

                <TouchableOpacity
                    style={styles.nextButton}
                    onPress={() => {

                        
                 // Handle the selected goal, e.g., save it to state or navigate to the next screen
                        navigation.navigate('Summary', { selectedGoal });
                     }}
                    disabled={!selectedGoal} // Disable the button if no goal is selected
                >

                    
                    <Text style={styles.nextButtonText}>FINISH</Text> 
                </TouchableOpacity>

        </View>
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
    stepText: {
      fontSize: 24,
      marginBottom: 25,
    },
    label: {
      fontSize: 16,
    },
    nextButton: {
      backgroundColor: 'blue',
      padding: 10,
      marginTop: 20,
    },
    nextButtonText: {
      color: 'black',
      fontSize: 16,
      textAlign: 'center',
    },
  });
