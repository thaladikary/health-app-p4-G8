import { View, Text, StyleSheet,Image, Dimensions, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function StepEight({ navigation }){


    const [inputGoalLenght, setInputGoalLenght] = useState('0');


    return(

    <View style={styles.container} behavior='padding'>
          <View style={styles.steText}>
            <View style={styles.progressLine} />
            <View style={styles.progressLine} />
            <View style={styles.progressLine} />
          </View>
    
          <Text style={styles.steTextNumber}>Step 8 of 8</Text>
          <Text style={styles.mainLabel}>What is the Goal Lenght</Text>
          <Text style={styles.explanationText}>Select in how long would you like to reach your goal</Text>


          <TextInput
                style={styles.inputGoalLenght}
                placeholder="22 days"
                keyboardType="numeric"
                value={inputGoalLenght}
                onChangeText={(text) => setInputGoalLenght(text)}
                onFocus={() => {}}
                // onBlur={Keyboard.dismiss}
            ></TextInput>






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

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        margin: 20,
        position: 'relative',
        //marginTop: 70,
    },

    steText: {
        flexDirection: 'row',
        fontSize: 18,
        marginBottom: 20,
        position: 'absolute',
        top: 0,
        marginTop: 70,
        color: 'dodgerblue',
        fontFamily: 'Georgia',
        fontWeight: '500',
        flexDirection: 'row', // Use row direction for horizontal layout
        alignItems: 'center', // Align items in the center

        zIndex: 1, // Add this line
    },

    mainLabel: {
        fontSize: 30,
        marginTop: 30,
        //position: 'absolute',
        top: 70,
        fontWeight: 'bold',
        position: 'absolute',
        textAlign: 'center',
        
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
        top: 41.5,
        position: 'absolute',
    },

    explanationText: {
        fontSize: 10,
        fontWeight: '300',
        textAlign: 'left',
        top: -97,
    },

    inputGoalLenght: {
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
    },

    previousButtonText: {
        color: 'black',
        fontSize: 22,
        textAlign: 'center',
        fontWeight: 'bold',

    },

});

